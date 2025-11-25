import { useState, useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "motion/react";

interface MaskEffectProps {
  children: React.ReactNode;
  revealText: React.ReactNode;
}

export const MaskEffect = ({ children, revealText }: MaskEffectProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  // Smooth spring animations for mouse position
  const springX = useSpring(mouseX, { stiffness: 1000, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 30 });
  const springSize = useSpring(maskSize, { stiffness: 500, damping: 50 });

  // Detect mobile/touch device
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

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

        // Update mask circle position and size
        circleRef.current.setAttribute("cx", x.toString());
        circleRef.current.setAttribute("cy", y.toString());
        circleRef.current.setAttribute("r", (size / 2).toString());

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
      {/* SVG mask definition */}
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
          width: 0,
          height: 0,
        }}
      >
        <defs>
          <mask id={maskId}>
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
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          backgroundColor: "#000000", // Black background to cover background text when revealed
          maskImage: `url(#${maskId})`,
          WebkitMaskImage: `url(#${maskId})`,
        }}
      >
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
          style={{
            display: "inline-block",
            touchAction: "manipulation",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
