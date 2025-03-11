import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import style from "./NavbarComp.module.css";
import { UserrContext } from "../../Context/UserrContext";

function BasicExample() {
  let { token, notesCount, logOut } = useContext(UserrContext);

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand>
          <div className="d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-note-sticky text-white fa-xl me-3"></i>
            <h1 className="h3 text-white">Stikey App</h1>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <div className="me-4 d-flex justify-content-center align-items-center">
              {/* Facebook Link */}
              <Nav.Link
                href="https://www.facebook.com/Mostaamr99"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="text-white h6 d-flex align-items-center gap-2"
                  style={{
                    cursor: "pointer",
                    transition:
                      "transform 0.2s ease-in-out, opacity 0.2s ease-in-out",
                    opacity: 0.9,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
                >
                  <FaFacebook
                    className="me-2 fs-5 text-white"
                    style={{
                      filter: "drop-shadow(0px 0px 5px rgba(255,255,255,0.5))",
                    }}
                  />
                </span>
              </Nav.Link>

              {/* Twitter Link */}
              <Nav.Link
                href="https://x.com/Mustafa8_amr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="text-white h6 d-flex align-items-center gap-2"
                  style={{
                    cursor: "pointer",
                    transition:
                      "transform 0.2s ease-in-out, opacity 0.2s ease-in-out",
                    opacity: 0.9,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
                >
                  <FaTwitter
                    className="me-2 fs-5 text-white"
                    style={{
                      filter: "drop-shadow(0px 0px 5px rgba(255,255,255,0.5))",
                    }}
                  />
                </span>
              </Nav.Link>

              {/* Instagram Link */}
              <Nav.Link
                href="https://www.instagram.com/mostafa8.amr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="text-white h6 d-flex align-items-center gap-2"
                  style={{
                    cursor: "pointer",
                    transition:
                      "transform 0.2s ease-in-out, opacity 0.2s ease-in-out",
                    opacity: 0.9,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
                >
                  <FaInstagram
                    className="me-2 fs-5 text-white"
                    style={{
                      filter: "drop-shadow(0px 0px 5px rgba(255,255,255,0.5))",
                    }}
                  />
                </span>
              </Nav.Link>
            </div>
            {token ? (
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-box-open text-white postion-relative"></i>
                  {}
                  <h6
                    className={`position-absolute ${style.iconPos} text-white`}
                  >
                    {notesCount}
                  </h6>
                </div>
                <Nav.Link>
                  <span
                    onClick={logOut}
                    className="text-white ms-2 h6 d-flex align-items-center gap-2"
                    style={{
                      cursor: "pointer",
                      transition:
                        "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
                      opacity: 0.9,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.9";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    LogOut
                  </span>
                </Nav.Link>
              </div>
            ) : (
              <>
                <Nav.Link href="signup">
                  <span
                    className="text-white h6 mx-2"
                    style={{
                      cursor: "pointer",
                      transition:
                        "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
                      opacity: 0.9,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.9";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    Sign Up
                  </span>
                </Nav.Link>
                <Nav.Link href="login">
                  <span
                    className="text-white h6 mx-2"
                    style={{
                      cursor: "pointer",
                      transition:
                        "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
                      opacity: 0.9,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.9";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    Log In
                  </span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
