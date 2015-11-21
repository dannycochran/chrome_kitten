var m = require('mithril');

import App from './app/app';
import {Sounds} from './sounds/sounds';

function load () {
  document.removeEventListener(load);
  m.mount(document.body, App);
}

document.addEventListener('DOMContentLoaded', load);