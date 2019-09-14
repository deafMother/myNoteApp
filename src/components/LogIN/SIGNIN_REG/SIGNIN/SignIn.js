import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginIn } from '../../../../actions/index';

class SignIn extends React.Component {
  renderError = ({ touched, error }) => {
    if (touched && error) {
      return <span className='error-msg'>{`  ${error}!!`}</span>;
    }
  };

  renderInput = ({ input, label, meta, inputType }) => {
    return (
      <div id='redux-form'>
        <label>{`${label} : `}</label>
        <input type={inputType} autoComplete='off' {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.LoginIn(formValues);
  };

  renderForm = () => {
    return (
      <div>
        <h2 className='header t-c c-b'>
          <span>
            <Link to='/'>BACK</Link> |{' '}
          </span>
          LOGIN
        </h2>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name='username'
            label='Username'
            component={this.renderInput}
            inputType='text'
          />
          <Field
            name='password'
            label='password'
            component={this.renderInput}
            inputType='password'
          />
          <button className='button primary m-t2'>LOGIN</button>
        </form>
      </div>
    );
  };

  render() {
    return <div className='container'>{this.renderForm()}</div>;
  }
}

const validate = formValues => {
  const error = {};

  if (!formValues.username) {
    error.username = 'User name required';
  }
  if (!formValues.password) {
    error.password = 'password required';
  }
  return error;
};

const myComp = reduxForm({
  form: 'SigninForm',
  validate
})(SignIn);

export default connect(
  null,
  {
    LoginIn
  }
)(myComp);
