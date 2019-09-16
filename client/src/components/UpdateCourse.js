import React, { Component } from 'react';
import Form from './Form.js';


export default class UpdateCourse extends Component{
  state = {
    details: [],
    title: '',
    description: '',
    estimatedTime: '',
    name: '',
    materialsNeeded: '',
    errors: []
  }


async componentDidMount(){
  const {context} = this.props;
  const {match} = this.props;
  await context.data.getCourseDetails(match.params.id)
    .then(details=>{
      const name = details.Creator.firstName + ' ' + details.Creator.lastName;
      const title = details.title;
      const description = details.description;
      let items;
      let time;
      if(details.materialsNeeded != null){
        items = details.materialsNeeded.split('*');
        items.shift();
      } else{
        items = ''
      }
      if(details.estimatedTime != null){
        time = details.estimatedTime
      } else{
        items = ''
      }
      this.setState({
        details,
        title,
        description,
        name,
        time,
        items
      })
    })
}

  render(){
    const {title,
           description,
           estimatedTime,
           name,
           materialsNeeded,
           errors} = this.state;
    return(
      <div class="bounds course--detail">
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
            <div class="course--header">
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
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      value={estimatedTime}
                      onChange={this.change}
                      placeholder="Course Description"
                      />
                    </div>
                  </li>
                  <li class="course--stats--list--item">
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
    const {context, history} = this.props;
    const {title, description, estimatedTime, materialsNeeded} = this.state;
    const {id} = this.state.details;
    const {from} = this.props.location.state || {from: {pathname: '/courses/'+id}};
    const {emailAddress} = context.authenticatedUser;
    const password = context.userPassword;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    }
    context.actions.updateCourse(course, id, {emailAddress, password})
      .then(errors =>{
        const errorArr = Object.values(errors);
        if(errorArr.length){
          this.setState(()=>{
            return { errors: errorArr };
          })
        } else {
          console.log(`Success!- ${title} is succesfully Updated!`);
          this.props.history.push('/courses/'+id);
        }
      }).catch(err =>{
        console.log(err);
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}
