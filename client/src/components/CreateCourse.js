import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component{
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }

  render(){
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
        } = this.state;
    const { context } = this.props;

    return(
      <div class="bounds course--detail">
        <h1>Create Course</h1>
        <Form
        cancel={this.cancel}
        errors={errors}
        submit={this.submit}
        submitButtonText="Create Course"
        elements={() => (
          <React.Fragment>
            <div className="grid-66">
              <div class="course--header">
              <h4 class="course--label">Course</h4>
                <div>
                  <input
                    id="title"
                    name="title"
                    className="input-title course--title--input"
                    type="text"
                    value={title}
                    onChange={this.change}
                    placeholder="Title" />
                </div>
                <p>by{' '+context.authenticatedUser.firstName + ' ' + context.authenticatedUser.lastName}</p>
              </div>
              <div class="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={this.change}
                    placeholder="Course Description"
                  />
                </div>
              </div>
            </div>
            <div class="grid-25 grid-right">
              <div class="course--stats">
                <ul class="course--stats--list">
                  <li class="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id= "estimatedTime"
                        name = "estimatedTime"
                        type="text"
                        value={estimatedTime}
                        onChange={this.change}
                        placeholder="Estimated Time"
                      />
                    </div>
                  </li>
                  <li class="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      type="text"
                      value={materialsNeeded}
                      onChange={this.change}
                      placeholder="Materials Needed"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>

        )}
        />
      </div>
    )
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
    const {context} = this.props;
    const {title, description, estimatedTime, materialsNeeded} = this.state;
    const {emailAddress} = context.authenticatedUser;
    const password = context.userPassword;
    const {from} = this.props.location.state || {from: {pathname: '/'}};
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    }
    context.actions.createCourse(course, {emailAddress, password})
      .then(errors =>{
        const errorArr = Object.values(errors);
        if(errorArr.length){
          this.setState(()=>{
            return { errors: [errorArr] };
          })
        } else {
          console.log(`Success!- ${title} is succesfully Created!`);
          this.props.history.push('/');
        }
      }).catch(err =>{
        console.log(err);
        this.setState(()=>{
          return {errors: [Object.values(err)]}
        })
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
};
