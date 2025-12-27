/**
 * the frequency histogram
 *
 * @param {string} selector - CSS selector for the canvas element
 * @constructor
 */
const FrequencyBars = function (selector) {
  this.$canvas = document.querySelector(selector);
  this.canvasContext = this.$canvas.getContext("2d");
  
  // Store the latest frequency data so we can redraw on resize
  this.latestData = null;

  // Initial sizing
  this.resizeCanvas();

  // Bind resize handler
  window.addEventListener('resize', () => {
    this.resizeCanvas();
    // Redraw with the most recent data (if any)
    if (this.latestData) {
      this.update(this.latestData);
    }
  });
};

/**
 * Helper to resize the canvas to fill available space
 */
FrequencyBars.prototype.resizeCanvas = function () {
  this.$canvas.width = document.body.clientWidth;
  this.$canvas.height = document.body.clientHeight / 2;
};

/**
 * @param {Uint8Array} data
 */
FrequencyBars.prototype.update = function (data) {
  // Save the latest data for potential redraws on resize
  this.latestData = data;

  const length = 64; // low frequency only
  const width = this.$canvas.width / length - 0.5;

  this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

  for (let i = 0; i < length; i += 1) {
    this.canvasContext.fillStyle = "#333";
    this.canvasContext.fillRect(
      i * (width + 0.5),
      this.$canvas.height - data[i],
      width,
      data[i]
    );
  }
};
