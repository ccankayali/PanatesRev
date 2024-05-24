import { Button } from "bootstrap";
import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
      <div>
        <button className="bg-black text-white" >
            <Link to="/">Go back to the Main page</Link>
        </button>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    );
  };
