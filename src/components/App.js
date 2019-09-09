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
import './App.css';

// the history prop is only available inside the Route componnents

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Header />
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
      </Router>
    );
  }
}

const mapStateToProps = ({ create }) => {
  return {
    create
  };
};

export default connect(mapStateToProps)(App);
