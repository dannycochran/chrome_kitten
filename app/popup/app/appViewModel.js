var sliders = require('../data/sliders.json');

import {SliderModel} from '../slider/sliderModel';

class ViewModel {
  constructor () {
    this.sliders = sliders.map((d) => new SliderModel(d));
  }
}

export default new ViewModel();