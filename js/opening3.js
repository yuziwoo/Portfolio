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

    // 이미지 만들기
    this.img = new Image();
    this.img.src = "img/opening.jpg";

    this.gap = Math.max(this.stageWidth, this.stageHeight) / 20;
    this.width = this.gap *2;

    // 도형 설정
    this.count = 0;
    this.opacity = 1;

  } // constructor() End --

  resize(ctx) {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.halfW = document.body.clientWidth / 2;
    this.halfH = document.body.clientHeight / 2;

    this.gap = Math.max(this.stageWidth, this.stageHeight) / 20;
    this.width = this.gap *2;

    this.move = 0;

  } // resize() End --

  draw(ctx) {
    this.count += 1;

    ctx.beginPath();
    ctx.drawImage(this.img, this.stageWidth - 800, 0);


     // 종료
    if (this.count > 10000000800) {
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
