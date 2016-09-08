import React from 'react';
import { Link } from 'react-router';

class Courses extends React.Component {
  constructor(props) {
    super(props)
    this.addCourse = this.addCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.state = { courses: [] }
  }

  componentWillMount() {
    $.ajax({
      url: '/api/courses',
      type: 'GET'
    }).done( (courses ) => {
      this.setState({ courses  });
    });
  }

  addCourse(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/courses',
      type: 'POST',
      data: {
        name: this.refs.name.value,
        description: this.refs.description.value,
        instructor: this.refs.instructor.value
      }
    }).done( (course) => {
      this.setState({ courses: [ ...this.state.courses, { ...course } ]});
      this.refs.form.reset();
      $('#crsdesc').trigger('autoresize');
    });
  }

  deleteCourse(id) {
    console.log(`Delete this course: ${id}`)
    $.ajax({
      url: `/api/courses/${id}`,
      type: 'DELETE'
    }).done(course => {
      let courses = this.state.courses.filter(course => course._id !== id)
      console.log(courses);
      this.setState({ courses })
    })
  }

  render() {
    let courses = this.state.courses.map( (course) => {
      return (
        <li key={course._id} className="collection-item">
          <Link to={`/courses/${course._id}`}>
            <span style={{fontWeight: "bold"}}>{course.name}</span> :: <span style={{fontStyle: "italic"}}>{course.instructor}</span>
          </Link>
          <i className="material-icons right delete-course" onClick={() => this.deleteCourse(course._id)}>delete_forever</i>
        </li>);
    });

    return (
      <div className="row">
        <form className="col m4" ref="form" onSubmit={this.addCourse}>
          <h5 className="grey-text text-darken-1">Add a Course</h5>
          <input ref="name" placeholder="Course Name..." />
          <input ref="instructor" placeholder="Instructor..." />
          <textarea id="crsdesc" className="materialize-textarea" ref="description" placeholder="Course Description..."></textarea>
          <button className="btn blue lighten-2" type="submit">Add Course</button>
        </form>
        <ul className="col m8 collection">
         {courses}
        </ul>
      </div>
    );
  }
}

export default Courses;
