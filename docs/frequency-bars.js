/**
 * the frequency histogram
 *
 * @param {string} selector
 * @constructor
 */
const FrequencyBars = function (selector) {
  this.$canvas = document.querySelector(selector);
  
  // MUST create context BEFORE any drawing or resize
  this.canvasContext = this.$canvas.getContext("2d");

  // Initial resize (may be approximate, but safe now that context exists)
  this.resize();

  // Ensure correct size after page fully loads and layout is stable
  window.addEventListener('load', () => {
    this.resize();
  });

  // Debounced resize handler for smooth window resizing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      this.resize();
    }, 100);
  });
};

FrequencyBars.prototype.resize = function () {
  // Set canvas resolution to match current window size
  this.$canvas.width = document.body.clientWidth;
  this.$canvas.height = document.body.clientHeight / 2;

  // Draw subtle dark background so the area is visible even when silent
  this.canvasContext.fillStyle = "#0b0f14";  // Very dark blue-grey (subtle contrast vs page bg)
  this.canvasContext.fillRect(0, 0, this.$canvas.width, this.$canvas.height);
};

FrequencyBars.prototype.update = function (data) {
  const length = 64; // Low frequencies only
  const width = (this.$canvas.width / length) * 0.9;   // 90% for bar, 10% for spacing
  const spacing = (this.$canvas.width / length) * 0.1;

  // Clear previous frame
  this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

  // Re-draw background (ensures it's always there, even if cleared)
  this.canvasContext.fillStyle = "#0b0f14";
  this.canvasContext.fillRect(0, 0, this.$canvas.width, this.$canvas.height);

  // Draw dark grey bars, scaled to full canvas height
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
