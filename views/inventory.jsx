/* eslint-disable react/prop-types */
const React = require('react');
const Base = require('./base');
// const Path = require('path');
const { APP_VERSION } = process.env;

// This file can be modified as per the application routes and filenames
function Inventory(props) {
  const jsSrc = `/client/7BossInventory.${APP_VERSION}.bundle.js`;
  const cssSrc = `/client/7BossInventory.${APP_VERSION}.bundle.css`;

  // const jsSrc = Path.resolve('dist', `client/7BossInventory.${APP_VERSION}.bundle.js`);
  // const cssSrc = Path.resolve('dist', `client/7BossInventory.${APP_VERSION}.bundle.css`);
  // const jsSrc = `../../client/7BossInventory.${APP_VERSION}.bundle.js`;
  // const cssSrc = `../../client/7BossInventory.${APP_VERSION}.bundle.css`;

  console.log('>>>>>>>>>>>>>>>>>>', jsSrc, cssSrc);

  const js = [<script key="inventory-js-bundle" src={jsSrc} />];
  const head = [<link key="inventory-css-bundle" rel="stylesheet" href={cssSrc} />];
  return (
    <Base title={props.title} js={js} head={head}>
      <div key="app" id="app" />
    </Base>
  );
}

module.exports = Inventory;
