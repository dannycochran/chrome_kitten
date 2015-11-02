export class Sounds {
  constructor (data) {
    this.audioPlayer = new Audio();
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      for (key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
                    'Old value was "%s", new value is "%s".',
                    key,
                    namespace,
                    storageChange.oldValue,
                    storageChange.newValue);
      }
    });
  }

  play () {
    this.audioPlayer.play();
  }

  getSource () {
    return './sounds/meow.mp3';
  }
}