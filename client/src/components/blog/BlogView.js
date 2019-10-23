import React, { useContext, useEffect, useState, } from "react";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import { AuthContext, } from "../../providers/AuthProvider";
import { FlashContext, } from "../../providers/FlashProvider";
import { Link, } from "react-router-dom";
import { Button, Header, } from "../../styles/shared";

const BlogView = ({ history, title, image, body, id, updated_at, }) => {
  const { authenticated, } = useContext(AuthContext);
  const { setFlash, } = useContext(FlashContext);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete?"))
      
      axios.delete(`/api/admin/blogs/blogs/${id}`)
        .then( () => {
          setFlash("Blog Post Deleted!", "green");
          history.push("/blog")
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
  };

  return (
    <div>
      <Header style={{ float: "right", }}>{ moment(updated_at).format("MMMM Do YYYY") }</Header>
      <br />
      <br />
      { authenticated && 
        <div>
          <Link to={`/blog/${id}/edit`}>
            <Button>Edit Post</Button>
          </Link> 
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      }
      <br />
      <img style={{ height: "300px", padding: "0 20px 0 0", }} align="left" src={image} />
      <p dangerouslySetInnerHTML={createMarkup(body)} />
    </div>
  );
};

const createMarkup = (html) => {
  return { __html: html };
};

export default BlogView;
