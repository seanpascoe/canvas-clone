import React from 'react';
import $ from 'jquery';

class Course extends React.Component {
  constructor(props) {
    super(props)
    this.updateCourse = this.updateCourse.bind(this);
    this.editTrue = this.editTrue.bind(this);
    this.editFalse = this.editFalse.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.instructorChange = this.instructorChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.state = { name: "", description: "", instructor: "", editMode: true }
  }

  componentWillMount() {
    $.ajax({
      url: `/api/courses/${this.props.params.id}`,
      type: 'GET'
    }).done((course) => {
      this.setState({
        name: course.name,
        description: course.description,
        instructor: course.instructor
      });
    });
  };

  nameChange(e) {
    this.setState({name: e.target.value});
  }

  instructorChange(e) {
    this.setState({instructor: e.target.value});
  }

  descriptionChange(e) {
    this.setState({description: e.target.value});
  }

  updateCourse() {
    console.log("update a course");
  }

  editFalse() {
    let { name, description, instructor } = this.state

    return (
      <div className="row">
        <div className="col m6 offset-m3">
          <h2 className="center-align">{name}</h2>
          <h4 className="center-align thin">Instructor: {instructor}</h4>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  editTrue() {
    let { name, description, instructor } = this.state

    return (
      <div className="row">
        <form className="col m4 offset-m4" ref="form">
          <h5 className="grey-text text-darken-1">Edit Course</h5>
          <input ref="name" value={name} onChange={this.nameChange} />
          <input ref="instructor" value={instructor} onChange={this.instructorChange}/>
          <textarea id="crsdesc" className="materialize-textarea" ref="description" value={description} onChange={this.descriptionChange}></textarea>
          <button className="btn blue lighten-2" type="submit">Save Course</button>
        </form>
      </div>
    )
  }

  render() {

    return this.state.editMode ? this.editTrue() : this.editFalse();

  }
}

export default Course;
