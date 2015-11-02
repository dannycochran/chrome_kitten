var sliders = require('../data/sliders.json');

import {SliderModel} from '../slider/sliderModel';

class ViewModel {
  constructor () {
    this.sliders = sliders.map((d) => new SliderModel(d));
  }

  changeSliderVal (val) {

  }
}

export default new ViewModel();