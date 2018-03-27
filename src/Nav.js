import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ users, highest }) => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <ul className="nav navbar-nav">
          <li><Link to='/users'><h3>Users <span className="badge">{users.length}</span></h3></Link></li>
          <li><Link to='/users/create'><h3>Create a User</h3></Link></li>
          <li><Link to={`/users/${highest.id}`}><h3>{highest.name}</h3></Link></li>
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = ({ users }) => {
  const highest = users.reduce( (current, next) => {
    return (current.popular > next.popular ? current : next);
  }, {})
  return {
    users,
    highest
  };
};

export default connect(mapStateToProps)(Nav);
