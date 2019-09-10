import React from 'react';
import { connect } from 'react-redux';
import './PopUp.css';

const PopUp = props => {
  return (
    <div
      className={`button popup
        ${props.popup.show ? 'show-pop-up' : 'hide-pop-up'}
        ${props.popup.error ? 'warning' : 'primary'} `}
    >
      {props.popup.message}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    popup: state.popup
  };
};

export default connect(mapStateToProps)(PopUp);
