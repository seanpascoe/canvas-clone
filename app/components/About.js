import React from 'react';

class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    return (
      <div>
        <h2 className="center-align">About Us</h2>
        <p className="center-align">
          We are a bunch of copycats who wanted to make a site that looks like canvas. Hooray!
        </p>
      </div>
    )
  }
}

export default About;
