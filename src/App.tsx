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
            to="/product"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            Produkt
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
              cursor: "pointer",
              fontFamily: "inherit",
              width: "100%",
            }}
          >
            Last ned ressurser
          </button>
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
