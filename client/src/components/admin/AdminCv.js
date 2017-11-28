import React from 'react';
import CvEditForm from './CvEditForm';
import DeleteModal from './DeleteModal';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Icon, Input, Modal } from 'semantic-ui-react';

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
            <p>
              {title} 
              <Icon circular name='pencil' size='large' color='yellow' onClick={this.toggleEdit} />
              <Icon circular name='trash outline' size='large' color='red' onClick={this.show()} /> 
              <DeleteModal cv_title={title} cv_id={id} open={open} onClose={this.close} />
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
            <Icon circular name='pencil' size='large' color='yellow' onClick={this.toggleEdit} />
            <Icon circular name='trash outline' size='large' color='red' onClick={this.show()} /> 
            <DeleteModal cv_title={title} cv_id={id} open={open} onClose={this.close} />
          </p> 
        )
      default:
        if(this.state.editing) {
          return <CvEditForm type='three' id={id} title={title} date={formattedDate} location={location} toggleEdit={this.toggleEdit} />
        } else {
          return(
            <p>
              {formattedDate} - {title} - {location}
              <Icon circular name='pencil' size='large' color='yellow' onClick={this.toggleEdit} />
              <Icon circular name='trash outline' size='large' color='red' onClick={this.show()} /> 
              <DeleteModal cv_title={title} cv_id={id} open={open} onClose={this.close} /> 
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

{/* <Icon.Group size='huge'>
  <Icon name='puzzle' />
  <Icon corner name='add' />
</Icon.Group> */}