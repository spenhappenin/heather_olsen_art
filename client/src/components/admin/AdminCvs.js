import React, { useContext, useEffect, useState, } from "react";
import AdminCv from "./AdminCv";
import axios from "axios";
import Copyright from "../shared/Copyright";
import { FlashContext, } from "../../providers/FlashProvider";
import { CvHeader, } from "../../styles/cv";
import { Header, } from "../../styles/shared";
import { Link, } from "react-router-dom";
import { Segment, } from "semantic-ui-react";
import { Button, StyledContainer, } from "../../styles/shared";

const AdminCvs = (props) => {
  const [cvs, setCvs] = useState([]);
  const { setFlash, } = useContext(FlashContext);

  useEffect(() => {
    axios.get('/api/cvs')
      .then( res => setCvs(res.data))
      .catch( err => {
        setFlash(err.response, "red");
      })
  }, []);

  const updateCv = (cv) => {
    const updatedCvs = cvs.map(c => {
      if (c.id === cv.id)
        return c = cv
      return c;
    });
    setCvs(updatedCvs);
  };

  const deleteCv = (id) => {
    const updatedCvs = cvs.filter( c => c.id !== id )
    setCvs(updatedCvs);
  };

  const displayCvType = (type) => {
    return cvs.map(cv => {
      if (cv.cv_type === type) {
        return <AdminCv key={cv.id} cv={cv} delete={deleteCv} update={updateCv} />
      } else {
        return null;
      };
    });
  };

  return (
    <Segment as={StyledContainer} basic>
      <Header primary>Curriculum Vitae</Header>
      <Link to="/admin-cv/new" rel="noopener noreferrer">
        <Button>New</Button>
      </Link>
      <CvHeader>Juried Exhibitions</CvHeader>
      { displayCvType("exhibition") }
      <CvHeader>Awards and Certificates</CvHeader>
      { displayCvType("award") }
      <CvHeader>Festivals and Events</CvHeader>
      { displayCvType("festival") }
      <CvHeader>Current Representation</CvHeader>
      { displayCvType("current_rep") }
      <CvHeader>Education</CvHeader>
      { displayCvType("education") }
      <CvHeader>Website and Social Media</CvHeader>
      <Segment basic>
        <p>www.heatherolsenart.com</p>
        <p>
          <a href="https://www.instagram.com/heatherolsenart/" target="_blank" rel="noopener noreferrer">
            IG: @heatherolsenart
            </a>
        </p>
        <p>
          <a href="https://www.facebook.com/heatherolsenart/" target="_blank" rel="noopener noreferrer">
            www.facebook.com/heatherolsenart
            </a>
        </p>
      </Segment>
      <Copyright />
    </Segment>
  );
}

export default AdminCvs;
