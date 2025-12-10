import { useEffect, useRef } from "react";

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
      <h2>Hvordan lese denne siden?</h2>
      <p>
        Hvordan lese denne siden? Denne siden gir en oversikt over hvordan
        Mittrommet kan vokse over tid – med start nå, ikke en gang langt fram i
        tid. I dette arbeidet har vi delt Mittrommet inn i tre utviklingsfaser:
        <ul>
          <li>Nåtid (2026–2029)</li>
          <li>Mellomtid (2029–2034)</li>
          <li>Nytid (fra 2034 og videre)</li>
        </ul>
        Nåtid (2026–2029), Mellomtid (2029–2034) og Nytid (fra 2034 og videre),
        og i tre hovedområder for utvikling: organisasjonen, «tredjerommet» og
        tjenestene og konseptene for ulike målgrupper.
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
      className="fixed bg-white rounded-lg border border-[#e9504c] p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-[2000] min-w-[250px] max-h-[700px] overflow-y-auto"
    >
      <div className="flex flex-col gap-2">
        <HowToReadPages />
        {resources.map((resource) => {
          const isPodcast = resource.type === "podcast";
          return (
            <div
              key={resource.id}
              className="flex items-center justify-between p-3 rounded transition-colors duration-200 cursor-pointer hover:bg-[#f7fafc]"
            >
              <div className="flex items-center gap-3 flex-1">
                {isPodcast ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[#e9504c] shrink-0"
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
                    className="text-[#e9504c] shrink-0"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                )}
                <span className="text-sm text-[#1a202c] font-medium">
                  {resource.name}
                </span>
              </div>
              <button
                onClick={() => handleDownload(resource.filename)}
                className="px-3 py-1.5 bg-[#e9504c] text-white border-none rounded cursor-pointer text-xs font-medium transition-colors duration-200 shrink-0 hover:bg-[#c43e3a]"
              >
                Last ned
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
