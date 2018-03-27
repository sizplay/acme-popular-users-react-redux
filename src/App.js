/* eslint-disable */
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Users from './Users';
import { connect } from 'react-redux';
import { loadUsers } from './store';
import User from './User';
import UserCreate from './UserCreate';

class App extends Component {

  componentDidMount() {
    this.props.loadUsers();
  }//why do we do this and here

  render() {
    return (
      <div className='container'>
        <span>
        </span>
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route exact path='/' render={({ history }) => <Users history={history} />} />
              <Route exact path='/users' render={({ history }) => <Users history={history} />} />
              <Route exact path='/users/create' render={({ history }) => <UserCreate history={history} />} />
              <Route exact path='/users/:id' render = {({ match, history })=> <User id = {match.params.id*1} history = { history }/>} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(loadUsers())
  };
};

export default connect(null, mapDispatchToProps)(App);
