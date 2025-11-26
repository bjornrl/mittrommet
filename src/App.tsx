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
  const [isFirstDropdownOpen, setIsFirstDropdownOpen] = useState(false);
  const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const secondButtonRef = useRef<HTMLButtonElement>(null);

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
            Landing
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
            Tjenestekonsepter
          </NavLink>
          <button
            ref={firstButtonRef}
            onClick={() => {
              setIsFirstDropdownOpen(!isFirstDropdownOpen);
              setIsSecondDropdownOpen(false);
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
            Organisation - last ned tronds presentasjon
          </button>

          <button
            ref={secondButtonRef}
            onClick={() => {
              setIsSecondDropdownOpen(!isSecondDropdownOpen);
              setIsFirstDropdownOpen(false);
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
            Det tredje rommet - joana presentasjon
          </button>
        </nav>
      </header>

      <ResourcesDropdown
        isOpen={isFirstDropdownOpen}
        onClose={() => setIsFirstDropdownOpen(false)}
        buttonRef={firstButtonRef}
        resources={[
          {
            id: 1,
            name: "Tronds presentasjon",
            filename: "tronds-presentasjon.pdf",
          },
        ]}
      />
      <ResourcesDropdown
        isOpen={isSecondDropdownOpen}
        onClose={() => setIsSecondDropdownOpen(false)}
        buttonRef={secondButtonRef}
        resources={[
          {
            id: 2,
            name: "Joana presentasjon",
            filename: "joana-presentasjon.pdf",
          },
        ]}
      />
    </div>
  );
}

export default App;
