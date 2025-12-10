import { useEffect, useRef } from "react";

interface ResourcesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const ResourcesDropdown = ({ isOpen, onClose, buttonRef }: ResourcesDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pdfFiles = [
    { id: 1, name: "Ressurs 1", filename: "ressurs-1.pdf" },
    { id: 2, name: "Ressurs 2", filename: "ressurs-2.pdf" },
    { id: 3, name: "Ressurs 3", filename: "ressurs-3.pdf" },
  ];

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
      className="fixed bg-white rounded-lg p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-[2000] min-w-[250px] max-h-[400px] overflow-y-auto"
    >
      <div className="flex flex-col gap-2">
        {pdfFiles.map((pdf) => (
          <div
            key={pdf.id}
            className="flex items-center justify-between p-3 rounded transition-colors duration-200 cursor-pointer hover:bg-[#f7fafc]"
          >
            <div className="flex items-center gap-3 flex-1">
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
              <span className="text-sm text-[#1a202c] font-medium">
                {pdf.name}
              </span>
            </div>
            <button
              onClick={() => handleDownload(pdf.filename)}
              className="px-3 py-1.5 bg-[#e9504c] text-white border-none rounded cursor-pointer text-xs font-medium transition-colors duration-200 shrink-0 hover:bg-[#c43e3a]"
            >
              Last ned
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

