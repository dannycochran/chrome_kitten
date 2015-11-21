var m = require('mithril'),
    d3 = require('d3-scale');

export class SliderModel {
  constructor (data) {
    this.id = data.id;
    this.name = data.name;
    this.range = data.range;
    this.icon = data.icon;
    this.icon_alt = data.icon_alt;
    this.active = m.prop(false);

    if (data.values) {
      this.values = data.values;
      this.range = [0, data.values.length - 1];
      this.scale = d3.quantize().domain(this.range).range(this.values);
    }

    var middle = Math.floor((this.range[1] - this.range[0]) / 2);
    this.val = m.prop(middle);

    chrome.storage.local.get(this.id, function (d) {
      this.setSliderVal(d[this.id] || middle);
      this.active(false);
      m.redraw();
    }.bind(this));
  }

  setSliderVal (val) {
    this.active(true);
    this.val(val);
    chrome.storage.local.set({[this.id]: val});
  }
}