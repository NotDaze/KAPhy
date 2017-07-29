if (!Canvas.configure || KAPhy.version !== KAPhy.current) {
  Canvas.configure = function(canvasElement) {
    if (this.configured) {
      console.warn("KAPhy Warning - Please deconfigure canvas before reconfiguring it.");
      return;
    }

    Canvas.element = canvasElement;
    Canvas.configured = true;

    Canvas.relWidth = canvasElement.width;
    Canvas.relHeight = canvasElement.height;

    Canvas.context = canvasElement.getContext("2d");
    Canvas.context.fillStyle = "rgba(255, 255, 255, 1.0)";
  };
}
