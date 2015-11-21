var _ = require('underscore'),
    frequencies = require('../popup/data/sliders.json')[1];

class Sounds {
  constructor (data) {
    chrome.storage.onChanged.addListener(this.reset.bind(this));

    this._audioPlayer = new Audio();
    this._timeout = null;
    this._throttledPlay = _.throttle(this.play.bind(this), 500, {
      leading: false,
      trailing: true
    });
  }

  reset (changes, namespace) {
    var volume = changes.volume || {},
        frequency = changes.frequency || {};

    // If the volume has changed, update it and play
    // If the volume used to be zero, reset the player frequency
    // If the volume is now zero, set frequency to 0
    if (volume.oldValue !== volume.newValue) {
      this.setVolume(volume.newValue);
      if (volume.oldValue === 0) {
        chrome.storage.local.get('frequency', (d) => this.setFrequency(d.frequency));
      } else if (volume.newValue === 0) {
        this.setFrequency(0);
      }
    }

    // If the frequency has changed, set it, unless the volume is zero, in which
    // case clear all the frequencies.
    if (frequency.oldValue !== frequency.newValue) {
      chrome.storage.local.get('volume', (d) =>
        this.setFrequency(Number(d.volume) ? frequency.newValue : 0));
    }
  }

  play () {
    this._audioPlayer.src = this.getSource();
    this._audioPlayer.play();
  }

  setVolume (volume) {
    this._audioPlayer.volume = volume / 100;
    this._throttledPlay();
  }

  setFrequency (frequency) {
    clearTimeout(this._timeout);
    if (!Number(frequency)) return;

    this._timeout = setTimeout(function () {
      this._throttledPlay();
      this.setFrequency(frequency);
    }.bind(this), frequencies.values[frequency].value);
  }

  getSource () {
    return './sounds/meow.mp3';
  }
}

export default new Sounds();