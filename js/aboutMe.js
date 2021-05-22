class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.image = new Image();
    this.image.src = "./img/aboutmeCharcter3.png"

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.fly = 0;
    this.flyV = 0.1;

    requestAnimationFrame(this.animate.bind(this));
  }
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = 1080;
    this.canvas.height = 1200;
    this.ctx.scale(2, 2);
  }
  animate() {
      requestAnimationFrame(this.animate.bind(this));

      this.ctx.clearRect(0,0,1080,1200);

      this.fly += this.flyV;
      if (this.fly > 10) {
        this.flyV *= -1;
        this.fly += this.flyV * 2
      } else if (this.fly < 0) {
        this.flyV *= -1;
        this.fly += this.flyV * 2
      }

      this.ctx.beginPath();
      this.ctx.fillStyle = "blue";
      this.ctx.drawImage(this.image,0, 0 + this.fly, 6480, 570 + this.fly);
    }
}

window.addEventListener("load", (e) => {
  if (document.body.classList.contains("mobile")) {
    window.location.href = "m_aboutMe.html";
  }

  let canvas = new App();
})
