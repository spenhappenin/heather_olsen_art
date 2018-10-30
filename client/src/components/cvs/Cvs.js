import React from 'react';
import Copyright from '../shared/Copyright';
import Cv from './Cv';
import { CvHeader, } from '../../styles/cv';
import { Header, StyledContainer, SocialLink, } from '../../styles/shared';

class Cvs extends React.Component {

  displayCvs = (type) => {
    const { cvs, } = this.props;
    return cvs.map( cv => (
      cv.cv_type === type &&
        <Cv key={cv.id} cv={cv} />
    ));
  };

  render() {
    return(
      <StyledContainer>
        <Header primary>Curriculum Vitae</Header>
        <CvHeader>Juried Exhibitions</CvHeader>
        <div>
          { this.displayCvs('exhibition') }
        </div>
        <CvHeader>Awards and Certificates</CvHeader>
        <div>
          { this.displayCvs('award') }
        </div>
        <CvHeader>Festivals and Events</CvHeader>
        <div>
          { this.displayCvs('festival') }
        </div>
        <CvHeader>Current Representation</CvHeader>
        <div>
          { this.displayCvs('current_rep') }
        </div>
        <CvHeader>Education</CvHeader>
         <div> 
          { this.displayCvs('education') }
        </div>
        <CvHeader>Website and Social Media</CvHeader>
        <div>
          <SocialLink to='/' rel="noopener noreferrer">
            www.heatherolsenart.com
          </SocialLink>
          <br />
          <SocialLink to='https://www.instagram.com/heatherolsenart/' target="_blank" rel="noopener noreferrer">
            Instagram - @heatherolsenart
          </SocialLink>
          <br />
          <SocialLink to='https://www.facebook.com/heatherolsenart/' target="_blank" rel="noopener noreferrer">
            Facebook - www.facebook.com/heatherolsenart
          </SocialLink>
        </div>
        <Copyright />
      </StyledContainer>
    );
  };
};

export default Cvs;
