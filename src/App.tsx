import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import { ResourcesDropdown } from "./components/ResourcesDropdown";

function App() {
  const location = useLocation();
  const isProductPage = location.pathname === "/product";
  const isAboutPage = location.pathname === "/about";
  const [isPdfsDropdownOpen, setIsPdfsDropdownOpen] = useState(false);
  // const [isPodcastsDropdownOpen, setIsPodcastsDropdownOpen] = useState(false);
  const pdfsButtonRef = useRef<HTMLButtonElement>(null);
  // const podcastsButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>

      <header
        className={`app-header ${isProductPage ? "product-page-nav" : ""} ${
          isAboutPage ? "about-page-nav" : ""
        }`}
      >
        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
            end
          >
            Landingsside
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            Om
          </NavLink>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            Idébank
          </NavLink>
          <button
            ref={pdfsButtonRef}
            onClick={() => {
              setIsPdfsDropdownOpen(!isPdfsDropdownOpen);
              // setIsPodcastsDropdownOpen(false);
            }}
            className="nav-link"
            style={{
              border: "none",
              borderRight: "1px solid rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              fontFamily: "inherit",
              width: "100%",
            }}
          >
            Presentasjoner
          </button>

          {/* <button
            ref={podcastsButtonRef}
            onClick={() => {
              setIsPodcastsDropdownOpen(!isPodcastsDropdownOpen);
              setIsPdfsDropdownOpen(false);
            }}
            className="nav-link"
            style={{
              border: "none",
              borderRight: "1px solid rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              fontFamily: "inherit",
              width: "100%",
            }}
          >
            Podcaster
          </button> */}
        </nav>
      </header>

      <ResourcesDropdown
        isOpen={isPdfsDropdownOpen}
        onClose={() => setIsPdfsDropdownOpen(false)}
        buttonRef={pdfsButtonRef}
        resources={[
          {
            id: 1,
            name: "Det tredje rommet",
            filename: "tronds-presentasjon.pdf",
            type: "pdf",
          },
          {
            id: 2,
            name: "Tjenestekonsepter",
            filename: "joana-presentasjon.pdf",
            type: "pdf",
          },
          {
            id: 3,
            name: "Organisasjon",
            filename: "joana-presentasjon.pdf",
            type: "pdf",
          },
        ]}
      />
      {/* <ResourcesDropdown
        isOpen={isPodcastsDropdownOpen}
        onClose={() => setIsPodcastsDropdownOpen(false)}
        buttonRef={podcastsButtonRef}
        resources={[
          {
            id: 3,
            name: "Podcast 1",
            filename: "podcast-1.mp3",
            type: "podcast",
          },
          {
            id: 4,
            name: "Podcast 2",
            filename: "podcast-2.mp3",
            type: "podcast",
          },
        ]}
      /> */}
    </div>
  );
}

export default App;
