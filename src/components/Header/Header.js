import React, { Component } from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createNote } from '../../actions/index';
import history from '../../history';

export class Header extends Component {
  render() {
    return (
      <div className='header__ctn-item'>
        <div className='header__ctn'>
          <div className='header'>Notz</div>
          {this.props.loggedIn ? (
            !this.props.create ? (
              <button
                className='button'
                onClick={() => {
                  this.props.createNote(true);
                  history.push('/createNote');
                }}
              >
                Create
              </button>
            ) : (
              <button
                className='button'
                onClick={() => {
                  this.props.createNote(false);
                  history.push('/');
                }}
              >
                Back
              </button>
            )
          ) : null}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  create: PropTypes.bool.isRequired,
  createNote: PropTypes.func.isRequired
};

const mapStateToProps = ({ create }) => {
  return {
    create
  };
};

export default connect(
  mapStateToProps,
  { createNote }
)(Header);
