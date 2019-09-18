import config from './config';

export default class Data {
  /*api method that interacts with the REST api
  * Parameters are the path as a string
  * the HTTP method to be sent to the REST api
  * the body of the request for POST or PUT methods
  * A boolean value decalring if authorization is required
  * the credentials of user's email and password if authorization is required
  * Returns a fetch method
  */
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
    //creating the options for the header of the request
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    //if their is a body present with the request then it is convereted to JSON
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    //check if authorization is needed
    if(requiresAuth){
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }
  // Asyncronous method sending a GET request through the api method that returns the currently logged in user
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
    //if the status is 200 'ok' then return the response data converted from json
    if (response.status === 200) {
      console.log(response + 1)
      return response.json().then(data => data);
    }
    //else return null
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  // POST method that creates a new user within the API's database that returns nothing
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    //if a bad request send the error message from the api to the module
    else if (response.status === 400) {
      return await response.json();
    }
    else {
      throw new Error();
    }
  }

// GET request that returns all of the courses stored in the database
async getCourses(){
  const response = await this.api('/courses', 'GET', null);
  if (response.status === 200) {
    return response.json().then(data => data);
  }
  else if (response.status === 401 || response.status === 400) {
    return response.json();
  }
  else {
    throw new Error();
  }
}

//GET request that returns all the details of a specific course stored in the database
async getCourseDetails(id){
  const response = await this.api('/courses/'+id, 'GET', null);
  if(response.status === 200){
    return response.json()
  }
  else if (response.status === 401) {
    return null;
  }
  else if(response.status === 404){
    return 404;
  }
  else {
    throw new Error();
  }
}
//POST request that adds a new course to the database along with the credentials needed for access
async createCourse(course, {emailAddress, password}){
  const response = await this.api('/courses/', 'POST', course, true, {emailAddress, password});
  if(response.status === 201){
    console.log("Course was Created!")
    return [];
  }
  else if (response.status === 401 || response.status === 400) {
    return response.json();
  }
  else {
    throw new Error();
  }

}

//PUT request to update the details of a specific course in the database
async updateCourseDetail(course, id, {emailAddress, password}){
  const response = await this.api('/courses/'+id, 'PUT', course, true, {emailAddress, password});
  if(response.status === 204){
    return [];
  }
  else if (response.status === 401 || response.status === 400) {
    return await response.json();
  }
  else {
    throw new Error();
  }

}

// Delete request to delete a specific course from the database
async deleteCourse(courseId, {emailAddress, password}){
  const response = await this.api('/courses/'+courseId, 'DELETE', null, true, {emailAddress, password});
  if(response.status === 204){
    console.log("Course was Deleted!");
    return [];
  }
  else if (response.status === 401) {
    return await response.json();
  }
  else {
    throw new Error();
  }

}

}
