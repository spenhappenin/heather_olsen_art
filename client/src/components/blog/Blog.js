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
      {/* <Header primary>Blog</Header> */}
      { authenticated && <Link to="/blog/new"><Button>New Post</Button></Link> }
      <br />
      <br />
      { blogs.map( blog => (
        <div>
          <BlogView key={blog.id} { ...blog } />
          <br />
          <br />
        </div>
      )) }
    </StyledContainer>
  );
};

export default Blog;
