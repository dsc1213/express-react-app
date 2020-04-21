/* eslint react/prop-types: 0 */

const React = require('react');
const Path = require('path');
const { APP_VERSION } = process.env;

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
    // const vendorSrc = `/client/vendor.${APP_VERSION}.bundle.js`;
    // const vendorSrc = Path.resolve('dist', `client/vendor.${APP_VERSION}.bundle.js`);
    const vendorSrc = `../../client/vendor.${APP_VERSION}.bundle.js`;

    return (
      <html>
        <head>
          <title>{title}</title>
          {head}
          {jsHead}
          <script key="vendor_bundle" src={vendorSrc} />
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
