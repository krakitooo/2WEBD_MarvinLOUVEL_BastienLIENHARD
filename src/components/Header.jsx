import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>MET Collection</h1>
        </Link>
        <nav>
          <Link to="/" className="nav-link">
            Visit
          </Link>
          <Link to="/advanced-search" className="nav-link">
            Collections
          </Link>
          <Link to="/highlights" className="nav-link">
            Highlights
          </Link>
          <SearchBar />
        </nav>
      </div>
    </header>
  );
}

export default Header;
