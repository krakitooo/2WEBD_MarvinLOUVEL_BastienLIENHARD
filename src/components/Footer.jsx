import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About</h3>
          <p>
            This application provides access to The Metropolitan Museum of Art
            Collection API. All artwork and data belongs to The Metropolitan
            Museum of Art.
          </p>
        </div>
        <div className="footer-section">
          <h3>Links</h3>
          <ul>
            <li>
              <a
                href="https://www.metmuseum.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Metropolitan Museum of Art
              </a>
            </li>
            <li>
              <a
                href="https://metmuseum.github.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                API Documentation
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} MET Collection Explorer. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
