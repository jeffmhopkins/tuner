/**
 * the frequency histogram
 *
 * @param {string} selector
 * @constructor
 */
const FrequencyBars = function (selector) {
  this.$canvas = document.querySelector(selector);
  this.resize();
  this.canvasContext = this.$canvas.getContext("2d");
};

FrequencyBars.prototype.resize = function () {
  this.$canvas.width = document.body.clientWidth;
  this.$canvas.height = document.body.clientHeight / 2;
  this.canvasContext.fillStyle = "#000";  // or "#1a1a1a" for dark bg
  this.canvasContext.fillRect(0, 0, this.$canvas.width, this.$canvas.height);
  this.canvasContext.fillStyle = "#34495e";
};

FrequencyBars.prototype.update = function (data) {
  const length = 64;
  const width = this.$canvas.width / length * 0.9;
  const spacing = this.$canvas.width / length * 0.1;
  this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
  this.canvasContext.fillStyle = "#34495e";
  for (let i = 0; i < length; i++) {
    const barHeight = (data[i] / 255) * this.$canvas.height;
    const x = i * (width + spacing);
    this.canvasContext.fillRect(
      x,
      this.$canvas.height - barHeight,
      width,
      barHeight
    );
  }
};
