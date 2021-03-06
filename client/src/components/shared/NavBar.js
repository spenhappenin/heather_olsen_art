import React, { useContext, } from "react";

import styled from "styled-components";

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
      { route: "https://heatherolsenart.bigcartel.com/", adminRoute: "https://heatherolsenart.bigcartel.com/", text: "STORE", external: true, },
      { route: "/cart", adminRoute: "/cart", text: cartText, },
    ];

    if (auth.user) {
      links.push({ route: "/orders", adminRoute: "/orders", text: "Orders", })
    }

    return links.map( link => {
      return link.external ?
        <StyledAnchor href={link.route} target="_blank">{ link.text }</StyledAnchor>
      :
        <StyledLink
          key={link.route}
          to={auth.user ? link.adminRoute : link.route}
          activeStyle={{ color: "#525252" }}
          rel="noopener noreferrer"
        >
          { link.text }
        </StyledLink>
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

const StyledAnchor = styled.a`
  color: ${ props => props.title ? '#787878' : '#b7b7b7'};
  display: flex;
  flex-direction: column;
  font-family: ${ props => props.title ? "'Merriweather Sans', sans-serif !important" : "'Julius Sans One', sans-serif !important" };
  font-size: ${ props => props.title ? '20px' : '13px'};
  justify-content: center;
  letter-spacing: 1px;
  padding-left: 10px;
  padding-right: 10px;

  &:hover {
    color: #5f5f5f;
    transition: color 0.3s ease;
  }
`;

export default withRouter(Navbar);
