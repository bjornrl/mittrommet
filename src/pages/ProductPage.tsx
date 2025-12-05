import { useMemo, useState, useEffect } from "react";
import MethodologyModal from "../components/MethodologyModal";
import Papa from "papaparse";

type Phase = "Nåtid" | "Mellomtid" | "Nytid";
type Season = "Vår" | "Sommer" | "Høst" | "Vinter";
type DayType = "Ukedager" | "Helg";
type TimeType = "Dag" | "Kveld/natt";
type ConceptType = "Tjeneste" | "Fasilietet" | "Arrangement";

interface Concept {
  id: number;
  title: string;
  opphav: string;
  målgruppe: string;
  phase: Phase[];
  seasonTags: Season[];
  dayTags: DayType[];
  timeTags: TimeType[];
  type: ConceptType[];
  verdiForBrukerne: string;
  verdiForOrganisasjonene: string;
  hvaMåVærePåPlass: string;
  hvorStarterVi: string;
  description: string;
  imageUrl: string;
  pdfUrl: string;
}

const phases: Phase[] = ["Nåtid", "Mellomtid", "Nytid"];
const seasons: Season[] = ["Vår", "Sommer", "Høst", "Vinter"];
const days: DayType[] = ["Ukedager", "Helg"];
const times: TimeType[] = ["Dag", "Kveld/natt"];
const conceptTypes: ConceptType[] = ["Tjeneste", "Fasilietet", "Arrangement"];

// Initial concepts loaded from CSV template
// This will be populated from the CSV file
const initialConcepts: Concept[] = [];

/* ---------- CSV IMPORT UTILITY ---------- */
// This function can be used to parse CSV data when importing directly into the code
export function parseCSVToConcepts(csvText: string): Concept[] {
  const results = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const concepts: Concept[] = [];
  let idCounter = 1;

  results.data.forEach((row: any) => {
    // Parse arrays from CSV (assuming comma-separated values in CSV)
    const parseArray = (value: string): string[] => {
      if (!value || value.trim() === "") return [];
      return value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    };

    const parsePhases = (value: string): Phase[] => {
      const parsed = parseArray(value);
      const validPhases = parsed.filter((p) =>
        phases.includes(p as Phase)
      ) as Phase[];
      // Ensure at least one phase, default to Nåtid if none valid
      return validPhases.length > 0 ? validPhases : ["Nåtid"];
    };

    const parseTypes = (value: string): ConceptType[] => {
      const parsed = parseArray(value);
      const validTypes = parsed.filter((t) =>
        conceptTypes.includes(t as ConceptType)
      ) as ConceptType[];
      // Ensure at least one type, default to Tjeneste if none valid
      return validTypes.length > 0 ? validTypes : ["Tjeneste"];
    };

    const parseSeasons = (value: string): Season[] => {
      const parsed = parseArray(value);
      return parsed.filter((s) => seasons.includes(s as Season)) as Season[];
    };

    const parseDays = (value: string): DayType[] => {
      const parsed = parseArray(value);
      return parsed.filter((d) => days.includes(d as DayType)) as DayType[];
    };

    const parseTimes = (value: string): TimeType[] => {
      const parsed = parseArray(value);
      return parsed.filter((t) => times.includes(t as TimeType)) as TimeType[];
    };

    const concept: Concept = {
      id: idCounter++,
      title: row["Tittel"] || row["title"] || "",
      opphav: row["Opphav"] || row["opphav"] || "",
      målgruppe: row["Målgruppe"] || row["målgruppe"] || "",
      phase: parsePhases(row["Fase"] || row["phase"] || ""),
      seasonTags: parseSeasons(
        row["Årstid"] || row["årstid"] || row["Seasons"] || ""
      ),
      dayTags: parseDays(row["Dager"] || row["dager"] || row["Days"] || ""),
      timeTags: parseTimes(row["Tid"] || row["tid"] || row["Time"] || ""),
      type: parseTypes(row["Type"] || row["type"] || ""),
      verdiForBrukerne:
        row["Verdi for brukerne"] || row["verdiForBrukerne"] || "",
      verdiForOrganisasjonene:
        row["Verdi for organisasjonene"] ||
        row["verdiForOrganisasjonene"] ||
        "",
      hvaMåVærePåPlass:
        row["Hva må være på plass"] || row["hvaMåVærePåPlass"] || "",
      hvorStarterVi: row["Hvor starter vi"] || row["hvorStarterVi"] || "",
      description:
        row["Beskrivelse"] || row["beskrivelse"] || row["Description"] || "",
      imageUrl: (() => {
        const url = row["ImageURL"] || row["imageUrl"] || row["ImageUrl"] || "";
        // If it's just a filename (no path or URL), prepend /images/
        if (url && !url.startsWith("/") && !url.startsWith("http")) {
          return `/images/${url}`;
        }
        return url;
      })(),
      pdfUrl: (() => {
        // Try multiple column name variations (including with spaces and different cases)
        const url =
          row["PDFURL"] ||
          row["pdfURL"] ||
          row["pdfUrl"] ||
          row["PdfUrl"] ||
          row["PDF"] ||
          row[" pdfURL"] ||
          row[" pdfUrl"] ||
          "";
        if (!url || url.trim() === "") return "";

        // Remove /public prefix if present (files in public folder are served from root)
        let cleanUrl = url.trim();
        if (cleanUrl.startsWith("/public/")) {
          cleanUrl = cleanUrl.replace("/public", "");
        }

        // If it's just a filename (no path or URL), prepend /pdfs/
        if (
          cleanUrl &&
          !cleanUrl.startsWith("/") &&
          !cleanUrl.startsWith("http")
        ) {
          return `/pdfs/${cleanUrl}`;
        }
        return cleanUrl;
      })(),
    };

    if (concept.title) {
      concepts.push(concept);
    }
  });

  return concepts;
}

/* ---------- MODAL COMPONENT ---------- */

interface ConceptModalProps {
  isOpen: boolean;
  concept: Concept | null;
  onClose: () => void;
  onSave: (concept: Concept) => void;
}

const ConceptModal = ({
  isOpen,
  concept,
  onClose,
  onSave,
}: ConceptModalProps) => {
  const [title, setTitle] = useState("");
  const [opphav, setOpphav] = useState("");
  const [målgruppe, setMålgruppe] = useState("");
  const [selectedPhases, setSelectedPhases] = useState<Phase[]>(["Nåtid"]);
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([]);
  const [selectedDays, setSelectedDays] = useState<DayType[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<TimeType[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ConceptType[]>([
    "Tjeneste",
  ]);
  const [verdiForBrukerne, setVerdiForBrukerne] = useState("");
  const [verdiForOrganisasjonene, setVerdiForOrganisasjonene] = useState("");
  const [hvaMåVærePåPlass, setHvaMåVærePåPlass] = useState("");
  const [hvorStarterVi, setHvorStarterVi] = useState("");
  const [description, setDescription] = useState("");

  // Initialize form when concept changes
  useEffect(() => {
    if (concept) {
      setTitle(concept.title);
      setOpphav(concept.opphav);
      setMålgruppe(concept.målgruppe);
      setSelectedPhases(concept.phase);
      setSelectedSeasons(concept.seasonTags);
      setSelectedDays(concept.dayTags);
      setSelectedTimes(concept.timeTags);
      setSelectedTypes(concept.type);
      setVerdiForBrukerne(concept.verdiForBrukerne);
      setVerdiForOrganisasjonene(concept.verdiForOrganisasjonene);
      setHvaMåVærePåPlass(concept.hvaMåVærePåPlass);
      setHvorStarterVi(concept.hvorStarterVi);
      setDescription(concept.description);
    } else {
      setTitle("");
      setOpphav("");
      setMålgruppe("");
      setSelectedPhases(["Nåtid"]);
      setSelectedSeasons([]);
      setSelectedDays([]);
      setSelectedTimes([]);
      setSelectedTypes(["Tjeneste"]);
      setVerdiForBrukerne("");
      setVerdiForOrganisasjonene("");
      setHvaMåVærePåPlass("");
      setHvorStarterVi("");
      setDescription("");
    }
  }, [concept, isOpen]);

  const handleTogglePhase = (phaseValue: Phase) => {
    setSelectedPhases((prev) => {
      // Ensure at least one phase is always selected
      if (prev.length === 1 && prev.includes(phaseValue)) {
        return prev; // Don't allow removing the last phase
      }
      return prev.includes(phaseValue)
        ? prev.filter((p) => p !== phaseValue)
        : [...prev, phaseValue];
    });
  };

  const handleToggleSeason = (season: Season) => {
    setSelectedSeasons((prev) =>
      prev.includes(season)
        ? prev.filter((s) => s !== season)
        : [...prev, season]
    );
  };

  const handleToggleDay = (day: DayType) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleToggleTime = (time: TimeType) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleToggleType = (typeValue: ConceptType) => {
    setSelectedTypes((prev) => {
      // Ensure at least one type is always selected
      if (prev.length === 1 && prev.includes(typeValue)) {
        return prev; // Don't allow removing the last type
      }
      return prev.includes(typeValue)
        ? prev.filter((t) => t !== typeValue)
        : [...prev, typeValue];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title.trim() ||
      !description.trim() ||
      selectedTypes.length === 0 ||
      selectedPhases.length === 0
    )
      return;

    const conceptData: Concept = {
      id: concept?.id || Date.now(),
      title: title.trim(),
      opphav: opphav.trim(),
      målgruppe: målgruppe.trim(),
      phase: selectedPhases,
      seasonTags: selectedSeasons,
      dayTags: selectedDays,
      timeTags: selectedTimes,
      type: selectedTypes,
      verdiForBrukerne: verdiForBrukerne.trim(),
      verdiForOrganisasjonene: verdiForOrganisasjonene.trim(),
      hvaMåVærePåPlass: hvaMåVærePåPlass.trim(),
      hvorStarterVi: hvorStarterVi.trim(),
      description: description.trim(),
      imageUrl: "",
      pdfUrl: "",
    };

    onSave(conceptData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {concept ? "Rediger konsept" : "Nytt konsept"}
          </h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Lukk"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-field">
            <label htmlFor="title" className="modal-label">
              Tittel *
            </label>
            <input
              id="title"
              type="text"
              className="modal-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="modal-field">
            <label htmlFor="opphav" className="modal-label">
              Opphav
            </label>
            <input
              id="opphav"
              type="text"
              className="modal-input"
              value={opphav}
              onChange={(e) => setOpphav(e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label htmlFor="målgruppe" className="modal-label">
              Målgruppe
            </label>
            <input
              id="målgruppe"
              type="text"
              className="modal-input"
              value={målgruppe}
              onChange={(e) => setMålgruppe(e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label className="modal-label">Type *</label>
            <div className="modal-tags">
              {conceptTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`modal-tag ${
                    selectedTypes.includes(t) ? "active" : ""
                  }`}
                  onClick={() => handleToggleType(t)}
                  disabled={
                    selectedTypes.length === 1 && selectedTypes.includes(t)
                  }
                >
                  {t}
                </button>
              ))}
            </div>
            {selectedTypes.length === 0 && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                Minst én type må velges
              </p>
            )}
          </div>

          <div className="modal-field">
            <label className="modal-label">Fase *</label>
            <div className="modal-tags">
              {phases.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`modal-tag ${
                    selectedPhases.includes(p) ? "active" : ""
                  }`}
                  onClick={() => handleTogglePhase(p)}
                  disabled={
                    selectedPhases.length === 1 && selectedPhases.includes(p)
                  }
                >
                  {p}
                </button>
              ))}
            </div>
            {selectedPhases.length === 0 && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                Minst én fase må velges
              </p>
            )}
          </div>

          <div className="modal-field">
            <label className="modal-label">Årstider</label>
            <div className="modal-tags">
              {seasons.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`modal-tag ${
                    selectedSeasons.includes(s) ? "active" : ""
                  }`}
                  onClick={() => handleToggleSeason(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-field">
            <label className="modal-label">Dager</label>
            <div className="modal-tags">
              {days.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`modal-tag ${
                    selectedDays.includes(d) ? "active" : ""
                  }`}
                  onClick={() => handleToggleDay(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-field">
            <label className="modal-label">Tid</label>
            <div className="modal-tags">
              {times.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`modal-tag ${
                    selectedTimes.includes(t) ? "active" : ""
                  }`}
                  onClick={() => handleToggleTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-field">
            <label htmlFor="description" className="modal-label">
              Beskrivelse *
            </label>
            <textarea
              id="description"
              className="modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              required
            />
          </div>

          <div className="modal-field">
            <label htmlFor="verdiForBrukerne" className="modal-label">
              Verdi for brukerne
            </label>
            <textarea
              id="verdiForBrukerne"
              className="modal-textarea"
              value={verdiForBrukerne}
              onChange={(e) => setVerdiForBrukerne(e.target.value)}
              rows={3}
            />
          </div>

          <div className="modal-field">
            <label htmlFor="verdiForOrganisasjonene" className="modal-label">
              Verdi for organisasjonene
            </label>
            <textarea
              id="verdiForOrganisasjonene"
              className="modal-textarea"
              value={verdiForOrganisasjonene}
              onChange={(e) => setVerdiForOrganisasjonene(e.target.value)}
              rows={3}
            />
          </div>

          <div className="modal-field">
            <label htmlFor="hvaMåVærePåPlass" className="modal-label">
              Hva må være på plass
            </label>
            <textarea
              id="hvaMåVærePåPlass"
              className="modal-textarea"
              value={hvaMåVærePåPlass}
              onChange={(e) => setHvaMåVærePåPlass(e.target.value)}
              rows={3}
            />
          </div>

          <div className="modal-field">
            <label htmlFor="hvorStarterVi" className="modal-label">
              Hvor starter vi
            </label>
            <textarea
              id="hvorStarterVi"
              className="modal-textarea"
              value={hvorStarterVi}
              onChange={(e) => setHvorStarterVi(e.target.value)}
              rows={3}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="modal-btn modal-btn-secondary"
              onClick={onClose}
            >
              Avbryt
            </button>
            <button type="submit" className="modal-btn modal-btn-primary">
              {concept ? "Lagre endringer" : "Opprett konsept"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------- SMALL COMPONENTS ---------- */

interface FilterTagProps {
  label: string;
  active: boolean;
  onToggle: () => void;
}

const FilterTag = ({ label, active, onToggle }: FilterTagProps) => {
  return (
    <button
      type="button"
      className={`filter-tag ${active ? "active" : ""}`}
      onClick={onToggle}
    >
      {label}
    </button>
  );
};

interface ConceptCardProps {
  concept: Concept;
  isSelected?: boolean;
  onSelect?: (conceptId: number, selected: boolean) => void;
}

const ConceptCard = ({
  concept,
  isSelected = false,
  onSelect,
}: ConceptCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const getTypeColorClass = (type: ConceptType): string => {
    switch (type) {
      case "Tjeneste":
        return "type-tag-blue";
      case "Fasilietet":
        return "type-tag-red";
      case "Arrangement":
        return "type-tag-yellow";
      default:
        return "type-tag-blue";
    }
  };

  const getTagClass = (tag: string): string => {
    // Check if it's a phase tag
    if (phases.includes(tag as Phase)) {
      return "mini-tag mini-tag-phase";
    }
    // Check if it's a season tag
    if (seasons.includes(tag as Season)) {
      return "mini-tag mini-tag-season";
    }
    // Check if it's a day tag
    if (days.includes(tag as DayType)) {
      return "mini-tag mini-tag-day";
    }
    // Check if it's a time tag
    if (times.includes(tag as TimeType)) {
      return "mini-tag mini-tag-time";
    }
    // Default fallback
    return "mini-tag";
  };

  // Create tags with their types
  const phaseTags = concept.phase;
  const seasonTags = concept.seasonTags;
  const dayTags = concept.dayTags;
  const timeTags = concept.timeTags;

  // Check if all tags in a category are selected
  const allPhasesSelected = phaseTags.length === phases.length;
  const allSeasonsSelected = seasonTags.length === seasons.length;
  const allDaysSelected = dayTags.length === days.length;
  const allTimesSelected = timeTags.length === times.length;

  return (
    <article
      className={`concept-card ${isSelected ? "concept-card-selected" : ""}`}
    >
      {onSelect && (
        <div className="card-checkbox-container">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(concept.id, e.target.checked)}
            className="card-checkbox"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <div className="card-image">
        <div className="type-tags-container">
          {concept.type.map((type, idx) => (
            <span key={idx} className={`type-tag ${getTypeColorClass(type)}`}>
              {type}
            </span>
          ))}
        </div>
        {concept.imageUrl ? (
          <>
            <img
              src={concept.imageUrl}
              alt={concept.title}
              className="card-image-content"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const placeholder = target.parentElement?.querySelector(
                  ".card-image-placeholder"
                ) as HTMLElement;
                if (placeholder) {
                  placeholder.style.display = "flex";
                }
              }}
            />
            <div className="card-image-placeholder" style={{ display: "none" }}>
              Wireframe
            </div>
          </>
        ) : (
          <div className="card-image-placeholder">Wireframe</div>
        )}
      </div>
      <div className="card-header">
        <h3 className="card-title">{concept.title}</h3>
        {concept.opphav && (
          <div className="card-meta">
            <span className="card-meta-label">Opphav:</span>
            <span className="card-meta-value">{concept.opphav}</span>
          </div>
        )}
        {concept.målgruppe && (
          <div className="card-meta">
            <span className="card-meta-label">Målgruppe:</span>
            <span className="card-meta-value">{concept.målgruppe}</span>
          </div>
        )}
        <div className="card-tags">
          {allPhasesSelected ? (
            <span className="mini-tag mini-tag-phase">Alle faser</span>
          ) : (
            phaseTags.map((tag, idx) => (
              <span key={`phase-${idx}`} className={getTagClass(tag)}>
                {tag}
              </span>
            ))
          )}
          {allSeasonsSelected ? (
            <span className="mini-tag mini-tag-season">hele året</span>
          ) : (
            seasonTags.map((tag, idx) => (
              <span key={`season-${idx}`} className={getTagClass(tag)}>
                {tag}
              </span>
            ))
          )}
          {allDaysSelected ? (
            <span className="mini-tag mini-tag-day">hele uken</span>
          ) : (
            dayTags.map((tag, idx) => (
              <span key={`day-${idx}`} className={getTagClass(tag)}>
                {tag}
              </span>
            ))
          )}
          {allTimesSelected ? (
            <span className="mini-tag mini-tag-time">hele dagen</span>
          ) : (
            timeTags.map((tag, idx) => (
              <span key={`time-${idx}`} className={getTagClass(tag)}>
                {tag}
              </span>
            ))
          )}
        </div>
      </div>
      <div className="card-body">
        <div className={`description ${expanded ? "expanded" : ""}`}>
          {concept.description}
          {expanded && (
            <div className="expanded-fields">
              {concept.verdiForBrukerne && (
                <div className="expanded-field">
                  <h4 className="expanded-field-title">Verdi for brukerne</h4>
                  <p className="expanded-field-content">
                    {concept.verdiForBrukerne}
                  </p>
                </div>
              )}
              {concept.verdiForOrganisasjonene && (
                <div className="expanded-field">
                  <h4 className="expanded-field-title">
                    Verdi for organisasjonene
                  </h4>
                  <p className="expanded-field-content">
                    {concept.verdiForOrganisasjonene}
                  </p>
                </div>
              )}
              {concept.hvaMåVærePåPlass && (
                <div className="expanded-field">
                  <h4 className="expanded-field-title">Hva må være på plass</h4>
                  <p className="expanded-field-content">
                    {concept.hvaMåVærePåPlass}
                  </p>
                </div>
              )}
              {concept.hvorStarterVi && (
                <div className="expanded-field">
                  <h4 className="expanded-field-title">Hvor starter vi</h4>
                  <p className="expanded-field-content">
                    {concept.hvorStarterVi}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="card-actions">
          <button
            type="button"
            className="expand-btn"
            onClick={() => setExpanded((prev) => !prev)}
          >
            <span>{expanded ? "Lukk" : "Les mer"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

/* ---------- MAIN PAGE COMPONENT ---------- */

const ProductPage = () => {
  const [concepts, setConcepts] = useState<Concept[]>(initialConcepts);
  const [search, setSearch] = useState("");
  const [selectedPhases, setSelectedPhases] = useState<Phase[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ConceptType[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([]);
  const [selectedDays, setSelectedDays] = useState<DayType[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<TimeType[]>([]);
  const [selectedConceptIds, setSelectedConceptIds] = useState<Set<number>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMethodologyModalOpen, setIsMethodologyModalOpen] = useState(false);
  const [editingConcept, setEditingConcept] = useState<Concept | null>(null);

  const itemsPerPage = 12;

  // Load concepts from CSV file on mount
  useEffect(() => {
    fetch("/konsepter_template.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const importedConcepts = parseCSVToConcepts(csvText);
        if (importedConcepts.length > 0) {
          setConcepts(importedConcepts);
        }
      })
      .catch((error) => {
        console.error("Error loading CSV file:", error);
      });
  }, []);

  const filteredConcepts = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return concepts.filter((item) => {
      const searchMatch =
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch) ||
        item.opphav.toLowerCase().includes(normalizedSearch) ||
        item.målgruppe.toLowerCase().includes(normalizedSearch) ||
        item.verdiForBrukerne.toLowerCase().includes(normalizedSearch) ||
        item.verdiForOrganisasjonene.toLowerCase().includes(normalizedSearch) ||
        item.hvaMåVærePåPlass.toLowerCase().includes(normalizedSearch) ||
        item.hvorStarterVi.toLowerCase().includes(normalizedSearch);
      if (!searchMatch) return false;

      if (
        selectedPhases.length > 0 &&
        !item.phase.some((p) => selectedPhases.includes(p))
      ) {
        return false;
      }

      if (
        selectedTypes.length > 0 &&
        !item.type.some((t) => selectedTypes.includes(t))
      ) {
        return false;
      }

      if (
        selectedSeasons.length > 0 &&
        !item.seasonTags.some((tag) => selectedSeasons.includes(tag))
      ) {
        return false;
      }

      if (
        selectedDays.length > 0 &&
        !item.dayTags.some((tag) => selectedDays.includes(tag))
      ) {
        return false;
      }

      if (
        selectedTimes.length > 0 &&
        !item.timeTags.some((tag) => selectedTimes.includes(tag))
      ) {
        return false;
      }

      return true;
    });
  }, [
    concepts,
    search,
    selectedPhases,
    selectedTypes,
    selectedSeasons,
    selectedDays,
    selectedTimes,
  ]);

  const totalPages = Math.ceil(filteredConcepts.length / itemsPerPage) || 1;
  const pageStart = (currentPage - 1) * itemsPerPage;
  const pageItems = filteredConcepts.slice(pageStart, pageStart + itemsPerPage);

  const handleToggleSeason = (value: Season) => {
    setCurrentPage(1);
    setSelectedSeasons((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleToggleDay = (value: DayType) => {
    setCurrentPage(1);
    setSelectedDays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    );
  };

  const handleToggleTime = (value: TimeType) => {
    setCurrentPage(1);
    setSelectedTimes((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  const handleTogglePhase = (value: Phase) => {
    setCurrentPage(1);
    setSelectedPhases((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const handleToggleType = (value: ConceptType) => {
    setCurrentPage(1);
    setSelectedTypes((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveConcept = (concept: Concept) => {
    if (editingConcept) {
      // Update existing concept
      setConcepts((prev) =>
        prev.map((c) => (c.id === concept.id ? concept : c))
      );
    }
    setIsModalOpen(false);
    setEditingConcept(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingConcept(null);
  };

  const handleSelectConcept = (conceptId: number, selected: boolean) => {
    setSelectedConceptIds((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(conceptId);
      } else {
        newSet.delete(conceptId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedConceptIds.size === pageItems.length) {
      setSelectedConceptIds(new Set());
    } else {
      setSelectedConceptIds(new Set(pageItems.map((c) => c.id)));
    }
  };

  const handleDownloadSelected = () => {
    const selectedConcepts = concepts.filter((c) =>
      selectedConceptIds.has(c.id)
    );

    if (selectedConcepts.length === 0) return;

    // Download each PDF individually
    selectedConcepts.forEach((concept, index) => {
      if (!concept.pdfUrl) {
        console.warn(`No PDF URL found for concept: ${concept.title}`);
        return;
      }

      // Create a delay between downloads to avoid browser blocking
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = concept.pdfUrl;
        link.download = `${concept.title.replace(/[^a-z0-9]/gi, "_")}.pdf`;
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 200); // 200ms delay between each download
    });

    // Clear selection after download
    setTimeout(() => {
      setSelectedConceptIds(new Set());
    }, selectedConcepts.length * 200 + 100);
  };

  return (
    <main>
      {/* Filter bar */}
      <section className="filter-bar">
        <div className="filter-bar-header">
          <img
            src="/images/MITTROMMET.png"
            alt="Logo"
            className="filter-bar-logo"
          />
          <div className="filter-group filter-group-search">
            <div className="search-container">
              <input
                type="text"
                placeholder="Søk i arkivet..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div id="filter-bar-content" className="filter-bar-content">
          <div className="filter-group">
            <span className="filter-label">Fase</span>
            <div className="tag-container">
              {phases.map((p) => (
                <FilterTag
                  key={p}
                  label={p}
                  active={selectedPhases.includes(p)}
                  onToggle={() => handleTogglePhase(p)}
                />
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Type</span>
            <div className="tag-container">
              {conceptTypes.map((t) => (
                <FilterTag
                  key={t}
                  label={t}
                  active={selectedTypes.includes(t)}
                  onToggle={() => handleToggleType(t)}
                />
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Årstid</span>
            <div className="tag-container">
              {seasons.map((s) => (
                <FilterTag
                  key={s}
                  label={s}
                  active={selectedSeasons.includes(s)}
                  onToggle={() => handleToggleSeason(s)}
                />
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Dager</span>
            <div className="tag-container">
              {days.map((d) => (
                <FilterTag
                  key={d}
                  label={d}
                  active={selectedDays.includes(d)}
                  onToggle={() => handleToggleDay(d)}
                />
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Tid</span>
            <div className="tag-container">
              {times.map((t) => (
                <FilterTag
                  key={t}
                  label={t}
                  active={selectedTimes.includes(t)}
                  onToggle={() => handleToggleTime(t)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <MethodologyModal
        isOpen={isMethodologyModalOpen}
        onClose={() => setIsMethodologyModalOpen(false)}
      />
      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "18px 18px",
        }}
      >
        <button
          type="button"
          className="add-concept-btn"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px",
            backgroundColor: "#363254",
            border: "none",
          }}
          onClick={() => setIsMethodologyModalOpen(true)}
        >
          Metode for testing
        </button>
      </section>

      {/* Selection bar */}
      {selectedConceptIds.size > 0 && (
        <div className="selection-bar">
          <div className="selection-bar-content">
            <span className="selection-count">
              {selectedConceptIds.size} konsept
              {selectedConceptIds.size !== 1 ? "er" : ""} valgt
            </span>
            <div className="selection-actions">
              <button
                type="button"
                className="select-all-btn"
                onClick={handleSelectAll}
              >
                {selectedConceptIds.size === pageItems.length
                  ? "Fjern alle"
                  : "Velg alle på siden"}
              </button>
              <button
                type="button"
                className="download-selected-btn"
                onClick={handleDownloadSelected}
              >
                Last ned valgte ({selectedConceptIds.size})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}

      <section className="archive-container">
        {pageItems.length === 0 ? (
          <div className="no-results">
            Ingen treff. Juster filtrene dine for å se mer.
          </div>
        ) : (
          pageItems.map((concept) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              isSelected={selectedConceptIds.has(concept.id)}
              onSelect={handleSelectConcept}
            />
          ))
        )}
      </section>

      {/* Pagination */}
      <nav className="pagination">
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;
          return (
            <button
              key={pageNumber}
              type="button"
              className={`page-btn ${
                currentPage === pageNumber ? "active" : ""
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </nav>

      {/* Modal */}
      <ConceptModal
        isOpen={isModalOpen}
        concept={editingConcept}
        onClose={handleCloseModal}
        onSave={handleSaveConcept}
      />
    </main>
  );
};

export default ProductPage;
