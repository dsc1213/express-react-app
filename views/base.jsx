/* eslint react/prop-types: 0 */

const React = require('react');

class Base extends React.Component {
  render() {
    const {
      title,
      head,
      children,
      js,
      jsHead,
      // assetUrlFn = (url) => url,
    } = this.props;

    return (
      <html>
        <head>
          <title>{title}</title>
          {head}
          {jsHead}
          <script key='bundle' src='/dist/vendor.bundle.js' />
        </head>
        <body>
          {children}
          {js}
        </body>
      </html>
    );
  }
}

module.exports = Base;
