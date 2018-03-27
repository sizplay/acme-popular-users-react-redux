import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from './store';

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user ? this.props.user.name : '',
      popular: this.props.user ? this.props.user.popular : ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
     this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const user = { popular: this.state.popular, name: this.state.name };
    if(user.popular && user.name) {
      this.props.createUser(user);
    }
  }

  render() {
    const { name, popular } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>Create a User</h4>
        </div>
        <div className="panel-body">
        <h4>Name:</h4>
          <form onSubmit={onSubmit}>
            <div>
              <input
                type='text'
                className='form-control'
                onChange={onChange}
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
                placeholder='please write a popular'
              />
              <br />
              <span className='input-group-btn'>
                <button disabled={ !name || !popular } className='btn btn-warning btn-block' type='submit'>Create</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createUser: (user) => dispatch(createUser(user, history)),
  };
};

export default connect(null, mapDispatchToProps)(UserCreate);
