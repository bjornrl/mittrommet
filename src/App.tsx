import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";

function App() {
  const location = useLocation();
  const isProductPage = location.pathname === "/product";
  const isAboutPage = location.pathname === "/about";

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
        </nav>
      </header>
    </div>
  );
}

export default App;
