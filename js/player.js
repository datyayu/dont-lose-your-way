(function(window) {
  var $button = document.querySelector('#button');
  var playing = false;

  class AudioPlayer {
    constructor(onStop) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.source = null;
      this.playing = false;
      this.onStopCallback = onStop || function() {};

      this.loadSound = this.loadSound.bind(this);
      this.start = this.start.bind(this);
      this.stop = this.stop.bind(this);
    }

    loadSound(file) {
      return fetch(file)
        .then(response => response.arrayBuffer())
        .then(buffer => new Promise(resolve => {
          this.audioCtx.decodeAudioData(buffer,
            decodedBuffer => resolve(decodedBuffer)
          )
        }))
    }

    start() {
      this.stop();

      this.loadSound('https://datyayu.github.io/dont-lose-your-way/dont.mp3')
        .then(buffer => {
          this.source = this.audioCtx.createBufferSource();
          this.source.connect(this.audioCtx.destination);

          this.source.buffer = buffer;
          this.source.onended = () => this.stop();
          this.source.start(0);
          this.playing = true;
          this.source.loop = false;
        })
        .catch(e => console.log(e));
    }

    stop() {
      if (!this.source) return;

      this.source.stop();
      this.onStopCallback();
      this.playing = false;
    }
  }

  const audioPlayer = new AudioPlayer(() => $button.innerText = 'YES');


  $button.addEventListener('click', audioEventHandler);

  function audioEventHandler() {
    if (audioPlayer.playing) {
      audioPlayer.stop();
      $button.innerText = 'YES';
    } else {
      audioPlayer.start();
      $button.innerText = 'PAUSE';
    }
  }

})(window);
