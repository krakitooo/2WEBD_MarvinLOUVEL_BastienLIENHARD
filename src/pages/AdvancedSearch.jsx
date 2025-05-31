import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { metAPI } from "../api/metAPI";
import ObjectCard from "../components/ObjectCard";
import Loader from "../components/Loader";
import "../styles/advancedsearch.css";

const { BASE_URL } = metAPI;

const validateDate = (date) => {
  const dateNum = parseInt(date);
  return (
    !isNaN(dateNum) && dateNum >= -10000 && dateNum <= new Date().getFullYear()
  );
};

const validateSearchParams = (params) => {
  const errors = [];
  if (params.dateBegin && !validateDate(params.dateBegin)) {
    errors.push("Invalid start date");
  }
  if (params.dateEnd && !validateDate(params.dateEnd)) {
    errors.push("Invalid end date");
  }
  if (params.departmentId && !Number.isInteger(Number(params.departmentId))) {
    errors.push("Invalid department ID");
  }
  return errors;
};

function AdvancedSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;
  const [filters, setFilters] = useState({
    q: searchParams.get("q") || "",
    departmentId: searchParams.get("departmentId") || "",
    isHighlight: searchParams.get("isHighlight") === "true" || false,
    isOnView: searchParams.get("isOnView") === "true" || false,
    artistOrCulture: searchParams.get("artistOrCulture") === "true" || false,
    medium: searchParams.get("medium") || "",
    dateBegin: searchParams.get("dateBegin") || "",
    dateEnd: searchParams.get("dateEnd") || "",
  });
  const [pageInput, setPageInput] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await metAPI.getDepartments();
        setDepartments(data.departments || []);
      } catch (error) {
        console.error("Failed to load departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSearch = useCallback(
    async (e, page = 1) => {
      e?.preventDefault();
      setError(null);

      const sanitizedFilters = Object.fromEntries(
        Object.entries(filters).map(([key, value]) => [
          key,
          typeof value === "string" ? value.trim() : value,
        ])
      );

      const validationErrors = validateSearchParams(sanitizedFilters);
      if (validationErrors.length > 0) {
        setError(validationErrors.join(", "));
        return;
      }

      try {
        setLoading(true);

        const searchFilters = Object.fromEntries(
          Object.entries(sanitizedFilters).filter(([, value]) => {
            if (typeof value === "boolean") {
              return value === true;
            }
            return value !== "";
          })
        );

        const urlParams = { ...searchFilters };
        if (page > 1) {
          urlParams.page = page;
        }
        setSearchParams(urlParams);

        const searchResults = await metAPI.advancedSearch(searchFilters);

        if (!searchResults.objectIDs || searchResults.objectIDs.length === 0) {
          setResults([]);
          setTotalResults(0);
          return;
        }

        setTotalResults(searchResults.total);

        const startIndex = (page - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        const pageIds = searchResults.objectIDs.slice(startIndex, endIndex);

        const objectDetails = await Promise.all(
          pageIds.map(async (id) => {
            try {
              const data = await metAPI.getObject(id);
              return data;
            } catch (error) {
              console.error(`Failed to fetch object ${id}:`, error);
              return null;
            }
          })
        );

        const validObjects = objectDetails.filter((obj) => obj !== null);
        setResults(validObjects);
        setCurrentPage(page);

        if (validObjects.length === 0) {
          setError("Aucun résultat trouvé pour cette recherche.");
        }
      } catch (error) {
        console.error("Search error:", error);
        setError(
          "Une erreur est survenue lors de la recherche. Veuillez réessayer."
        );
      } finally {
        setLoading(false);
      }
    },
    [filters, setSearchParams]
  );

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    if (searchParams.get("q")) {
      handleSearch(null, page);
    }
  }, [searchParams, handleSearch]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePageChange = (newPage) => {
    handleSearch(null, newPage);
  };

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(pageInput);
    if (
      pageNumber &&
      pageNumber > 0 &&
      pageNumber <= Math.ceil(totalResults / resultsPerPage)
    ) {
      handlePageChange(pageNumber);
      setPageInput("");
    }
  };

  const mediumOptions = [
    "Paintings",
    "Sculpture",
    "Textiles",
    "Ceramics",
    "Furniture",
    "Photographs",
    "Jewelry",
    "Prints",
    "Musical Instruments",
    "Drawings",
  ];

  return (
    <div className="advanced-search">
      <h1>Advanced Search</h1>

      <form onSubmit={(e) => handleSearch(e, 1)} className="search-form">
        <div className="form-group">
          <label htmlFor="q">Keywords</label>
          <input
            type="text"
            id="q"
            name="q"
            value={filters.q}
            onChange={handleFilterChange}
            placeholder="Search by keywords..."
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="departmentId">Department</label>
          <select
            id="departmentId"
            name="departmentId"
            value={filters.departmentId}
            onChange={handleFilterChange}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentId}>
                {dept.displayName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="medium">Medium</label>
          <select
            id="medium"
            name="medium"
            value={filters.medium}
            onChange={handleFilterChange}
          >
            <option value="">All Mediums</option>
            {mediumOptions.map((medium) => (
              <option key={medium} value={medium}>
                {medium}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateBegin">Date Begin</label>
            <input
              type="number"
              id="dateBegin"
              name="dateBegin"
              value={filters.dateBegin}
              onChange={handleFilterChange}
              placeholder="e.g. -3000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateEnd">Date End</label>
            <input
              type="number"
              id="dateEnd"
              name="dateEnd"
              value={filters.dateEnd}
              onChange={handleFilterChange}
              placeholder="e.g. 2023"
            />
          </div>
        </div>

        <div className="form-options">
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="isHighlight"
                checked={filters.isHighlight}
                onChange={handleFilterChange}
              />
              Show only highlights
            </label>
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="isOnView"
                checked={filters.isOnView}
                onChange={handleFilterChange}
              />
              Currently on view
            </label>
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="artistOrCulture"
                checked={filters.artistOrCulture}
                onChange={handleFilterChange}
              />
              Search in artist/culture
            </label>
          </div>
        </div>

        <button type="submit" className="search-submit">
          Search
        </button>
      </form>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : results.length > 0 ? (
        <>
          <div className="results-header">
            <p className="results-count">
              Showing {(currentPage - 1) * resultsPerPage + 1}-
              {Math.min(currentPage * resultsPerPage, totalResults)} of{" "}
              {totalResults} results
            </p>
          </div>
          <div className="results-grid">
            {results.map((object) => (
              <ObjectCard key={object.objectID} object={object} />
            ))}
          </div>
          {totalResults > resultsPerPage && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <div className="pagination-controls">
                <span className="page-info">
                  Page {currentPage} of{" "}
                  {Math.ceil(totalResults / resultsPerPage)}
                </span>
                <form onSubmit={handlePageInputSubmit} className="page-form">
                  <input
                    type="number"
                    value={pageInput}
                    onChange={handlePageInputChange}
                    placeholder="Go to page..."
                    min="1"
                    max={Math.ceil(totalResults / resultsPerPage)}
                    className="page-input"
                  />
                  <button type="submit" className="go-to-page-button">
                    Go
                  </button>
                </form>
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage >= Math.ceil(totalResults / resultsPerPage)
                }
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        searchParams.get("q") && (
          <p className="no-results">
            No results found. Try different search terms.
          </p>
        )
      )}
    </div>
  );
}

export default AdvancedSearch;
