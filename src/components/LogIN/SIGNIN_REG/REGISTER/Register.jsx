import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { addNewUser } from '../../../../actions/index';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import './Register.css';

export class Register extends Component {
  checkError = ({ touched, error }) => {
    if (touched && error) {
      return <span className='error-msg'>{`  ${error}!!`}</span>;
    }
  };

  renderInput = ({ input, label, inputType, meta }) => {
    return (
      <div id='redux-form'>
        <label>{`${label} : `}</label>
        <input type={inputType} autoComplete='off' {...input} />
        {this.checkError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.addNewUser(formValues);
  };

  renderForm = () => {
    return (
      <div>
        <h2 className='header t-c c-b'>
          <span>
            <Link to='/'>BACK</Link> |{' '}
          </span>
          REGISTER
        </h2>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name='username'
            label='UserName'
            component={this.renderInput}
            inputType='text'
          />
          <Field
            name='password1'
            label='Enter Password'
            inputType='password'
            component={this.renderInput}
          />
          <Field
            name='password2'
            label='Re-Enter Password'
            inputType='password'
            component={this.renderInput}
          />
          <button className='button primary m-t2'>REGISTER</button>
        </form>
      </div>
    );
  };
  render() {
    return <div className='container'>{this.renderForm()}</div>;
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.username) {
    // we can test various conditions here like case and numbers etc
    errors.username = 'Enter a vaule';
  }
  if (!formValues.password1) {
    errors.password1 = 'password required';
  }
  if (!formValues.password2) {
    errors.password2 = 'password required';
  }
  if (formValues.password1 != formValues.password2) {
    errors.password2 = 'password must be same';
  }
  return errors;
};

const myComp = reduxForm({
  form: 'RegisterForm',
  validate
})(Register);

export default connect(
  null,
  {
    addNewUser
  }
)(myComp);
