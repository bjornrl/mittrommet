import { useMemo, useState, useEffect } from "react";

type Phase = "Nåtid" | "Mellomtid" | "Nytid";
type Season = "Vår" | "Sommer" | "Høst" | "Vinter";
type DayType = "Ukedager" | "Helg";
type TimeType = "Dag" | "Kveld/natt";

interface Concept {
  id: number;
  title: string;
  phase: Phase;
  seasonTags: Season[];
  dayTags: DayType[];
  timeTags: TimeType[];
  description: string;
}

/* ---------- DATA GENERATION (same idea as original) ---------- */

const phases: Phase[] = ["Nåtid", "Mellomtid", "Nytid"];
const seasons: Season[] = ["Vår", "Sommer", "Høst", "Vinter"];
const days: DayType[] = ["Ukedager", "Helg"];
const times: TimeType[] = ["Dag", "Kveld/natt"];

const fillerWords = [
  "Teatersal",
  "Museumsvandring",
  "Kaffebar",
  "Publikumsmøte",
  "Utescene",
  "Verksted",
  "Impro",
  "Billettsystem",
  "Utstilling",
  "Innsikt",
  "Arkitektur",
  "Samspill",
  "Akustikk",
  "Foajé",
  "Backstage",
  "Lyssetting",
  "Lydbilde",
  "Dramaturgi",
  "Samling",
  "Formidling",
];

function getRandomSubset<T>(arr: T[], maxItems = 2): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * maxItems) + 1;
  return shuffled.slice(0, count);
}

function generateLorem(wordCount: number): string {
  let text = "";
  const lorem = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
  ];
  for (let i = 0; i < wordCount; i++) {
    if (Math.random() < 0.1) {
      text +=
        fillerWords[
          Math.floor(Math.random() * fillerWords.length)
        ].toLowerCase() + " ";
    } else {
      text += lorem[Math.floor(Math.random() * lorem.length)] + " ";
    }
  }
  const sentence = text.trim();
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

// Generate initial concepts
const initialConcepts: Concept[] = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    title: `${
      fillerWords[Math.floor(Math.random() * fillerWords.length)]
    } – Konsept ${id}`,
    phase: phases[Math.floor(Math.random() * phases.length)],
    seasonTags: getRandomSubset(seasons, 3),
    dayTags: getRandomSubset(days, 2),
    timeTags: getRandomSubset(times, 2),
    description: `En kort beskrivelse av kjerneideen. ${generateLorem(
      20
    )} Potensialet for dette er stort. ${generateLorem(35)}`,
  };
});

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
  const [phase, setPhase] = useState<Phase>("Nåtid");
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([]);
  const [selectedDays, setSelectedDays] = useState<DayType[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<TimeType[]>([]);
  const [description, setDescription] = useState("");

  // Initialize form when concept changes
  useEffect(() => {
    if (concept) {
      setTitle(concept.title);
      setPhase(concept.phase);
      setSelectedSeasons(concept.seasonTags);
      setSelectedDays(concept.dayTags);
      setSelectedTimes(concept.timeTags);
      setDescription(concept.description);
    } else {
      setTitle("");
      setPhase("Nåtid");
      setSelectedSeasons([]);
      setSelectedDays([]);
      setSelectedTimes([]);
      setDescription("");
    }
  }, [concept, isOpen]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const conceptData: Concept = {
      id: concept?.id || Date.now(),
      title: title.trim(),
      phase,
      seasonTags: selectedSeasons,
      dayTags: selectedDays,
      timeTags: selectedTimes,
      description: description.trim(),
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
            <label htmlFor="phase" className="modal-label">
              Fase *
            </label>
            <select
              id="phase"
              className="modal-select"
              value={phase}
              onChange={(e) => setPhase(e.target.value as Phase)}
              required
            >
              {phases.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
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
  onEdit: (concept: Concept) => void;
}

const ConceptCard = ({ concept, onEdit }: ConceptCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const allTags = [
    concept.phase,
    ...concept.seasonTags,
    ...concept.dayTags,
    ...concept.timeTags,
  ];

  return (
    <article className="concept-card">
      <div className="card-image">Wireframe</div>
      <div className="card-header">
        <h3 className="card-title">{concept.title}</h3>
        <div className="card-tags">
          {allTags.map((t, idx) => (
            <span key={idx} className="mini-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="card-body">
        <div className={`description ${expanded ? "expanded" : ""}`}>
          {concept.description}
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
          <button
            type="button"
            className="edit-btn"
            onClick={() => onEdit(concept)}
            title="Rediger konsept"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
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
  const [phase, setPhase] = useState<Phase | "alle">("alle");
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([]);
  const [selectedDays, setSelectedDays] = useState<DayType[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<TimeType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConcept, setEditingConcept] = useState<Concept | null>(null);

  const itemsPerPage = 12;

  const filteredConcepts = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return concepts.filter((item) => {
      const searchMatch =
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch);
      if (!searchMatch) return false;

      if (phase !== "alle" && item.phase !== phase) return false;

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
  }, [concepts, search, phase, selectedSeasons, selectedDays, selectedTimes]);

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

  const handlePhaseChange = (value: Phase | "alle") => {
    setPhase(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddConcept = () => {
    setEditingConcept(null);
    setIsModalOpen(true);
  };

  const handleEditConcept = (concept: Concept) => {
    setEditingConcept(concept);
    setIsModalOpen(true);
  };

  const handleSaveConcept = (concept: Concept) => {
    if (editingConcept) {
      // Update existing concept
      setConcepts((prev) =>
        prev.map((c) => (c.id === concept.id ? concept : c))
      );
    } else {
      // Add new concept
      setConcepts((prev) => [...prev, concept]);
    }
    setIsModalOpen(false);
    setEditingConcept(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingConcept(null);
  };

  return (
    <main>
      {/* Filter bar */}
      <section className="filter-bar">
        <div className="filter-group">
          <button
            type="button"
            className="add-concept-btn"
            onClick={handleAddConcept}
          >
            + Nytt konsept
          </button>
        </div>

        <div className="filter-group">
          <span className="filter-label">Fase</span>
          <select
            className="select"
            value={phase}
            onChange={(e) =>
              handlePhaseChange(e.target.value as Phase | "alle")
            }
          >
            <option value="alle">Alle Faser</option>
            <option value="Nåtid">Nåtid</option>
            <option value="Mellomtid">Mellomtid</option>
            <option value="Nytid">Nytid</option>
          </select>
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
      </section>

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
              onEdit={handleEditConcept}
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
