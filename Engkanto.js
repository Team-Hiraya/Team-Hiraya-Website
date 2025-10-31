const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// initial gradient
let grad = ctx.createRadialGradient(0, 0, 0, 0, 0, canvas.width);
grad.addColorStop(0, '#000');
grad.addColorStop(1, 'rgb(255,255,255)');
ctx.fillStyle = grad;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// mousemove gradient
document.body.onmousemove = function(event) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = event.clientX;
  const y = event.clientY;

  const rx = canvas.width * x / width;
  const ry = canvas.height * y / height;
  const xc = Math.floor(256 * x / width);
  const yc = Math.floor(256 * y / height);

  grad = ctx.createRadialGradient(rx, ry, 0, rx, ry, canvas.width);
  grad.addColorStop(0, '#000');
  grad.addColorStop(1, `rgb(${xc}, ${255 - xc}, ${yc})`);

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
