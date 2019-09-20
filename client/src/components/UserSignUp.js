import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    passwordConfirm: '',
    errors: []
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      passwordConfirm,
      errors,
    } = this.state;

    const validateEmpty = (firstName, lastName, emailAddress, password) =>{

    }
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First Name" />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name" />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password" />
                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    value={passwordConfirm}
                    onChange={this.change}
                    placeholder="Confirm Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;


    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    //using destructring assingment extracted these values from props and state object
    const { context } = this.props;
    const {firstName, lastName, emailAddress, password, passwordConfirm, errors} = this.state;
    let errorArr = [];
    if(errors.length){
      errors.length = 0
    }
    if(firstName === ''){
      errorArr.push('Please check your first name!');
    } else {

    }
    if(lastName === ''){
      errorArr.push('Please check your last name!');
    }
    if(emailAddress === ''){
      errorArr.push('Please check your email address!');
    }
    if(password === ''){
      errorArr.push('Please check your password');
    }

    //conditional to ensure that both passwords match
    if(password !== passwordConfirm){
      errorArr.push('Please make sure your passwords match!');
    }

    if(errorArr.length){
      return this.setState({errors: errorArr})
    }
    //create a user object with name... password as properties
    const user = {firstName, lastName, emailAddress, password};
    context.data.createUser(user)
      .then(errors =>{
        if(Object.values(errors).length){
          this.setState({ errors: Object.values(errors) });
        } else {
          console.log(`201- ${firstName} is succesfully signed up!`);
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push('/');
            });
        }
      }).catch(err =>{
        console.log(err);
      });

  }

  cancel = () => {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    this.props.history.push(from);
  }
}
