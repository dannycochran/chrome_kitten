require('./header.scss');
var m = require('mithril');

import Draw from '../utilities/draw';

var Header = {
  controller: function () {

  },

  view: function (ctrl) {
    return Draw.render(()=> m('div#header.shadow', 'Chrome Kitten'));
  }
};

export default Header;