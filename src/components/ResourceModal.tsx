import { useEffect } from "react";

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  iframeUrl: string;
}

export const ResourceModal = ({
  isOpen,
  onClose,
  iframeUrl,
}: ResourceModalProps) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 3000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
        onClick={onClose}
      >
        {/* Modal content */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "1200px",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#ffffff",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              lineHeight: "1",
              zIndex: 3001,
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            }}
          >
            ×
          </button>

          {/* Iframe container */}
          <div
            style={{
              width: "100%",
              height: "90vh",
              maxHeight: "800px",
              overflow: "auto",
              borderRadius: "8px",
            }}
          >
            <iframe
              allowFullScreen={true}
              allow="clipboard-write"
              scrolling="no"
              className="fp-iframe"
              src={iframeUrl}
              style={{
                border: "1px solid lightgray",
                width: "100%",
                height: "100%",
                minHeight: "400px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
