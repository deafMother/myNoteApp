import React from 'react';
import './LogIn.css';
import history from '../../history';

class LogIn extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='Form  '>
          <button
            className='button primary '
            onClick={() => {
              history.push('/register');
            }}
          >
            {' '}
            REGISTER{' '}
          </button>
          <button
            className='button primary'
            onClick={() => {
              history.push('/signin');
            }}
          >
            {' '}
            LOGIN{' '}
          </button>
        </div>
      </div>
    );
  }
}

export default LogIn;
