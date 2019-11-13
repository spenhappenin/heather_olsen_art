import React, { useState, useEffect, useContext, } from "react";
import About from "./About";
import AllArtwork from "./AllArtwork";
import ArtworkEdit from "./ArtworkEdit";
import ArtworkNew from "./ArtworkNew";
import Blog from "./blog/Blog";
import BlogForm from "./blog/BlogForm";
import BlogView from "./blog/BlogView";
import CategoryForm from "./CategoryForm";
import Contact from "./contact/Contact";
import Cvs from "./cvs/Cvs";
import AdminCvs from "./admin/AdminCvs";
import CvNewForm from "./admin/CvNewForm";
import FlashMessage from "./FlashMessage";
import Login from "./login/Login";
import Media from "./media/Media";
import MediaForm from "./media/MediaForm";
import NavBar from "./shared/NavBar";
import NoMatch from "./NoMatch";
import ProtectedRoute from "./ProtectedRoute";
import styled from "styled-components";
import AuthRoute from "./AuthRoute";
import AdminArtworks from "./AdminArtworks";
import Artworks from "./Artworks";
import Categories from "./Categories";
import SortCategory from "./SortCategory";
import Home from "./root/Home";
import Store from "./Store";
import AddToCart from "./AddToCart";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { AuthContext, } from "../providers/AuthProvider";
import { FlashContext, } from "../providers/FlashProvider";
import { Link, } from "react-router-dom";
import { Menu, Sidebar, } from "semantic-ui-react";
import { Route, Switch, withRouter, } from "react-router-dom";

const App = (props) => {
  const { user, handleLogout, } = useContext(AuthContext);
  const { setFlash, } = useContext(FlashContext);

  const [dimmed, setDimmed] = useState(false);
  const [sideNav, setSideNav] = useState(false);

  const toggleSideNav = () => {
    window.scrollTo(0, 0);
    setSideNav(!sideNav);
    setDimmed(!dimmed);
  };

  const closeSideNav = () => {
    setSideNav(false);
    setDimmed(false);
  };

  const rightNavs = () => {
    const navs = [
      { name: "HOME", path: "/", adminPath: "/" },
      { name: "ARTWORK", path: "/work", adminPath: "/work" },
      { name: "CV", path: "/cv", adminPath: "/admin-cv" },
      { name: "MEDIA", path: "/media", adminPath: "/media" },
      { name: "ABOUT", path: "/about", adminPath: "/about" },
      { name: "BLOG", path: "/blog", adminPath: "/blog" },
      { name: "CONTACT", path: "/contact", adminPath: "/contact" },
      { name: "STORE", path: "/store", adminPath: "/store" },
      { name: "CART", path: "/cart", adminPath: "/cart" },
    ];

    if (user)
      navs.push({ adminName: "LOGOUT", logout: true });

    return navs.map( nav => {
      if (nav.logout) {
        return (
          <SidebarItem
            key={nav.adminName}
            name={user ? nav.adminName : nav.name}
            onClick={ e => {
              handleLogout
              if (sideNav) {
                setSideNav(false);
                setDimmed(false);
              }
            }}
          />
        )
      }
      return (
        <SidebarItem
          as={Link}
          key={nav.name}
          to={user ? nav.adminPath : nav.path}
          rel="noopener noreferrer"
          position="right"
          name={nav.name}
          onClick={ () => {
            if (sideNav) {
              setSideNav(false);
              setDimmed(false);
            }
          }}
        />
      )
    }
    )
  };

  return (
    <div>
      <NavBar toggleSideNav={toggleSideNav} closeSideNav={closeSideNav} />
      <FlashMessage />
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          width="thin"
          visible={sideNav}
          icon="labeled"
          direction="top"
          vertical
          inverted
          style={{ paddingLeft: "30px !important", }}
        >
          { rightNavs() }
        </Sidebar>
        <Sidebar.Pusher dimmed={dimmed}>
          <Switch>
            <Route
              exact
              path="/work"
              render={ () => (
                <Categories />
              )}
            />
            <ProtectedRoute exact path="/work/all" component={AllArtwork} />
            {
              user &&
              <Route
                exact
                path="/work/sort"
                render={ () => <SortCategory /> }
              />
            }
            {
              user &&
              <Route
                exact
                path="/work/new-category"
                render={ () => <CategoryForm /> }
              />
            }
            {
              user &&
                <Route
                  exact
                  path="/work/edit-category/:id"
                  render={ () => <CategoryForm /> }
                />
            }
            {
              user ?
                <ProtectedRoute exact path="/work/:work_title" component={AdminArtworks} />
              :
                <Route exact path="/work/:work_title" component={Artworks} />
            }
            <Route exact path="/blog" component={Blog} />
            <ProtectedRoute exact path="/blog/new" component={BlogForm} />
            <ProtectedRoute exact path="/blog/:id/edit" component={BlogForm} />
            <Route exact path="/blog/:id" component={BlogView} />
            <ProtectedRoute exact path="/work/:work_title/new" component={ArtworkNew} />
            <ProtectedRoute exact path="/work/edit/:id" component={ArtworkEdit} />
            <Route path="/cv" component={Cvs} />
            <ProtectedRoute exact path='/admin-cv/new' component={CvNewForm} />
            <ProtectedRoute path="/admin-cv" component={AdminCvs} />
            <Route exact path="/media" component={Media} />
            <ProtectedRoute path="/media/:id/edit" component={MediaForm} />
            <ProtectedRoute path="/media/new" component={MediaForm} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/available-work" component={Store} />
            <Route exact path="/available-work/:id" component={AddToCart} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <AuthRoute exact path="/login" component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
}

const SidebarItem = styled(Menu.Item)`
  color: #b7b7b7 !important;
  font-family: "Julius Sans One", sans-serif !important;
  padding-top: 16px !important;
  padding-bottom: 16px !important;
`;

export default withRouter(App);
