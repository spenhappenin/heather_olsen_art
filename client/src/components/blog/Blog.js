import React, { useContext, useEffect, useState, } from "react";
import axios from "axios";
import BlogView from "./BlogView";
import { AuthContext, } from "../../providers/AuthProvider";
import { Link, } from "react-router-dom";
import { Button, Header, StyledContainer, } from "../../styles/shared";

const Blog = () => {
  const { authenticated, } = useContext(AuthContext);
  const [ blogs, setBlogs, ] = useState([]);

  useEffect(() => {
    axios.get("/api/blogs")
      .then( res => {
        setBlogs(res.data);
      })
      .catch( err =>{
        console.log(err.response);
      })
  }, []); 

  return (
    <StyledContainer>      
      { authenticated && <Link to="/blog/new"><Button>New Post</Button></Link> }
      <br />
      <br />
      <Header>{blogs.length === 0 && "There are no blog posts at this time. Posts coming soon."}</Header>
      { blogs.map( blog => (
        <div key={blog.id}>
          <BlogView key={blog.id} { ...blog } />
          <br />
          <br />
        </div>
      )) }
    </StyledContainer>
  );
};

export default Blog;
