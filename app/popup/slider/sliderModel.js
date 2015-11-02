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
    this._key = `${this.id}_range`;

    if (data.values) {
      this.values = data.values;
      this.range = [0, data.values.length - 1];
      this.scale = d3.quantize().domain(this.range).range(this.values);
    }

    var middle = (this.range[1] - this.range[0]) / 2;
    this.val = m.prop(middle);

    chrome.storage.local.get(this._key, function (d) {
      this.val(d[this._key] || middle);
      m.redraw();
    }.bind(this));
  }

  setSliderVal (val) {
    this.active(true);
    this.val(val);
    chrome.storage.local.set({[this._key]: val});
  }
}