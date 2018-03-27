/* eslint-disable */
import React, { Component } from 'react';
import { updateUser } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Users extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev){
    ev.preventDefault();
    const user = this.props.users.find(user => user.id === ev.target.id*1)
    user.popular = ev.target.name === 'plus' ? ++user.popular : --user.popular;
    this.props.updateUser(user);
  }

  render() {
    const { users } = this.props;
    const { onSubmit } = this;
    return (
      <div>
        <ul>
          {
            users && users.map(user => {
              return (
                <div key={user.id} className="panel panel-default">
                  <div className="panel-heading">
                    <Link to={`/users/${user.id}`}>
                      <h4>{user.name}</h4>
                    </Link>
                  </div>
                  <div className="panel-body">
                    <button onClick={onSubmit} id={user.id} name='minus' className="btn btn-warning"> - </button>
                    &nbsp;&nbsp;&nbsp;
                  <span className="badge" >
                      <h4>{user.popular}</h4>
                    </span>
                    &nbsp;&nbsp;&nbsp;
                  <button onClick={onSubmit} id={user.id} name='plus' className="btn btn-warning"> + </button>
                  </div>
                </div>
              );
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => {
  const sortedUsers = users.sort((previous, current) => { return current.popular - previous.popular });
  return {
    users: sortedUsers
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateUser: (user) => dispatch(updateUser(user, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);


