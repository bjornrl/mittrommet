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
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const resourcesButtonRef = useRef<HTMLButtonElement>(null);

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
          <button
            ref={resourcesButtonRef}
            onClick={() => setIsResourcesDropdownOpen(!isResourcesDropdownOpen)}
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
            ref={resourcesButtonRef}
            onClick={() => setIsResourcesDropdownOpen(!isResourcesDropdownOpen)}
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
          <NavLink
            to="/product"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            Tjenestekonsepter
          </NavLink>
        </nav>
      </header>

      <ResourcesDropdown
        isOpen={isResourcesDropdownOpen}
        onClose={() => setIsResourcesDropdownOpen(false)}
        buttonRef={resourcesButtonRef}
      />
    </div>
  );
}

export default App;
