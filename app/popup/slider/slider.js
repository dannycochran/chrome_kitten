require('./slider.scss');
var m = require('mithril');

var Slider = {
  view: function (ctrl, slider) {
    return m('form.slider', {action: '#'}, [
      m('p.range-field', [
        m('input.active', {
          type: 'range',
          id: slider.id,
          min: slider.range[0],
          max: slider.range[1],
          value: slider.val(),
          oninput: m.withAttr('value', slider.setSliderVal.bind(slider)),
          onmouseup: function () { slider.active(false); }
        })
      ])
    ]);
  }
};

export default Slider;