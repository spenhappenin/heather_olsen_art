import React from 'react';
import CvEditForm from './CvEditForm';
import DeleteCvModal from './DeleteCvModal';
import moment from 'moment';
import { connect } from 'react-redux';
import { CvContainer } from '../../styles/cv';
import { Icon, Segment } from 'semantic-ui-react';

class AdminCv extends React.Component {
  state = { editing: false, open: false };

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }

  show = () => () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  displayCv = () => {
    const { cv_date, cv_type, location, title, id } = this.props.cv;
    const { open } = this.state;
    const formattedDate = moment(cv_date).format('YYYY MMM');
    const justYear = moment(cv_date).format('YYYY');
    switch (cv_type) {
      case 'current_rep':
        if(this.state.editing) {
          return <CvEditForm type='one' id={id} title={title} toggleEdit={this.toggleEdit}/>
        } else {
          return(
            <Segment as={CvContainer} basic>
              <div style={styles.cvContent}>{title}</div>
                <div style={styles.buttonContainer}>
                <Icon circular name='pencil' color='black' inverted onClick={this.toggleEdit} />
                <Icon circular name='trash outline' color='black' inverted onClick={this.show()} />
                  <DeleteCvModal cv_title={title} cv_id={id} open={open} onClose={this.close} />
                </div>
            </Segment>
          ) 
        }
      case 'education':
        if(this.state.editing) {
          return <CvEditForm type='two' id={id} title={title} date={justYear} toggleEdit={this.toggleEdit} />
        }
        return(
          <Segment as={CvContainer} basic>
            <div style={styles.cvContent}>{title}, {justYear}</div>
            <div style={styles.buttonContainer}>
              <Icon circular name='pencil' color='black' inverted onClick={this.toggleEdit} />
              <Icon circular name='trash outline' color='black' inverted onClick={this.show()} />
              <DeleteCvModal cv_title={title} cv_id={id} open={open} onClose={this.close} /> 
            </div>
          </Segment>
        )
      default:
        if(this.state.editing) {
          return <CvEditForm type='three' id={id} title={title} date={formattedDate} location={location} toggleEdit={this.toggleEdit} />
        } else {
          return(
            <Segment as={CvContainer} basic>
              <div style={styles.cvContent}>{formattedDate} - {title} - {location}</div>
              <div style={styles.buttonContainer}>
                <Icon circular name='pencil' color='black' inverted onClick={this.toggleEdit} />
                <Icon circular name='trash outline' color='black' inverted onClick={this.show()} />
                <DeleteCvModal cv_title={title} cv_id={id} open={open} onClose={this.close} />
              </div>
            </Segment>
          )
        }
    }
  }

  render() {
    return (
      <div>
        { this.displayCv() }
      </div>
    )
  }
}

const styles = {
  cvContent: {
    marginBottom: '0px'
  },
  buttonContainer: {
    marginLeft: '10px',
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps)(AdminCv);