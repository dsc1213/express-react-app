import React from 'react';

class Sidenav extends React.Component {
  render() {
    return (
      <div className="sidenav container-body-left">
        <div className="container">
          <div className="version-text">
            <span>7BOSS</span>
            <span>v1.0.3-beta</span>
            <span>local</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidenav;
