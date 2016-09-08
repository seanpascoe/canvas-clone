import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
  componentDidMount() {
    window.$('.button-collapse').sideNav();
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper blue">
            <Link to="/" className="brand-logo">Canvas Clone</Link>
            <a href="#!" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/courses">Courses</Link></li>
            </ul>
            <ul className="side-nav" id="mobile">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/courses">Courses</Link></li>
            </ul>
          </div>
        </nav>
          {this.props.children}
      </div>
    )
  }
}

export default App;
