import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchBar({ showSearch, setShowSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Reset search term when navigating to a different page
    setShowSearch(false);
  }, [location, setShowSearch]);

  // SUBMIT SEARCH
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    navigate(`/catalog?search=${searchTerm}`);

    // RESET SEARCH BAR VALUE
    setSearchTerm("");
    // CLOSE SEARCH BAR
    setShowSearch(false);
  };

  return (
    <div 
      className={`searchbar-wrapper ${showSearch ? 'active' : ''}`}
      style={{
        borderTop: "none",
        borderBottom: "4px solid #111111",
        backgroundColor: "#ffffff"
      }}
    >
      <div className="container">
        <form onSubmit={handleSearch} className="row g-3 align-items-center">

          {/* SEARCH INPUT */}
          <div className="col-12 col-md-9">
            <div className="search-input-wrapper">
              <i className="bi bi-search searchbar-icon"></i>
              <input 
                type="text" 
                className="searchbar-input" 
                placeholder="Cerca manga, comics..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <div className="col-12 col-md-3">
            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "#E63946",
                color: "#ffffff",
                border: "3px solid #111111",
                fontFamily: '"Impact", "Arial Black", sans-serif',
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                borderRadius: "0px",
                boxShadow: "3px 3px 0px #111111",
                padding: "10px 20px"
              }}
            >
              Cerca
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
