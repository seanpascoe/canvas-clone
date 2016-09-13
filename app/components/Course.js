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
    this.editHover = this.editHover.bind(this);
    this.editLeave = this.editLeave.bind(this);
    this.editMode = this.editMode.bind(this);
    this.state = { name: "", description: "", instructor: "", editMode: false }
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
  }

  nameChange(e) {
    this.setState({name: e.target.value});
  }

  instructorChange(e) {
    this.setState({instructor: e.target.value});
  }

  descriptionChange(e) {
    this.setState({description: e.target.value});
  }

  updateCourse(e) {
    e.preventDefault();
    $.ajax({
      url: `/api/courses/${this.props.params.id}`,
      type: 'PUT',
      data: {
        name: this.refs.name.value,
        instructor: this.refs.instructor.value,
        description: this.refs.description.value
      }
    }).done(course => {
      this.setState({ ...course });
      this.editMode();
    })
  }

  editHover() {
    let editIcon = this.refs.editIcon;
    editIcon.style.visibility = "visible";
  }

  editLeave() {
    let editIcon = this.refs.editIcon;
    editIcon.style.visibility = "hidden";
  }

  editMode() {
    this.setState({editMode: !this.state.editMode});
  }

  editFalse() {
    let { name, description, instructor } = this.state

    return (
      <div className="row">
        <div
          id="course-wrap"
          className="col m6 offset-m3"
          onMouseOver={this.editHover}
          onMouseLeave={this.editLeave}>
          <i
            id="edit-icon"
            ref="editIcon"
            className="material-icons grey-text"
            onClick={this.editMode}>mode_edit</i>
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
        <form className="col m4 offset-m4" ref="form" onSubmit={this.updateCourse}>
          <h5 className="grey-text text-darken-1">Edit Course</h5>
          <input ref="name" value={name} onChange={this.nameChange} />
          <input ref="instructor" value={instructor} onChange={this.instructorChange}/>
          <textarea id="crsdesc" className="materialize-textarea" ref="description" value={description} onChange={this.descriptionChange} />
          <button className="btn blue lighten-1" type="submit">Save Course</button>
          {' '}
          <span className="btn blue lighten-3" onClick={this.editMode}>Cancel</span>
        </form>
      </div>
    )

  }

  render() {

    return this.state.editMode ? this.editTrue() : this.editFalse();

  }
}

export default Course;
