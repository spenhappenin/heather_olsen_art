import React, { useState, useEffect, useContext, } from "react";
import { AuthContext, } from "../../providers/AuthProvider";
import { Icon, } from "semantic-ui-react";
import { withRouter, } from "react-router-dom";
import { NavItems, NavLogo, StyledLink, StyledMockLink, StyledNavbar, } from "../../styles/navbar";

const Navbar = (props) => {
  const auth = useContext(AuthContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect( () => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  })

  const showLogout = () => {
    if (auth.user)
      return (
        <StyledMockLink
          onClick={() => auth.handleLogout(props.history)}
          className="nav-link"
          rel="noopener noreferrer"
        >
          LOGOUT
        </StyledMockLink>
      )
  };

  const displayRoutes = () => {
    const links = [
      { route: "/work", adminRoute: "/work", text: "ARTWORK", },
      { route: "/cv", adminRoute: "/admin-cv", text: "CV", },
      { route: "/media", adminRoute: "/media", text: "MEDIA", },
      { route: "/about", adminRoute: "/about", text: "ABOUT", },
      { route: "/contact", adminRoute: "/contact", text: "CONTACT", }
    ];

    return links.map( link => {
      return (
        <StyledLink
          key={link.route}
          to={auth.user ? link.adminRoute : link.route}
          activeStyle={{ color: "#525252" }}
          className="nav-link"
          rel="noopener noreferrer"
        >
          { link.text }
        </StyledLink>
      )
    });
  };

  if (windowWidth <= 767) {
    return (
      <StyledNavbar mobile>
        <Icon
          name="sidebar"
          size="large"
          onClick={props.toggleSideNav}
          inverted
          color="grey"
        />
        <NavLogo>
          <StyledLink to="/" title rel="noopener noreferrer">
            HEATHER OLSEN ART
          </StyledLink>
        </NavLogo>
      </StyledNavbar>
    )
  } else {
    return (
      <div>
        <StyledNavbar>
          <NavLogo>
            <StyledLink to="/" title rel="noopener noreferrer">
              HEATHER OLSEN ART
            </StyledLink>
          </NavLogo>
          <NavItems>
            { displayRoutes() }
            { showLogout() }
          </NavItems>
        </StyledNavbar>
      </div>
    )
  };
}

export default withRouter(Navbar);
