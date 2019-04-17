import React, { useState, useEffect, useContext, } from "react";
import About from "./About";
import AllArtwork from "./AllArtwork";
import ArtworkEdit from "./ArtworkEdit";
import ArtworkNew from "./ArtworkNew";
import axios from "axios";
import CategoryForm from "./CategoryForm";
import Contact from "./contact/Contact";
import FetchCvs from "./FetchCvs";
import Flash from "./shared/Flash";
import Login from "./login/Login";
import Media from "./media/Media";
import MediaForm from "./media/MediaForm";
import NavBar from "./shared/NavBar";
import NoMatch from "./NoMatch";
import ProtectedRoute from "./ProtectedRoute";
import styled from "styled-components";
import SortCategory from "./SortCategory";
import AuthRoute from "./AuthRoute";
import AdminArtworks from "./AdminArtworks";
import Artworks from "./Artworks";
import Categories from "./Categories";
import Home from "./root/Home";
import { AuthContext, } from "../providers/AuthProvider";
import { Link, } from "react-router-dom";
import { Menu, Sidebar, } from "semantic-ui-react";
import { Route, Switch, withRouter, } from "react-router-dom";

const App = (props) => {
  const { user, handleLogout, } = useContext(AuthContext);
  const [dimmed, setDimmed] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect( () => {
    axios.get("/api/works")
      .then( res => {
        setCategories(res.data);
        setLoaded(true);
      })
      .catch( err => {
        console.log(err.response);
      })
  }, []);

  const toggleSideNav = () => {
    window.scrollTo(0, 0);
    setSideNav(!sideNav);
    setDimmed(!dimmed);
  };

  const closeSideNav = () => {
    setSideNav(false);
    setDimmed(false);
  }

  const createCategory = (category) => {
    setCategories([...categories, category]);
  };

  const updateCategory = (category) => {
    const newCategories = categories.map( c => {
      if (c.id === category.id)
        return c = category;
      return c;
    })
    setCategories(newCategories);
  };
  
  const deleteCategory = (id) => {
    const newCategories = categories.filter( c => c.id !== id);
    setCategories(newCategories);
  };

  const rightNavs = () => {
    const navs = [
      { name: "HOME", path: "/", adminPath: "/" },
      { name: "ARTWORK", path: "/work", adminPath: "/work" },
      { name: "CV", path: "/cv", adminPath: "/admin-cv" },
      { name: "MEDIA", path: "/media", adminPath: "/media" },
      { name: "ABOUT", path: "/about", adminPath: "/about" },
      { name: "CONTACT", path: "/contact", adminPath: "/contact" }
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
          {/* <Flash /> */}
          <Switch>
            <Route
              exact
              path="/work"
              render={ props => (
                <Categories categories={categories} delete={deleteCategory} />
              )}
            />
            <ProtectedRoute exact path="/work/all" component={AllArtwork} />
            <ProtectedRoute exact path="/work/sort" component={SortCategory} />
            {
              user &&
              <Route
                exact
                path="/work/new-category"
                render={ props => <CategoryForm create={createCategory} /> }
              />
            }
            {
              user &&
                <Route
                  exact
                  path="/work/edit-category/:id"
                  render={ props => (
                    <CategoryForm
                      create={createCategory}
                      update={updateCategory}
                      delete={deleteCategory}
                    />
                  )}
                />
            }
            {
              user ?
                <ProtectedRoute exact path="/work/:work_title" component={AdminArtworks} />
              :
                <Route exact path="/work/:work_title" component={Artworks} />
            }
            <ProtectedRoute exact path="/work/:work_title/new" component={ArtworkNew} />
            <ProtectedRoute exact path="/work/edit/:id" component={ArtworkEdit} />
            <Route path="/cv" component={FetchCvs} />
            <ProtectedRoute path="/admin-cv" component={FetchCvs} />
            <Route exact path="/media" component={Media} />
            <ProtectedRoute path="/media/:id/edit" component={MediaForm} />
            <ProtectedRoute path="/media/new" component={MediaForm} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
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
