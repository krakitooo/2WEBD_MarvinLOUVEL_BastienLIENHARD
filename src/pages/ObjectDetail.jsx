import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { metAPI } from "../api/metAPI";
import Loader from "../components/Loader";
import "../styles/objectdetail.css";

function ObjectDetail() {
  const { objectId } = useParams();
  const [object, setObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchObject = async () => {
      if (!objectId || isNaN(objectId)) {
        setError("Invalid object ID");
        return;
      }
      try {
        setLoading(true);
        const data = await metAPI.getObject(objectId);
        setObject(data);
      } catch (error) {
        setError("Failed to load object details. Please try again later.");
        console.error("Error fetching object:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchObject();
  }, [objectId]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (loading) return <Loader />;

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!object) {
    return <div className="not-found">Object not found</div>;
  }

  return (
    <div className="object-detail">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> / {object.title}
      </nav>

      <div className="object-header">
        <h1>{object.title}</h1>
        {object.artistDisplayName && (
          <h2 className="artist">
            By {object.artistDisplayName}
            {object.artistDisplayBio && ` (${object.artistDisplayBio})`}
          </h2>
        )}
      </div>

      <div className="object-content">
        <div className="object-image-container">
          {object.primaryImage ? (
            <img
              src={object.primaryImage}
              alt={object.title}
              className="detail-image"
              onClick={() => handleImageClick(object.primaryImage)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <div className="no-image">No Image Available</div>
          )}
        </div>

        <div className="object-info">
          <div className="info-section">
            <h3>Details</h3>
            <dl>
              {object.objectDate && (
                <>
                  <dt>Date</dt>
                  <dd>{object.objectDate}</dd>
                </>
              )}
              {object.period && (
                <>
                  <dt>Period</dt>
                  <dd>{object.period}</dd>
                </>
              )}
              {object.culture && (
                <>
                  <dt>Culture</dt>
                  <dd>{object.culture}</dd>
                </>
              )}
              {object.medium && (
                <>
                  <dt>Medium</dt>
                  <dd>{object.medium}</dd>
                </>
              )}
              {object.dimensions && (
                <>
                  <dt>Dimensions</dt>
                  <dd>{object.dimensions}</dd>
                </>
              )}
            </dl>
          </div>

          {object.department && (
            <div className="info-section">
              <h3>Department</h3>
              <p>{object.department}</p>
            </div>
          )}

          {object.creditLine && (
            <div className="info-section">
              <h3>Credit</h3>
              <p>{object.creditLine}</p>
            </div>
          )}

          {object.objectHistory && (
            <div className="info-section">
              <h3>History</h3>
              <p>{object.objectHistory}</p>
            </div>
          )}

          {object.additionalImages?.length > 0 && (
            <div className="additional-images">
              <h3>Additional Images</h3>
              <div className="images-grid">
                {object.additionalImages.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageClick(image)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={image}
                      alt={`${object.title} - View ${index + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <img src={selectedImage} alt="Full size" />
            <button className="close-modal" onClick={handleCloseModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ObjectDetail;
