/* eslint-disable react/prop-types */
const React = require('react');
const Base = require('./base');

function Home(props) {
  const js = [<script key='bundle' src='/dist/inventory.bundle.js' />];
  console.log('>>>>>');
  return (
    <Base title={props.title} js={js}>
      <div key='app' id='app' />
    </Base>
  );
}

module.exports = Home;
