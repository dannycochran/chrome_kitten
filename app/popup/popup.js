var m = require('mithril');

import App from './app/app';

function load () {
  document.removeEventListener(load);
  m.mount(document.body, App);
}

document.addEventListener('DOMContentLoaded', load);