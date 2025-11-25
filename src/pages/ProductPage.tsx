import { useMemo, useState } from "react";

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

// Generate concepts once at module load
const concepts: Concept[] = Array.from({ length: 50 }, (_, i) => {
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
}

const ConceptCard = ({ concept }: ConceptCardProps) => {
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
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </article>
  );
};

/* ---------- MAIN PAGE COMPONENT ---------- */

const ProductPage = () => {
  const [search, setSearch] = useState("");
  const [phase, setPhase] = useState<Phase | "alle">("alle");
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([]);
  const [selectedDays, setSelectedDays] = useState<DayType[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<TimeType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
  }, [search, phase, selectedSeasons, selectedDays, selectedTimes]);

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

  return (
    <main>
      {/* Filter bar */}
      <section className="filter-bar">
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
            <ConceptCard key={concept.id} concept={concept} />
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
    </main>
  );
};

export default ProductPage;
