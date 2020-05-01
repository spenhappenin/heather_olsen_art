import React, { useContext, } from "react";
import { AuthContext, } from "../../providers/AuthProvider";
import { CartContext, } from "../../providers/CartProvider";
import { useWindowWidth, } from "../hooks/useWindowWidth";
import { Icon, } from "semantic-ui-react";
import { withRouter, } from "react-router-dom";
import { NavItems, NavLogo, StyledLink, StyledMockLink, StyledNavbar, } from "../../styles/navbar";

const Navbar = (props) => {
  const auth = useContext(AuthContext);
  const { cart, } = useContext(CartContext);
  const windowWidth = useWindowWidth();

  const showLogout = () => {
    if (auth.user)
      return (
        <StyledMockLink
          onClick={ () => auth.handleLogout(props.history) }
          rel="noopener noreferrer"
        >
          LOGOUT
        </StyledMockLink>
      )
  };

  const displayRoutes = () => {
    const cartText = cart.length === 0 ? "CART" : `CART (${cart.length})`
    const links = [
      { route: "/work", adminRoute: "/work", text: "ARTWORK", },
      { route: "/cv", adminRoute: "/admin-cv", text: "CV", },
      { route: "/media", adminRoute: "/media", text: "MEDIA", },
      { route: "/about", adminRoute: "/about", text: "ABOUT", },
      { route: "/blog", adminRoute: "/blog", text: "BLOG", },
      { route: "/contact", adminRoute: "/contact", text: "CONTACT", },
      // { route: "/available-work", adminRoute: "/available-work", text: "SHOP", },
      // { route: "/butterflies", adminRoute: "/butterflies", text: "BUTTERFLIES", },
      // { route: "/cart", adminRoute: "/cart", text: cartText, },
    ];

    return links.map( link => {
      return (
        <StyledLink
          key={link.route}
          to={auth.user ? link.adminRoute : link.route}
          activeStyle={{ color: "#525252" }}
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
    );
  };
};

export default withRouter(Navbar);
