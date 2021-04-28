class App {
  constructor() {
    // canvas 생성
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    // opening 객체 생성
    this.opening = new Opening();

    // resize 이벤트 생성
    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // animate method 실행
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    // display 계산
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    // canvas 크기 설정
    this.canvas.width = this.stageWidth * 4;
    this.canvas.height = this.stageHeight * 4;
    this.ctx.scale(4, 4);

    // opening 객체 resize 메소드 연동
    this.opening.resize(this.ctx);
  }

  animate() {
    if (document.getElementsByTagName("canvas")[0]) {
      // opening 객체 draw 메소드 연동
      this.opening.draw(this.ctx);

      requestAnimationFrame(this.animate.bind(this));
    }
  }

} // class App End --

class Opening {
  constructor() {
    // display 계산
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.halfW = document.body.clientWidth / 2;
    this.halfH = document.body.clientHeight / 2;

    this.gap = Math.max(this.stageWidth, this.stageHeight) / 10;
    this.width = this.gap / 10;

    // scene 구성
    this.scene1Height = 0;
    this.scene2Height = 0;
    this.scene3Move = 0;
    this.scene4Rotate = 0;
    this.scene5Width = 0;

    // 도형 설정
    this.count = 0;
    this.opacity = 1;

  } // constructor() End --

  resize(ctx) {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.halfW = document.body.clientWidth / 2;
    this.halfH = document.body.clientHeight / 2;

    this.gap = Math.max(this.stageWidth, this.stageHeight) / 10;
    this.width = this.gap / 10;

  } // resize() End --

  draw(ctx) {
    this.count += 1;

    // 도형의 움직임
    this.dashOffset -= 3;

    // scene 1
    if (this.count > 20 && this.count < 40) {

      ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      if (this.scene1Height <= this.stageHeight) {
        this.scene1Height += this.stageHeight / 12;
      }

      ctx.beginPath();
      ctx.lineWidth = this.width;
      ctx.strokeStyle = "darkred";
      ctx.moveTo(this.halfW - this.gap, 0);
      ctx.lineTo(this.halfW - this.gap, this.scene1Height);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = this.width;
      ctx.strokeStyle = "darkred";
      ctx.moveTo(this.halfW + this.gap, 0);
      ctx.lineTo(this.halfW + this.gap, this.scene1Height);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = this.width * 2;
      ctx.strokeStyle = "black";
      ctx.moveTo(this.halfW, 0);
      ctx.lineTo(this.halfW, this.scene1Height);
      ctx.stroke();
    }

    // scene 2
    if (this.count >= 40 && this.count < 90) {

      ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      if (this.scene2Height < this.stageHeight / 2 && this.count > 70) {
        this.scene2Height += this.stageHeight / 30;
      }

      ctx.beginPath();
      ctx.lineWidth = this.width;
      ctx.strokeStyle = "darkred";
      ctx.moveTo(this.halfW - this.gap, this.scene2Height);
      ctx.lineTo(this.halfW - this.gap, this.scene1Height - this.scene2Height);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = this.width;
      ctx.strokeStyle = "darkred";
      ctx.moveTo(this.halfW + this.gap, this.scene2Height);
      ctx.lineTo(this.halfW + this.gap, this.scene1Height - this.scene2Height);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = this.width * 2;
      ctx.strokeStyle = "black";
      ctx.moveTo(this.halfW, this.scene2Height);
      ctx.lineTo(this.halfW, this.scene1Height - this.scene2Height);
      ctx.stroke();
    }

    // scene 3
    if (this.count >= 90 && this.count < 120) {

      ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      if (this.scene3Move < this.gap) {
        this.scene3Move += this.gap / 4;
      }

      ctx.save();
      ctx.translate(this.halfW, this.halfH);

      ctx.beginPath();
      ctx.fillStyle = "darkred";
      ctx.arc(-this.scene3Move, 0, this.width, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "darkred";
      ctx.arc(this.scene3Move, 0, this.width, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.arc(0, 0, this.width * 2, 0, 2 * Math.PI);
      ctx.fill();

      ctx.restore();
    }

    // scene 4
    if (this.count >= 120 && this.count < 270) {

      ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      if (this.count < 150) {
        this.scene4Rotate += 9 * Math.PI / 180;
      } else if (this.count < 215) {
        this.scene4Rotate += 18 * Math.PI / 180;
      } else if (this.count < 235) {
        this.scene4Rotate += 9 * Math.PI / 180;
      }

      ctx.save();
      ctx.translate(this.halfW, this.halfH);
      ctx.rotate(this.scene4Rotate);

      ctx.beginPath();
      ctx.fillStyle = "darkred";
      ctx.arc(-this.gap, 0, this.width, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "darkred";
      ctx.arc(this.gap, 0, this.width, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.arc(0, 0, this.width * 2, 0, 2 * Math.PI);
      ctx.fill();

      ctx.restore();
    }

    // scene 5
    if (this.count >= 270 && this.count < 800) {

      if (this.scene5Width < this.gap) {
        this.scene5Width += this.gap / 10;
      }

      ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
      ctx.font = "bold 36px Arial";
      ctx.textAlign = "center";
      ctx.fillText("반갑습니다.", 0, 0);
      ctx.fill();

      ctx.save();
      ctx.translate(this.halfW, this.halfH);
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.strokeStyle = "darkred";
      ctx.moveTo(0, 0);
      ctx.lineTo(-this.scene5Width, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "darkred";
      ctx.moveTo(0, 0);
      ctx.lineTo(this.scene5Width, 0);
      ctx.stroke();

      ctx.restore();
    }






     // 텍스트가 생성되는 이벤트가 끝나면 eraser.draw() 이벤트 실행
    if (this.count > 800) {
      document.getElementsByTagName("canvas")[0].remove();
      document.normalize();
      if (document.body.classList.contains("pc")) {
        window.location.href = "main.html";
      }else if (document.body.classList.contains("mobile")) {
        window.location.href = "m_main.html"
      }
    };
  } // draw() End --

} // Opening End --

window.addEventListener("load", (e) => {
  let canvas = new App();
})
