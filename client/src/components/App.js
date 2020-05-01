import React, { lazy, Suspense, useContext, useState, } from "react";

import styled from "styled-components";

import { AuthContext, } from "../providers/AuthProvider";
import { FlashContext, } from "../providers/FlashProvider";
import { CartContext, } from "../providers/CartProvider";
import { Link, } from "react-router-dom";
import { Menu, Sidebar, } from "semantic-ui-react";
import { Route, Switch, withRouter, } from "react-router-dom";

const About = lazy(() => import("./About"));
const AllArtwork = lazy(() => import("./AllArtwork"));
const ArtworkEdit = lazy(() => import("./ArtworkEdit"));
const ArtworkNew = lazy(() => import("./ArtworkNew"));
const Blog = lazy(() => import("./blog/Blog"));
const BlogForm = lazy(() => import("./blog/BlogForm"));
const BlogView = lazy(() => import("./blog/BlogView"));
const CategoryForm = lazy(() => import("./CategoryForm"));
const Contact = lazy(() => import("./contact/Contact"));
const Cvs = lazy(() => import("./cvs/Cvs"));
const AdminCvs = lazy(() => import("./admin/AdminCvs"));
const CvNewForm = lazy(() => import("./admin/CvNewForm"));
const FlashMessage = lazy(() => import("./FlashMessage"));
const Login = lazy(() => import("./login/Login"));
const Media = lazy(() => import("./media/Media"));
const MediaForm = lazy(() => import("./media/MediaForm"));
const NavBar = lazy(() => import("./shared/NavBar"));
const NoMatch = lazy(() => import("./NoMatch"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const AuthRoute = lazy(() => import("./AuthRoute"));
const AdminArtworks = lazy(() => import("./AdminArtworks"));
const Artworks = lazy(() => import("./Artworks"));
const Categories = lazy(() => import("./Categories"));
const SortCategory = lazy(() => import("./SortCategory"));
const Home = lazy(() => import("./root/Home"));
const Store = lazy(() => import("./Store"));
const AddToCart = lazy(() => import("./AddToCart"));
const Cart = lazy(() => import("./Cart"));
const Checkout = lazy(() => import("./Checkout"));
const PaymentSuccess = lazy(() => import("./PaymentSuccess"));

const App = (props) => {
  const { user, handleLogout, } = useContext(AuthContext);
  const { setFlash, } = useContext(FlashContext);
  const { cart, } = useContext(CartContext);

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
    const cartText = cart.length === 0 ? "CART" : `CART (${cart.length})`;
    const navs = [
      { name: "HOME", path: "/", adminPath: "/" },
      { name: "ARTWORK", path: "/work", adminPath: "/work" },
      { name: "CV", path: "/cv", adminPath: "/admin-cv" },
      { name: "MEDIA", path: "/media", adminPath: "/media" },
      { name: "ABOUT", path: "/about", adminPath: "/about" },
      { name: "BLOG", path: "/blog", adminPath: "/blog" },
      { name: "CONTACT", path: "/contact", adminPath: "/contact" },
      // { name: "STORE", path: "/store", adminPath: "/store" },
      // { name: "BUTTERFLIES", path: "/butterflies", adminPath: "/butterflies" },
      // { name: cartText, path: "/cart", adminPath: "/cart" },
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
    })
  };

  return (
    <div>
      <Suspense fallback={<div></div>}>
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
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout" component={Checkout} />
              <AuthRoute exact path="/login" component={Login} />
              {/* <Route exact path="/available-work" render={() => <Store header="Available Work" path="available_artworks" />} /> */}
              <Route exact path="/available-work/:id" component={AddToCart} />
              <Route exact path="/butterflies9999" render={() => <Store header="Butterflies" path="butterflies" />} />
              <Route exact path="/payment-success" component={PaymentSuccess} />
              <Route component={NoMatch} />
            </Switch>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Suspense>
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
