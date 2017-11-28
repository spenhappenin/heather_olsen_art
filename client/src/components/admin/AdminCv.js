import React from 'react';
import CvEditForm from './CvEditForm';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Icon, Input } from 'semantic-ui-react';

class AdminCv extends React.Component {
  state = { editing: false };

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }

  displayCv = () => {
    const { cv_date, cv_type, location, title, id } = this.props.cv;
    const formattedDate = moment(cv_date).format('YYYY MMM');
    const justYear = moment(cv_date).format('YYYY');
    switch (cv_type) {
      case 'current_rep':
        if(this.state.editing) {
          return <CvEditForm type='one' id={id} title={title} toggleEdit={this.toggleEdit}/>
        } else {
          return(
            <p>
              {title} 
              <Button basic icon color='yellow' onClick={this.toggleEdit}><Icon name='pencil' size='large' /></Button> 
              <Button basic icon color='red' onClick={null}><Icon name='trash outline' size='large' /></Button> 
            </p>
          ) 
        }
      case 'education':
        if(this.state.editing) {
          return <CvEditForm type='two' id={id} title={title} date={justYear} toggleEdit={this.toggleEdit} />
        }
        return(
          <p>
            {title}, {justYear}
            <Button basic icon color='yellow' onClick={this.toggleEdit}><Icon name='pencil' size='large' /></Button>
            <Button basic icon color='red' onClick={null}><Icon name='trash outline' size='large' /></Button> 
          </p> 
        )
      default:
        if(this.state.editing) {
          return <CvEditForm type='three' id={id} title={title} date={formattedDate} location={location} toggleEdit={this.toggleEdit} />
        } else {
          return(
            <p>
              {formattedDate} - {title} - {location}
              <Button basic icon color='yellow' onClick={this.toggleEdit}><Icon name='pencil' size='large' /></Button>
              <Button basic icon color='red' onClick={null}><Icon name='trash outline' size='large' /></Button> 
            </p>
          )
        }
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        { this.displayCv() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps)(AdminCv);