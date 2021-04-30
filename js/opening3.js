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
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

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

    this.gap = Math.max(this.stageWidth, this.stageHeight) / 50;

    // 도형 설정
    this.grd = 0;
    this.count = 0;
    this.opacity = 1;

    // 도형 움직임 설정
    this.lineWidth = 1;//this.gap * 0.8;
    this.lineWidthV = 0.05;


  } // constructor() End --

  resize(ctx) {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.halfW = document.body.clientWidth / 2;
    this.halfH = document.body.clientHeight / 2;

    this.gap = Math.max(this.stageWidth, this.stageHeight) / 50;

    this.img = document.createElement("img");
    this.img.src = "img/logo.svg"

  } // resize() End --

  draw(ctx) {
    this.count += 1;

    if (this.lineWidth > this.gap * 0.8){
      this.lineWidthV *= -1;
      this.lineWidth += this.lineWidthV
    }else if(this.lineWidth < 1){
      this.lineWidthV *= -1;
      this.lineWidth += this.lineWidthV
    }
    this.lineWidth += this.lineWidthV


    ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.grd = ctx.createLinearGradient(0, 0, 0, this.stageHeight);
    this.grd.addColorStop(0,"rgba(95, 194, 166, 1)");
    this.grd.addColorStop(1,"rgba(220, 236, 165, 1)");

    ctx.save();
    ctx.strokeStyle = "dodgerblue";
    ctx.lineWidth = this.lineWidth;
    ctx.miterLimit = 1;
    // ctx.lineCap = "round";

    // J
    ctx.beginPath();
    ctx.translate(this.halfW - this.gap * 14, this.halfH - this.gap * 2.5);
    ctx.moveTo(this.gap * 2.5, this.gap * 0.1);
    ctx.lineTo(this.gap * 2.5, this.gap * 3.6);
    ctx.arcTo(this.gap * 2.5, this.gap * 4.6, this.gap * 1.5, this.gap * 4.6, this.gap);
    ctx.quadraticCurveTo(this.gap * 0.7, this.gap * 4.7, this.gap * 0.3, this.gap * 4.2);
    ctx.stroke();

    // I
    ctx.beginPath();
    ctx.moveTo(this.gap * 4.4, this.gap * 0.1);
    ctx.lineTo(this.gap * 4.4, this.gap * 4.9);
    ctx.stroke();

    // W
    ctx.beginPath();
    ctx.moveTo(this.gap * 6, this.gap * -0.1);
    ctx.lineTo(this.gap * 7.3, this.gap * 4.9);
    ctx.lineWidth = this.lineWidth * 0.85;
    ctx.lineTo(this.gap * 8.62, this.gap * 0.1);
    ctx.lineTo(this.gap * 9.92, this.gap * 4.9);
    ctx.lineWidth = this.lineWidth;
    ctx.lineTo(this.gap * 11.14, this.gap * -0.1);
    ctx.stroke();

    // 1
    ctx.beginPath();
    ctx.moveTo(this.gap * 16.3, this.gap * 0.9);
    ctx.lineTo(this.gap * 17.48, this.gap * 0.1);
    ctx.lineTo(this.gap * 17.48, this.gap * 4.9);
    ctx.stroke();


    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.moveTo(this.gap * 15.5, 0);
    ctx.lineTo(this.gap * 17.12, 0);
    ctx.lineTo(this.gap * 16.34, this.gap * 0.52);
    ctx.lineTo(this.gap * 16.34, this.gap * 1.24);
    ctx.lineTo(this.gap * 17.10, this.gap * 0.78);
    ctx.lineTo(this.gap * 17.10, this.gap * 5);
    ctx.lineTo(this.gap * 15.5, this.gap * 5);
    ctx.closePath();
    ctx.fill();


    // 0
    ctx.beginPath();
    ctx.moveTo(this.gap * 19.3, this.gap * 1.2);
    ctx.lineTo(this.gap * 19.3, this.gap * 3.6);
    ctx.arcTo(this.gap * 19.3, this.gap * 4.6, this.gap * 20.9, this.gap * 4.6, this.gap * 1);
    ctx.arcTo(this.gap * 21.46, this.gap * 4.6, this.gap * 21.46, this.gap * 3.6, this.gap * 1);
    ctx.lineTo(this.gap * 21.46, this.gap * 1.2);
    ctx.arcTo(this.gap * 21.46, this.gap * 0.3, this.gap * 20.9, this.gap * 0.3, this.gap * 1);
    ctx.arcTo(this.gap * 19.3, this.gap * 0.3, this.gap * 19.3, this.gap * 1.2, this.gap * 1);
    ctx.closePath();
    ctx.stroke();

    // 1
    ctx.beginPath();
    ctx.moveTo(this.gap * 22.6, this.gap * 0.9);
    ctx.lineTo(this.gap * 23.78, this.gap * 0.1);
    ctx.lineTo(this.gap * 23.78, this.gap * 4.9);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.moveTo(this.gap * 21.8, 0);
    ctx.lineTo(this.gap * 23.42, 0);
    ctx.lineTo(this.gap * 22.64, this.gap * 0.52);
    ctx.lineTo(this.gap * 22.64, this.gap * 1.24);
    ctx.lineTo(this.gap * 23.4, this.gap * 0.78);
    ctx.lineTo(this.gap * 23.4, this.gap * 5);
    ctx.lineTo(this.gap * 21.8, this.gap * 5);
    ctx.closePath();
    ctx.fill();

    // 2
    ctx.beginPath();
    ctx.moveTo(this.gap * 25.5, this.gap * 1.3);
    ctx.arcTo(this.gap * 25.5, this.gap * 0.4, this.gap * 26.06, this.gap * 0.4, this.gap * 1);
    ctx.arcTo(this.gap * 27.62, this.gap * 0.4, this.gap * 27.62, this.gap * 1.3, this.gap * 1);
    ctx.quadraticCurveTo(this.gap * 27.62, this.gap * 1.8, this.gap * 25.5, this.gap * 4.6);
    ctx.lineTo(this.gap * 28, this.gap * 4.6);
    ctx.stroke();

    // _
    ctx.beginPath();
    ctx.moveTo(this.gap * 12.52, this.gap * 4.62);
    ctx.lineTo(this.gap * 15.42, this.gap * 4.62);
    ctx.stroke();

    ctx.restore();


    ctx.save();
    ctx.beginPath();
    ctx.globalAlpha = 0.2;
    ctx.translate(this.halfW, this.halfH);
    ctx.drawImage(this.img, this.gap*-14, this.gap*-2.5, this.gap*28, this.gap*5);
    ctx.restore();


    ctx.save();
    ctx.beginPath();
    ctx.translate(this.halfW, this.halfH);
    ctx.fillStyle = "white";
    ctx.fillRect(this.gap * -14, this.gap * -3, this.gap * 28, this.gap * 0.6);
    ctx.fillRect(this.gap * -14, this.gap * 2.4, this.gap * 28, this.gap * 0.6);
    ctx.restore();



     // 종료
     /*
    if (this.count > 10000000800) {
      document.getElementsByTagName("canvas")[0].remove();
      document.normalize();
      if (document.body.classList.contains("pc")) {
        window.location.href = "main.html";
      }else if (document.body.classList.contains("mobile")) {
        window.location.href = "m_main.html"
      }
    };
    */
  } // draw() End --

} // Opening End --

window.addEventListener("load", (e) => {
  let canvas = new App();
})
