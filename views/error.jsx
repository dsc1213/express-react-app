/* eslint-disable */
const React = require( 'react' );
const Base = require( './base' );

class Error extends React.Component {
  render() {

    const { message, error } = this.props;
    return <Base>
            <h1>{ message }</h1>
            <h2>{ error.status }</h2>
            <pre>{ error.stack }</pre>
          </Base>;
  }
}

module.exports = Error;