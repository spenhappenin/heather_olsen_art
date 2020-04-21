import React, { useContext, useEffect, useState, } from "react";
import axios from "axios";
import Copyright from "../shared/Copyright";
import Cv from "./Cv";
import { FlashContext, } from "../../providers/FlashProvider";
import { CvHeader, } from "../../styles/cv";
import { Header, StyledContainer, SocialLink, } from "../../styles/shared";

const Cvs = (props) => {
  const [cvs, setCvs] = useState([]);
  const { setFlash, } = useContext(FlashContext);

  useEffect(() => {
    axios.get('/api/cvs')
      .then( res => setCvs(res.data) )
      .catch( err => {
        setFlash(err.response, "red");
      })
  }, []);

  const displayCvs = (type) => {
    return cvs.map( cv => (
      cv.cv_type === type &&
        <Cv key={cv.id} cv={cv} />
    ));
  };

  return (
    <StyledContainer>
      <Header primary>Curriculum Vitae</Header>
      <CvHeader>Juried Exhibitions</CvHeader>
      <div>
        { displayCvs("exhibition") }
      </div>
      <CvHeader>Awards and Publications</CvHeader>
      <div>
        { displayCvs("award") }
      </div>
      <CvHeader>Festivals and Events</CvHeader>
      <div>
        { displayCvs("festival") }
      </div>
      <CvHeader>Current Representation</CvHeader>
      <div>
        { displayCvs("current_rep") }
      </div>
      <CvHeader>Education</CvHeader>
      <div>
        { displayCvs("education") }
      </div>
      <CvHeader>Website and Social Media</CvHeader>
      <div>
        <SocialLink to="/" rel="noopener noreferrer">
          www.heatherolsenart.com
          </SocialLink>
        <br />
        <SocialLink to="https://www.instagram.com/heatherolsenart/" target="_blank" rel="noopener noreferrer">
          Instagram - @heatherolsenart
          </SocialLink>
        <br />
        <SocialLink to="https://www.facebook.com/heatherolsenart/" target="_blank" rel="noopener noreferrer">
          Facebook - www.facebook.com/heatherolsenart
          </SocialLink>
      </div>
      <Copyright />
    </StyledContainer>
  );
};

export default Cvs;
