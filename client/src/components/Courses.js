import React, { Component } from 'react';

export default class Courses extends Component {
  state = {
    courses: []
  };
  async componentDidMount(){
    const { context } = this.props;
    await context.data.getCourses()
      .then(courses =>{
         this.setState({
           courses
         })
        })

  };

  render(){
    const {courses} = this.state;
    return(
      <div className="bounds">
      {courses.map((course, index)=>
        <div key={"a" + index} className="grid-33">
          <a key={"b" + index} className="course--module course--link" href={"/courses/"+(course.id)}>
          <h4 key={"c" + index} className="course--label">Course</h4>
          <h3 key={"d" + index} className="course--title">{course.title}</h3>
          </a>
        </div>
      )}
      <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
        </a></div>
      </div>
    );
  };
};
