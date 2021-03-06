import React, { Component } from 'react';
import Form from './Form.js';


export default class UpdateCourse extends Component{
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    name: '',
    materialsNeeded: '',
    id: '',
    errors: []
  }


async componentDidMount(){
  const {context} = this.props;
  const {match} = this.props;
  await context.data.getCourseDetails(match.params.id)
    .then(details=>{
      const name = details.Creator.firstName + ' ' + details.Creator.lastName;

      const {
              title,
              description,
              estimatedTime,
              materialsNeeded,
              id
            } = details;

      this.setState({
        title,
        description,
        estimatedTime,
        materialsNeeded,
        name,
        id
      })
    })
}

  render(){
    const {
           title,
           description,
           estimatedTime,
           materialsNeeded,
           name,
           errors
          } = this.state;
    return(
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
            <div className="grid-66">
            <div className="course--header">
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
              <p>by {name}</p>
            </div>
            <div className="course--description">
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

            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      value={estimatedTime}
                      onChange={this.change}
                      placeholder="Course Description"
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        type="text"
                        value={materialsNeeded}
                        onChange={this.change}
                        placeholder="Materials Needed"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            </React.Fragment>
          )}
          />
        </div>
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
    const {title, description, estimatedTime, materialsNeeded, id, errors} = this.state;
    const {emailAddress} = context.authenticatedUser;
    const password = context.userPassword;
    let errorArr = [];
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    }
    if(errors.length){
      errors.length = 0;
    }
    if(title === ''){
      errorArr.push('Please Provide a title!');
    }
    if(description === ''){
      errorArr.push('Please Provide a description!');
    }
    if(errorArr.length){
      return this.setState({errors: errorArr})
    }
    context.actions.updateCourse(course, id, {emailAddress, password})
      .then(errors =>{
        if(Object.values(errors).length){
          this.setState({ errors: Object.values(errors) });
        } else {
          console.log(`Success!- ${title} is succesfully Updated!`);
          this.props.history.push('/courses/'+id);
        }
      }).catch(err =>{
        console.log(err);
      });
  }

  cancel = () => {
    const { id } = this.state;
    const { from } = this.props.location.state || { from: { pathname: `/courses/${id}` } };
    this.props.history.push(from);
  }
}
