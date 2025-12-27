/**
 * the frequency histogram
 *
 * @param {string} selector
 * @constructor
 */
const FrequencyBars = function (selector) {
  this.$canvas = document.querySelector(selector);
  this.canvasContext = this.$canvas.getContext("2d");

  // Initial size + setup listeners
  this.resize();

  // Ensure proper size after full page load/layout
  window.addEventListener('load', () => this.resize());

  // Debounced resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => this.resize(), 100);
  });
};

FrequencyBars.prototype.resize = function () {
  // Update canvas resolution to match display size
  this.$canvas.width = document.body.clientWidth;
  this.$canvas.height = document.body.clientHeight / 2;

  // Optional: set a background if you want (or leave transparent)
  this.canvasContext.fillStyle = "#000";  // or "#1a1a1a" for dark bg
  this.canvasContext.fillRect(0, 0, this.$canvas.width, this.$canvas.height);
};

FrequencyBars.prototype.update = function (data) {
  const length = 64; // low frequencies only
  const width = this.$canvas.width / length * 0.9;  // slight gap between bars
  const spacing = this.$canvas.width / length * 0.1;

  this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

  // Draw dark grey bars scaled to full canvas height
  this.canvasContext.fillStyle = "#34495e";

  for (let i = 0; i < length; i++) {
    const barHeight = (data[i] / 255) * this.$canvas.height;  // Scale 0-255 → full height
    const x = i * (width + spacing);

    this.canvasContext.fillRect(
      x,
      this.$canvas.height - barHeight,
      width,
      barHeight
    );
  }
};
