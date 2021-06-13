class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.canvas.style.top = `150px`;

    this.boss = document.getElementsByClassName("aboutMe")[0];
    this.page1 = document.getElementsByClassName("introduce")[0];
    this.page2 = document.getElementsByClassName("works")[0];
    this.page3 = document.getElementsByClassName("skills")[0];
    this.page = 1;

    this.image = new Image();
    this.image.src = "./img/aboutmeCharcter3.png"

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.fly = 0;
    this.flyV = 0.1;

    this.effect = 0;
    this.isMoving = false;
    this.moving = ""; // 휠이 위,아래 어디로 움직였는지
    this.time = 0;

    /*document.addEventListener("click", (e) => {
      this.move += 540;
      if (this.move >= 3240) {
        this.move = -2700;
      }
      this.canvas.style.top = `100px`;
    })*/

    document.addEventListener("wheel", (e) => {
      if (e.deltaY > 0) {
        if (this.page == 1 && !this.isMoving) {
          this.isMoving = true;
          this.boss.style.top = `calc(220px - 100vh)`
          this.page += 1;
          this.moving = "down"
          this.canvas.style.top = `80px`;
          setTimeout(() => {
            this.isMoving = false;
          }, 2000);
        } else if (this.page == 2 && !this.isMoving) {
          this.isMoving = true;
          this.boss.style.top = `calc(300px - 200vh)`
          this.page += 1;
          this.moving = "down"
          this.canvas.style.top = `80px`;
          setTimeout(() => {
            this.isMoving = false;
          }, 2000);
        }
      } else if (e.deltaY < 0) {
        if (this.page == 2 && !this.isMoving) {
          this.isMoving = true;
          this.boss.style.top = `100px`
          this.page -= 1;
          this.moving = "up"
          this.canvas.style.top = `calc(100vh - 290px)`;
          setTimeout(() => {
            this.isMoving = false;
          }, 2000);
        } else if (this.page == 3 && !this.isMoving) {
          this.isMoving = true;
          this.boss.style.top = `calc(220px - 100vh)`
          this.page -= 1;
          this.moving = "up"
          this.canvas.style.top = `calc(100vh - 290px)`;
          setTimeout(() => {
            this.isMoving = false;
          }, 2000);
        }
      }
    }, false);

    requestAnimationFrame(this.animate.bind(this));
  }
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = 1080;
    this.canvas.height = 1140;
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
      this.ctx.drawImage(this.image, 2700 + this.effect, 0, 1080, 1140, 0, 0 + this.fly, 1080, 1140);
    }
}

window.addEventListener("load", (e) => {
  if (document.body.classList.contains("mobile")) {
    window.location.href = "m_aboutMe.html";
  }
  document.getElementsByClassName("aboutMe")[0].style.top = "100px";
  let canvas = new App();
})
