import { Link } from "react-router-dom";
import "../styles/objectcard.css";

function ObjectCard({ object }) {
  return (
    <Link to={`/object/${object.objectID}`} className="object-card">
      <div className="object-image">
        {object.primaryImage ? (
          <img
            src={object.primaryImageSmall}
            alt={object.title}
            loading="lazy"
          />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>
      <div className="object-info">
        <h3 className="object-title">{object.title}</h3>
        {object.artistDisplayName && (
          <p className="object-artist">{object.artistDisplayName}</p>
        )}
        <p className="object-date">{object.objectDate || "Date unknown"}</p>
        {object.department && (
          <p className="object-department">{object.department}</p>
        )}
      </div>
    </Link>
  );
}

export default ObjectCard;
