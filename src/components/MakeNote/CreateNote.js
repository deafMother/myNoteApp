import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './CreateNote.css';
import { addNote, createNote } from '../../actions';

export class CreateNote extends Component {
  state = {
    id: 0,
    title: '',
    description: '',
    type: 'uncategory',
    createdAt: 0,
    username: this.props.username
  };

  submitFormData = e => {
    e.preventDefault();
    // call action creator here
    this.props.addNote(this.state);
  };

  componentDidMount() {
    this.props.createNote(true);
  }

  renderForm = () => {
    return (
      <React.Fragment>
        <h2 className='header-medium t-c'>Make A New Note</h2>
        <form onSubmit={this.submitFormData} className='create-note-form'>
          <label className='header-small'>Title</label>
          <input
            type='text'
            placeholder='Title'
            value={this.state.title}
            required
            onChange={event => this.setState({ title: event.target.value })}
          ></input>
          <label className='header-small m-t2'>Description</label>
          <textarea
            type='textarewa'
            placeholder='Title'
            value={this.state.description}
            required
            onChange={event =>
              this.setState({ description: event.target.value })
            }
          ></textarea>

          <label className='header-small m-t2'>Type</label>

          <select
            value={this.state.type}
            onChange={event => this.setState({ type: event.target.value })}
            className='select'
          >
            <option value='work'>work</option>
            <option value='list'>list</option>
            <option value='todo'>todo</option>
            <option value='personal'>personal</option>
            <option value='uncategory'>uncategory</option>
          </select>
          <button className='button primary m-t3' type='submit'>
            Make Note!
          </button>
        </form>
      </React.Fragment>
    );
  };

  componentWillUnmount = () => {
    this.props.createNote(false);
  };

  render() {
    return <div className='container'>{this.renderForm()}</div>;
  }
}

CreateNote.propTypes = {
  addNote: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired
};

const mapStateToProps = ({ loggedIn }) => {
  return {
    username: loggedIn.username
  };
};

export default connect(
  mapStateToProps,
  { addNote, createNote }
)(CreateNote);
