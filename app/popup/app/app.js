require('./app.scss');

var m = require('mithril');

import Header from '../header/header';
import Controls from '../controls/controls';
import Footer from '../footer/footer';

var App = {
  controller: function () {
    m.redraw.strategy('diff');
  },

  view: function (ctrl) {
    return m('div#chrome_kitten', [
      m.component(Header),
      m.component(Controls),
      m.component(Footer)
    ]);
  }
};

export default App;