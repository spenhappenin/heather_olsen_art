import React, { useContext, } from "react";
import { AuthContext, } from "../../providers/AuthProvider";
import { Link, } from "react-router-dom";
import { Button, Header, StyledContainer, } from "../../styles/shared";

const Blog = () => {
  const { authenticated, } = useContext(AuthContext);

  return (
    <StyledContainer>
      <Header primary>Blog</Header>
      { authenticated && <Link to="/blog/new"><Button>New Post</Button></Link> }
      
    </StyledContainer>
  );
};

export default Blog;
