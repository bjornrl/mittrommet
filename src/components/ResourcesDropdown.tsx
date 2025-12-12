import { useEffect, useRef, useState } from "react";

interface Resource {
  id: number;
  name: string;
  filename: string;
  type?: "pdf" | "podcast";
}

interface ResourcesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  resources: Resource[];
}

const HowToReadPages = () => {
  return (
    <div>
      <h2 style={{ marginTop: "0" }}>Hvordan lese denne siden?</h2>
      <p>
        Vi har delt arbeidsboken i to deler for å gjøre den enklere å bruke:{" "}
        <strong>hva vi skal gjøre</strong> og{" "}
        <strong>hvordan vi skal få det til.</strong>
        <br></br>
        <br></br>
        <strong>Tjenester og programmer:</strong> MITTROMMET er en portefølje av
        konseptidéer utviklet sammen med ulike målgrupper – små nok til å
        testes, store nok til å lære av.<br></br> <br></br>
        <strong>Det tredje rommet:</strong>
        MITTROMMETsom et fysisk og sosialt møtested: i dagens bygg, ute i byen i
        mellomfasen, og som hjertet i det nye kulturbygget. Her testes konsepter
        i praksis og oversettes til rom, tjenester og daglig drift. <br></br>
        <br></br>
        <strong>Organisasjonen:</strong> Hvordan Rogaland Teater og Stavanger
        museum bygger felles kultur, strukturer, roller og ledelseskapasitet for
        å realisere MITTROMMET. Arbeidsboken er organisert i tre faser:
        <ul>
          <li>Nå: før byggingen starter</li>
          <li>Mellomtid: i byggefasen</li>
          <li>Nytid: når det nye bygget åpner</li>
        </ul>
      </p>
    </div>
  );
};

export const ResourcesDropdown = ({
  isOpen,
  onClose,
  buttonRef,
  resources,
}: ResourcesDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDownload = (filename: string) => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = `/resources/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // Position dropdown above the button (desktop) or center (mobile)
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const dropdown = dropdownRef.current;

      if (isMobile) {
        // Center the dropdown on mobile
        dropdown.style.bottom = "auto";
        dropdown.style.top = "50%";
        dropdown.style.left = "50%";
        dropdown.style.transform = "translate(-50%, -50%)";
        dropdown.style.width = "90%";
        dropdown.style.maxWidth = "400px";
      } else {
        // Position relative to button on desktop
        if (buttonRef.current) {
          const buttonRect = buttonRef.current.getBoundingClientRect();
          dropdown.style.bottom = `${
            window.innerHeight - buttonRect.top + 8
          }px`;
          dropdown.style.left = `${buttonRect.left}px`;
          dropdown.style.width = `${buttonRect.width}px`;
          dropdown.style.top = "auto";
          dropdown.style.transform = "none";
        }
      }
    }
  }, [isOpen, buttonRef, isMobile]);

  if (!isOpen) return null;

  return (
    <>
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1999,
          }}
          onClick={onClose}
        />
      )}
      <div
        ref={dropdownRef}
        style={{
          position: "fixed",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #e9504c",
          padding: "0.75rem",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
          zIndex: 2000,
          minWidth: "250px",
          maxHeight: "700px",
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
          <HowToReadPages />
          {resources.map((resource) => {
            const isPodcast = resource.type === "podcast";
            return (
              <div
                key={resource.id}
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
                  {isPodcast ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ color: "#e9504c", flexShrink: 0 }}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                  ) : (
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
                  )}
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "#1a202c",
                      fontWeight: 500,
                    }}
                  >
                    {resource.name}
                  </span>
                </div>
                <button
                  onClick={() => handleDownload(resource.filename)}
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
            );
          })}
        </div>
      </div>
    </>
  );
};
