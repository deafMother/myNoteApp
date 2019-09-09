import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './NotesSelection.css';
import { fetchNotes } from '../../actions/index';

class NotesSelection extends React.Component {
  componentDidMount() {
    this.props.fetchNotes();
    // fetch all the lists here
  }

  render() {
    return (
      <React.Fragment>
        <div className='notes-category-container container'>
          <h2>Show By Category</h2>
          <div className='notes-category-items'>
            <Link to='/todo' className='button'>
              ToDo{' '}
              <span className='leght-font'>
                ({this.props.notes.filter(note => note.type === 'todo').length})
              </span>
            </Link>
            <Link to='/list' className='button'>
              List{' '}
              <span className='leght-font'>
                ({this.props.notes.filter(note => note.type === 'list').length})
              </span>
            </Link>
            <Link to='/work' className='button'>
              Work{' '}
              <span className='leght-font'>
                {' '}
                ({this.props.notes.filter(note => note.type === 'work').length})
              </span>
            </Link>
            <Link to='/personal' className='button'>
              Personal{' '}
              <span className='leght-font'>
                (
                {
                  this.props.notes.filter(note => note.type === 'personal')
                    .length
                }
                )
              </span>
            </Link>
            <Link to='/uncategorided' className='button'>
              Un-Categorised{' '}
              <span className='leght-font'>
                {' '}
                (
                {
                  this.props.notes.filter(note => note.type === 'uncategory')
                    .length
                }
                )
              </span>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NotesSelection.propTypes = {
  fetchNotes: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

export default connect(
  mapStateToProps,
  { fetchNotes }
)(NotesSelection);
