require('./footer.scss');
var m = require('mithril');

import Draw from '../utilities/draw';

var Footer = {
  controller: function () {

  },

  view: function (ctrl) {
    return Draw.render(()=> m('div#footer', {
      key: this.view.toString(),
    }, [
      m('a', 'donate to your local shelter')
    ]));
  }
};

export default Footer;