import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, deleteUser } from './store';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user ? this.props.user.name : '',
      popular: this.props.user ? this.props.user.popular : ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.props.deleteUser({id: this.props.id });
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const user = { id: this.props.id, popular: this.state.popular, name: this.state.name };
    if (user.popular && user.name) {
      this.props.updateUser(user);
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      name: nextProps.user ? nextProps.user.name : '',
      popular: nextProps.user ? nextProps.user.popular : ''
  });
  }

  render() {
    const { user } = this.props;
    const { name, popular } = this.state;
    const { onChange, onSubmit, onDelete } = this;

    if (!user) {
      return null;
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>{user.name}</h4>
        </div>
        <div className="panel-body">
          <h4>Name:</h4>
          <form onSubmit={onSubmit}>
            <div>
              <input
                type='text'
                className='form-control'
                onChange={onChange}
                value = {name}
                name='name'
                placeholder='please write a name'
              />
            </div>
            <div>
              <h4>Popular:</h4>
              <input
                type='text'
                className='form-control'
                onChange={onChange}
                name='popular'
                value={popular}
                placeholder='please write a popular'
              />
              <br />
              <span className='input-group-btn'>
                <button className='btn btn-warning btn-block' type='submit'>Update</button>
                <button className='btn btn-warning btn-block' onClick={onDelete}>Delete</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }, { id }) => {
  const user = users.find(user => user.id === id);
  return {
    user
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateUser: (user) => dispatch(updateUser(user, history)),
    deleteUser: (user) => dispatch(deleteUser(user, history))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
