import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import { connect } from 'react-redux';

import NotesSelection from './NotesSelection/NotesSelection';
import CreateNote from './MakeNote/CreateNote';
import history from '../history';
import Todo from './Lists/Todo';
import List from './Lists/List';
import Work from './Lists/Work';
import Personal from './Lists/Personal';
import Uncat from './Lists/UnCat';
import EditNote from './EditNote/EditNote';
import NetWorkError from './Error/NetWorkError';
import PopUp from '../components/PopUp/PopUp';
import LogIn from './LogIN/LogIn';
import Register from './LogIN/SIGNIN_REG/REGISTER/Register';
import SignIn from './LogIN/SIGNIN_REG/SIGNIN/SignIn';

import './App.css';

// the history prop is only available inside the Route componnents

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Header network={this.props.network} loggedIn={this.props.loggedIn} />
        <div className='pop-up-ctn container'>
          <PopUp />
        </div>
        {this.props.network && this.props.loggedIn ? (
          <Switch>
            <Route path='/' exact component={NotesSelection} />
            <Route path='/createNote' exact component={CreateNote} />

            <Route path={`/todo`} exact component={Todo} />
            <Route path={`/list`} exact component={List} />
            <Route path={`/work`} exact component={Work} />
            <Route path={`/personal`} exact component={Personal} />
            <Route path={`/uncategorided`} exact component={Uncat} />
            <Route path={`/edit/:id`} exact component={EditNote} />
          </Switch>
        ) : !this.props.network ? (
          <NetWorkError />
        ) : (
          <Switch>
            <Route path={`/`} exact component={LogIn} />
            <Route path={`/register`} exact component={Register} />
            <Route path={`/signin`} exact component={SignIn} />
          </Switch>
        )}
      </Router>
    );
  }
}

const mapStateToProps = ({ net, loggedIn }) => {
  console.log(loggedIn);
  return {
    network: net,
    loggedIn: loggedIn.status
  };
};

export default connect(mapStateToProps)(App);
