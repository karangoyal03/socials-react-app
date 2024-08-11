import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas, Nav, Navbar, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./../account/reducer";
import * as client from "./../account/client"
export default function Navigation() {
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.account?.currentUser);
  const dispatch = useDispatch();
  const handleSignOut = async() => {
    await client.signout();
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  return (
    <div className="wd-account-screen">
      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Socials
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Socials
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Item>
                  <Button
                    variant="link"
                    className="nav-link"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    variant="link"
                    className="nav-link"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    variant="link"
                    className="nav-link"
                    onClick={() => handleSignOut()}
                  >
                    Sign Out
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    variant="link"
                    className="nav-link"
                    onClick={() => navigate("/profile")}
                  >
                    My Profile
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    variant="link"
                    className="nav-link"
                    onClick={() => navigate("/movies")}
                  >
                    Movies
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    variant="link"
                    className="nav-link"
                    onClick={() => navigate("/allprofiles")}
                  >
                    All Profiles
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/home">
                    Back to Home
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
