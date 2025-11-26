import { useEffect, useRef } from "react";

interface Resource {
  id: number;
  name: string;
  filename: string;
}

interface ResourcesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  resources: Resource[];
}

export const ResourcesDropdown = ({ isOpen, onClose, buttonRef, resources }: ResourcesDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDownload = (filename: string) => {
    // Placeholder: In the future, this will download the actual PDF
    console.log(`Downloading ${filename}`);
    // For now, just show an alert
    alert(`Downloading ${filename} (placeholder)`);
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  // Position dropdown above the button
  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdown = dropdownRef.current;
      
      dropdown.style.bottom = `${window.innerHeight - buttonRect.top + 8}px`;
      dropdown.style.left = `${buttonRect.left}px`;
      dropdown.style.width = `${buttonRect.width}px`;
    }
  }, [isOpen, buttonRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: "0.75rem",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
        zIndex: 2000,
        minWidth: "250px",
        maxHeight: "400px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {resources.map((pdf) => (
          <div
            key={pdf.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem",
              borderRadius: "4px",
              transition: "background-color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f7fafc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flex: 1,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "#e9504c", flexShrink: 0 }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#1a202c",
                  fontWeight: 500,
                }}
              >
                {pdf.name}
              </span>
            </div>
            <button
              onClick={() => handleDownload(pdf.filename)}
              style={{
                padding: "0.375rem 0.75rem",
                backgroundColor: "#e9504c",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 500,
                transition: "background-color 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#c43e3a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#e9504c";
              }}
            >
              Last ned
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

