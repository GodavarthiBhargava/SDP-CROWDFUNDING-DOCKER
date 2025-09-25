import NotFoundImage from "../assets/main.png";
import "./css/NotFound.css";

export default function NotFound() {
  return (
    <div className="container not-found-container">
      <h1>Page Not Found</h1>
      <img src={NotFoundImage} alt="Page Not Found" className="not-found-image" />
    </div>
  );
}
