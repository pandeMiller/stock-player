import { Link } from "react-router-dom";
// import "../stylsses/Header.css";
import PathConstants from "../routes/PathConstants";

export default function Header() {
  return (
    <div className="container mt-5">
      {/* <div className="container-fluid"> */}
      {/* <h1 className="title"> */}
      {/* <Link to={PathConstants.HOME}>Realtime</Link> */}
      {/* <Link to={PathConstants.QUERY}>Query</Link>
          <Link to={PathConstants.ABOUT}>About</Link> */}
      {/* </h1> */}
      <nav className="navbar bg-primary navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <div className="collapse navbar-collapse ">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="container">
                  <Link to={PathConstants.HOME} className="fs-2">
                    Realtime
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="container">
                  <Link to={PathConstants.QUERY} className="fs-2">
                    Query
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="container">
                  <Link to={PathConstants.ABOUT} className="fs-2">
                    About
                  </Link>{" "}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* </div> */}
    </div>
  );
}
