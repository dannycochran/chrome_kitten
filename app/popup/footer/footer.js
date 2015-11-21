require('./footer.scss');
var m = require('mithril');

import Draw from '../utilities/draw';

var Footer = {
  view: function (ctrl) {
    return Draw.render(()=> m('div#footer', {
      key: this.view.toString(),
    }, [
      m('a', {
        href: 'http://theshelterpetproject.org/shelters',
        target: '_blank'
      }, 'donate to your local shelter')
    ]));
  }
};

export default Footer;