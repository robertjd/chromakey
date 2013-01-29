var processor = {
  timerCallback: function() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    var self = this;
    setTimeout(function () {
        self.timerCallback();
      }, 0);
  },

  doLoad: function() {
    this.video = document.getElementById("video");
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
    this.c2 = document.getElementById("c2");
    this.ctx2 = this.c2.getContext("2d");
    var self = this;
    this.video.addEventListener("play", function() {
        self.width = self.video.videoWidth / 2;
        self.height = self.video.videoHeight / 2;
        self.timerCallback();
      }, false);
  },

  computeFrame: function() {
    // this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    var frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        var l = frame.data.length / 4;

    for (var i = 0; i < l; i++) {
      var r = frame.data[i * 4 + 0];
      var g = frame.data[i * 4 + 1];
      var b = frame.data[i * 4 + 2];
      if (g > 100 && r > 100 && b < 43){
              frame.data[i * 4 + 3] = 0;
            }
    }
    this.ctx2.putImageData(frame, 0, 0);
    return;
  }
};



function updateCanvas(frame_data, width, height) {

    var img = ctx.createImageData(width, height);

    for (var i=0,j=0; j < frame_data.length; j=j+3) {
            img.data[i] = frame_data[j];
            img.data[i+1] = frame_data[j+1];
            img.data[i+2] = frame_data[j+2];
            img.data[i+3] = 255;
            i+=4;
    }
    ctx.putImageData(img, 0, 0);
    return;
}