var _ = require('underscore');

import AppViewModel from '../app/appViewModel';

export class Sounds {
  constructor (data) {
    chrome.storage.onChanged.addListener(this.reset.bind(this));

    this._audioPlayer = new Audio();
    this._timeout = null;
    this._frequencies = _.findWhere(AppViewModel.sliders, {id: 'frequency'});

    this._throttledPlay = _.throttle(this.play.bind(this), 500, {
      leading: false,
      trailing: true
    });

    chrome.storage.local.get('frequency', (d) =>
      d.frequency ? this.setFrequency(d.frequency) : null
    );
  }

  reset (changes, namespace) {
    var volume = changes.volume || {},
        frequency = changes.frequency || {};

    if (volume.oldValue !== volume.newValue) this.setVolume(volume);
    if (frequency.oldValue !== frequency.newValue) this.setFrequency(frequency);
  }

  play () {
    this._audioPlayer.src = this.getSource();
    this._audioPlayer.play();
  }

  setVolume (volume) {
    this._audioPlayer.volume = volume.newValue / 100;
    this._throttledPlay();
  }

  setFrequency (frequency) {
    clearTimeout(this._timeout);
    if (!Number(frequency.newValue)) return;

    this._timeout = setTimeout(function () {
      this._throttledPlay();
      this.setFrequency(frequency);
    }.bind(this), this._frequencies.values[frequency.newValue].value);
  }

  getSource () {
    return './sounds/meow.mp3';
  }
}