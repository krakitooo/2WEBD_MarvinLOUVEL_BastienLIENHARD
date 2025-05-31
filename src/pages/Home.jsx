import { useState, useEffect } from "react";
import { metAPI } from "../api/metAPI";
import ObjectCard from "../components/ObjectCard";
import Loader from "../components/Loader";
import "../styles/home.css";

function Home() {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        setLoading(true);
        const data = await metAPI.getHighlights();

        if (!data.objectIDs || data.objectIDs.length === 0) {
          setHighlights([]);
          return;
        }

        const objectDetails = await Promise.all(
          data.objectIDs.slice(0, 8).map((id) => metAPI.getObject(id))
        );

        const objectsWithImages = objectDetails.filter(
          (obj) => obj && obj.primaryImage
        );

        setHighlights(objectsWithImages);
      } catch (error) {
        console.error("Error fetching highlights:", error);
        setError("Failed to load highlights. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to the Metropolitan Museum of Art Collection</h1>
        <p>Explore thousands of artworks from around the world</p>
      </section>

      <section className="highlights">
        <h2>Collection Highlights</h2>
        <div className="highlights-grid">
          {highlights.map((object) => (
            <ObjectCard key={object.objectID} object={object} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
