import React from 'react';
import history from '../../history';
import { connect } from 'react-redux';
import { createNote } from '../../actions';
import PropTypes from 'prop-types';

function CreateButton(props) {
  return (
    <div
      className='button warning'
      onClick={() => {
        props.createNote(true);
        history.push('/createNote');
      }}
    >
      Create !
    </div>
  );
}

CreateButton.protoTypes = {
  createNote: PropTypes.func.isRequired
};

export default connect(
  null,
  { createNote }
)(CreateButton);
