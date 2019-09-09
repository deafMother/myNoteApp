import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './EditNote.css';
import { editNote, fetchNote, deleteNote } from '../../actions';

export class EditNote extends Component {
  state = {
    id: 0,
    title: '',
    description: '',
    type: 'uncategory',
    createdAt: 0
  };

  removeNote = () => {
    this.props.deleteNote(this.props.match.params.id);
  };

  submitFormData = e => {
    e.preventDefault();
    // call action creator here
    this.props.editNote(this.props.match.params.id, this.state);
  };

  //since fectchNote is an async task so it will some time, so update the state only after fetchnote returns the required data
  async componentDidMount() {
    // fetch individual data here
    await this.props.fetchNote(this.props.match.params.id);
    this.setState({ ...this.props.note });
  }

  renderForm = () => {
    return (
      <React.Fragment>
        <h2 className='header-medium t-c'>
          <Link to='/'>Back</Link> | Edit
        </h2>
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
            Edit Note!
          </button>
        </form>
        <button className='button warning m-t2' onClick={this.removeNote}>
          DELETE !!
        </button>
      </React.Fragment>
    );
  };

  render() {
    return <div className='container'>{this.renderForm()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    note: state.note,
    loading: state.loading
  };
};

EditNote.propTypes = {
  editNote: PropTypes.func.isRequired,
  fetchNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { editNote, fetchNote, deleteNote }
)(EditNote);
