import React from 'react'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    return (
      <div>
        <h2 className="center-align">Home</h2>
        <p className="center-align">
          Welcome home, buddy!
        </p>
      </div>
    )
  }
}

export default Home;
