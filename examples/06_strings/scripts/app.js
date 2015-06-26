
(function () {

  // canvas
  var canvasEl = $('#stringsCanvas');
  var width = canvasEl.attr('width');
  var height = canvasEl.attr('height');
  var canvas = canvasEl[0];

  console.log(canvas);

  // simulation
  var sim = new VerletJS(width, height, canvas);
  sim.gravity = new Vec2(0,0);
  sim.selectionRadius = 30;

  // entities
  var pins = [];
  var lines = 2;
  var x = width/2;
  var stiffness = 5.0;

function line(x, stiffness) {
  var N = 50;
  var h = height / N;

  var points = _.range(N).map(function(i) {
    return new Vec2(x, i * h);
  });
  var segment = sim.lineSegments(points, stiffness);

	pins.push(segment.pin(0));
	pins.push(segment.pin(N-1));
}

var h = 50;
var M = width /h;
  _.range(M).map(function(i) {
    line(h/2+i*h, stiffness);
  });

  // movement
  canvas.onmousedown = function() {};
	canvas.onmouseup = function() {};
	canvas.onmousemove = function(e) {
		var rect = sim.canvas.getBoundingClientRect();
		sim.mouse.x = e.clientX - rect.left;
		sim.mouse.y = e.clientY - rect.top;
    var nearest = sim.nearestEntity();

		if (nearest && !_.contains(pins, nearest)) {
			sim.draggedEntity = nearest;
		} else {
      sim.draggedEntity = null;
    }
	};

  // animation loop
  var loop = function() {
      sim.frame(32);
      sim.draw();
      requestAnimFrame(loop);
  };

  loop();



})();
