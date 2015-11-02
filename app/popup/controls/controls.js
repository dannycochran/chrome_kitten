require('./controls.scss');
var m = require('mithril');

import ViewModel from '../app/appViewModel';
import Slider from '../slider/slider';

var Controls = {
  controller: function () {
    m.redraw.strategy('diff');
    return ViewModel;
  },

  view: function (ctrl) {
    function getIcon (d) {
      if (d.val() == d.range[0] && d.icon_alt) {
        return d.icon_alt;
      } else return d.icon;
    }

    function getValue (d) {
      if (d.scale) {
        return d.scale(d.val()).name;
      } else return d.val();
    }

    return m('div#controls', ctrl.sliders.map((d) =>
      m('.slider-container', {
        className: [
          d.val() == d.range[0] ? 'off' : '',
          d.active() ? 'active' : ''
        ].join(' ')
      }, [
        m('span.readable-value', getValue(d)),
        m.component(Slider, d),
        m('div.label', [
          m('i.prefix.material-icons', getIcon(d)),
          m('label', d.name)
        ])
      ])
    ));
  }
};

export default Controls;