if (!Canvas.deconfigure || KAPhy.version !== KAPhy.current) {
  Canvas.deconfigure = function(canvasElement) {
    if (!this.configured) {
      console.warn("KAPhy warning - Attempted to reconfigure canvas.");
      return;
    }

    Canvas.element = null;
    Canvas.configured = false;

    Canvas.relWidth = null;
    Canvas.relHeight = null;

    Canvas.context = null;
  };
}
