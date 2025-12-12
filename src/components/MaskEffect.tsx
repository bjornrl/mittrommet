import { useState, useEffect, useRef, useMemo } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { publicImages } from "@/lib/images";

interface MaskEffectProps {
  children: React.ReactNode;
  revealText: React.ReactNode;
}

export const MaskEffect = ({ children, revealText }: MaskEffectProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [maskId] = useState(
    () => `mask-${Math.random().toString(36).substr(2, 9)}`
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const maskedLayerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const visibleCircleRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskSize = useMotionValue(60);
  const [imageTransforms, setImageTransforms] = useState<
    Array<{ x: number; y: number }>
  >(Array(16).fill({ x: 0, y: 0 }));

  // Generate random sizes for each image (stable across renders)
  const imageSizes = useMemo(() => {
    return Array.from({ length: 16 }).map(() => {
      // Random scale between 0.85 and 1.15 (15% variation)
      return 0.85 + Math.random() * 0.3;
    });
  }, []);

  // Generate random parallax strengths for each image (stable across renders)
  const imageParallaxStrengths = useMemo(() => {
    return Array.from({ length: 16 }).map(() => {
      // Random strength between 0.5x and 1.5x of base strength
      return 0.5 + Math.random() * 1.0;
    });
  }, []);

  // Smooth spring animations for mouse position
  const springX = useSpring(mouseX, { stiffness: 1000, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 30 });
  const springSize = useSpring(maskSize, { stiffness: 500, damping: 50 });

  // Detect mobile/touch device and Safari
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    // Detect Safari
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafariBrowser =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
      (userAgent.includes("safari") && !userAgent.includes("chrome"));

    setIsSafari(isSafariBrowser);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateMousePosition = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const updateTouchPosition = (e: TouchEvent) => {
    if (containerRef.current && e.touches.length > 0) {
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      mouseX.set(touch.clientX - rect.left);
      mouseY.set(touch.clientY - rect.top);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Initialize position to center after a small delay to ensure container is rendered
      const initPosition = () => {
        const rect = container.getBoundingClientRect();
        mouseX.set(rect.width / 2);
        mouseY.set(rect.height / 2);
      };

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(initPosition);

      if (isMobile) {
        // Mobile: use touch events
        container.addEventListener("touchmove", updateTouchPosition);
        return () => {
          container.removeEventListener("touchmove", updateTouchPosition);
        };
      } else {
        // Desktop: use mouse events
        container.addEventListener("mousemove", updateMousePosition);
        return () => {
          container.removeEventListener("mousemove", updateMousePosition);
        };
      }
    }
  }, [mouseX, mouseY, isMobile]);

  useEffect(() => {
    // On mobile, expand mask when touched, otherwise use hover state
    if (isMobile) {
      maskSize.set(isTouched ? 600 : 60);
    } else {
      maskSize.set(isHovered ? 600 : 60);
    }
  }, [isHovered, isTouched, isMobile, maskSize]);

  // Update image transforms based on mouse position
  useEffect(() => {
    const updateImageTransforms = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseXValue = springX.get();
      const mouseYValue = springY.get();

      // Calculate offset from center (normalized to -1 to 1)
      const offsetX = (mouseXValue - centerX) / centerX;
      const offsetY = (mouseYValue - centerY) / centerY;

      // Calculate transforms for each image based on grid position
      const transforms = Array.from({ length: 16 }).map((_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;

        // Calculate relative position in grid (-1.5 to 1.5 for 4 columns)
        const gridX = (col - 1.5) / 1.5;
        const gridY = (row - 1.5) / 1.5;

        // Apply parallax effect with individual strength for each image
        const baseParallaxStrength = 15;
        const individualStrength = imageParallaxStrengths[index] || 1;
        const parallaxStrength = baseParallaxStrength * individualStrength;
        const x = offsetX * gridX * parallaxStrength;
        const y = offsetY * gridY * parallaxStrength;

        return { x, y };
      });

      setImageTransforms(transforms);
    };

    const unsubscribeX = springX.on("change", updateImageTransforms);
    const unsubscribeY = springY.on("change", updateImageTransforms);

    // Initial update
    updateImageTransforms();

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [springX, springY]);

  // Initialize SVG dimensions immediately for Safari compatibility
  useEffect(() => {
    const initSVG = () => {
      if (svgRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width || window.innerWidth || 1920;
        const height = rect.height || window.innerHeight || 1080;

        svgRef.current.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svgRef.current.setAttribute("width", width.toString());
        svgRef.current.setAttribute("height", height.toString());

        // Force Safari to recognize the mask by setting style attributes
        svgRef.current.style.width = `${width}px`;
        svgRef.current.style.height = `${height}px`;
      }
    };

    // Try multiple times to ensure it's set
    initSVG();
    requestAnimationFrame(initSVG);
    setTimeout(initSVG, 0);
    setTimeout(initSVG, 100);
  }, []);

  // Apply mask styles directly to DOM (Safari gets a CSS radial mask fallback)
  useEffect(() => {
    if (!maskedLayerRef.current) return;

    const element = maskedLayerRef.current;
    if (isSafari) {
      const gradientMask =
        "radial-gradient(circle var(--mask-radius) at var(--mask-x) var(--mask-y), rgba(255,255,255,1) 0%, rgba(255,255,255,1) 98%, rgba(255,255,255,0) 100%)";

      // Default values so the mask is valid on first paint
      const initialSize = maskSize.get();
      const radius = initialSize / 2;
      const initialX = springX.get() || 0;
      const initialY = springY.get() || 0;
      element.style.setProperty("--mask-x", `${initialX}px`);
      element.style.setProperty("--mask-y", `${initialY}px`);
      element.style.setProperty("--mask-radius", `${radius}px`);

      element.style.setProperty("-webkit-mask-image", gradientMask);
      element.style.setProperty("mask-image", gradientMask);
      element.style.setProperty("-webkit-mask-repeat", "no-repeat");
      element.style.setProperty("mask-repeat", "no-repeat");
      element.style.setProperty("-webkit-mask-size", "100% 100%");
      element.style.setProperty("mask-size", "100% 100%");
      element.style.setProperty("-webkit-mask-position", "0 0");
      element.style.setProperty("mask-position", "0 0");
    } else {
      const maskUrl = `url(#${maskId})`;

      // Apply mask styles directly via DOM
      element.style.setProperty("-webkit-mask-image", maskUrl);
      element.style.setProperty("mask-image", maskUrl);
      element.style.setProperty("-webkit-mask-size", "100%");
      element.style.setProperty("mask-size", "100%");
      element.style.setProperty("-webkit-mask-position", "0 0");
      element.style.setProperty("mask-position", "0 0");
      element.style.setProperty("-webkit-mask-repeat", "no-repeat");
      element.style.setProperty("mask-repeat", "no-repeat");
    }
  }, [maskId, isSafari, maskSize, springX, springY]);

  // Update SVG circle in mask and viewBox, and visible circle
  useEffect(() => {
    const updateCircle = () => {
      if (circleRef.current && svgRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = springX.get();
        const y = springY.get();
        const size = springSize.get();

        // Update SVG viewBox to match container dimensions
        svgRef.current.setAttribute(
          "viewBox",
          `0 0 ${rect.width} ${rect.height}`
        );
        svgRef.current.setAttribute("width", rect.width.toString());
        svgRef.current.setAttribute("height", rect.height.toString());

        // Also set via style for Safari
        svgRef.current.style.width = `${rect.width}px`;
        svgRef.current.style.height = `${rect.height}px`;

        // Update mask circle position and size
        circleRef.current.setAttribute("cx", x.toString());
        circleRef.current.setAttribute("cy", y.toString());
        circleRef.current.setAttribute("r", (size / 2).toString());

        // Keep CSS variables in sync for Safari CSS mask fallback
        if (maskedLayerRef.current) {
          const radius = size / 2;
          maskedLayerRef.current.style.setProperty("--mask-x", `${x}px`);
          maskedLayerRef.current.style.setProperty("--mask-y", `${y}px`);
          maskedLayerRef.current.style.setProperty("--mask-radius", `${radius}px`);
        }

        // Update visible circle position and size
        if (visibleCircleRef.current) {
          visibleCircleRef.current.style.left = `${x}px`;
          visibleCircleRef.current.style.top = `${y}px`;
          visibleCircleRef.current.style.width = `${size}px`;
          visibleCircleRef.current.style.height = `${size}px`;
        }
      }
    };

    const unsubscribeX = springX.on("change", updateCircle);
    const unsubscribeY = springY.on("change", updateCircle);
    const unsubscribeSize = springSize.on("change", updateCircle);

    // Initial update
    updateCircle();

    // Also update on resize
    const handleResize = () => updateCircle();
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribeX();
      unsubscribeY();
      unsubscribeSize();
      window.removeEventListener("resize", handleResize);
    };
  }, [springX, springY, springSize]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#ef4444",
      }}
    >
      {/* SVG mask definition - Safari compatible (must be visible) */}
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
        aria-hidden="true"
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
          >
            {/* Black background - hides the element (MITTROMMET) - shows background text */}
            <rect width="100%" height="100%" fill="black" />
            {/* White circle - shows the element (MITTROMMET) - reveals it */}
            <circle ref={circleRef} fill="white" cx="0" cy="0" r="30" />
          </mask>
        </defs>
      </svg>

      {/* Background layer - revealed text (always visible) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {revealText}
      </div>

      {/* Visible circle that follows mouse/touch - only visible when not hovering/touching */}
      <div
        ref={visibleCircleRef}
        style={{
          position: "absolute",
          borderRadius: "50%",
          backgroundColor: "#000000",
          pointerEvents: "none",
          zIndex: 1.5,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
          opacity: (isMobile ? isTouched : isHovered) ? 0 : 1,
        }}
      />

      {/* Foreground layer - MITTROMMET text (masked) */}
      <div
        ref={maskedLayerRef}
        style={
          {
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            // backgroundImage: 'url("/images/abonnement.png")',
            // backgroundSize: "cover",
            backgroundColor: "oklch(20.8% 0.042 265.755)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            // Mask applied in effect; Safari uses CSS radial mask fallback
            ...(isSafari
              ? {
                  ["--mask-x" as string]: "50%",
                  ["--mask-y" as string]: "50%",
                  ["--mask-radius" as string]: "30px",
                }
              : {
                  maskImage: `url(#${maskId})`,
                  WebkitMaskImage: `url(#${maskId})`,
                  maskSize: "100%",
                  WebkitMaskSize: "100%",
                  maskPosition: "0 0",
                  WebkitMaskPosition: "0 0",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskOrigin: "border-box",
                  WebkitMaskOrigin: "border-box",
                }),
          } as React.CSSProperties
        }
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            touchAction: "manipulation",
            zIndex: 1,
          }}
        >
          {/* Yellow rectangle - furthest back, slightly bigger */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "80%",
              height: "80%",
              // backgroundColor: "#eab308",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(4, 1fr)",
              gap: "0px",
              padding: "8px",
            }}
          >
            {Array.from({ length: 16 }).map((_, index) => {
              // Cycle through available images if we need more than available
              const imageIndex = index % publicImages.length;
              const transform = imageTransforms[index] || { x: 0, y: 0 };
              const scale = imageSizes[index] || 1;
              return (
                <img
                  key={index}
                  src={publicImages[imageIndex]}
                  alt={`Grid image ${index + 1}`}
                  style={{
                    width: `${scale * 100}%`,
                    height: `${scale * 100}%`,
                    objectFit: "cover",
                    transform: `translate(${transform.x}px, ${transform.y}px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                />
              );
            })}
          </div>
          {/* Blue rectangle - in front of yellow */}
          {/* <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "350px",
              height: "250px",
              backgroundColor: "#3b82f6",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
          /> */}
          {/* Children - in front */}
          <div
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onTouchStart={() => {
              if (isMobile) {
                setIsTouched(true);
              }
            }}
            onTouchEnd={() => {
              if (isMobile) {
                setIsTouched(false);
              }
            }}
            style={{ position: "relative", zIndex: 3 }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
