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
    this.opacity = 0;
    this.opacity2 = 1;

    // 도형 움직임 설정
    this.lineWidth = 2;//this.gap * 0.8;
    this.lineWidthV = this.gap * 0.008;

    this.scene = 1;
    this.lengths = [];
    for (let i = 0; i < 13; i++) {
      this.lengths[i] = 0;
    }
    this.speed = this.gap / 10;
    this.length12V = this.gap * 2;
    this.rebound = 0;
    this.reboundV = this.gap;
    this.kicking = [0.01,0];
    this.kickingV = this.gap / 5;


  } // constructor() End --

  resize(ctx) {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.halfW = document.body.clientWidth / 2;
    this.halfH = document.body.clientHeight / 2;

    this.gap = Math.max(this.stageWidth, this.stageHeight) / 50;

    if (this.scene >= 4) {
      this.lengths[12] = this.stageWidth;
    }

  } // resize() End --

  draw(ctx) {
    this.count += 1;

    if (this.scene == 2 && this.lineWidth < this.gap * 0.5) {
      this.lineWidth += this.lineWidthV;
      this.lineWidthV += this.gap * 0.001;
    } else if (this.scene == 2 && this.count < 115) {
      this.scene = 3;
    }

    if (this.scene == 3 && this.lengths[12] < this.stageWidth && this.count > 115) {
       this.lengths[12] += this.length12V;
    } else if (this.lengths[12] >= this.stageWidth
      && this.rebound < this.gap * 3
      && this.rebound >= 0) {
      this.rebound += this.reboundV;
      this.lengths[12] = this.stageWidth;
    } else if (this.rebound >= this.gap * 3) {
      this.reboundV *= -0.125;
      this.rebound += this.reboundV * 8;
      this.lengths[12] = this.stageWidth;
    } else if (this.rebound < 0 && this.count < 180) {
      this.scene = 4;
    }

    if (this.scene == 4 && this.count > 200) {
      if (this.kicking[0] < this.gap && this.kicking[0] > 0) {
        this.kicking[0] += this.kickingV;
      } else if (this.kicking[0] >= this.gap) {
        this.kickingV *= -0.5;
        this.kicking[0] += this.kickingV;
      }
      if (this.kicking[1] < this.gap * 2) {
        this.kicking[1] += this.gap / 5;
      }
    }

    ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.grd = ctx.createLinearGradient(0, 0, 0, this.stageHeight);
    this.grd.addColorStop(0,"rgba(95, 194, 166, 1)");
    this.grd.addColorStop(1,"rgba(220, 236, 165, 1)");

    ctx.save();
    ctx.strokeStyle = "#738078";
    ctx.lineWidth = this.lineWidth;
    ctx.miterLimit = 1;
    // ctx.lineCap = "round";

    // J
    ctx.beginPath();
    ctx.translate(this.halfW - this.gap * 14, this.halfH - this.gap * 2.5);
    ctx.moveTo(this.gap * 2.5 + this.rebound, this.gap * 0.1);
    ctx.lineTo(this.gap * 2.5 + this.rebound, this.gap * 3.6);
    ctx.arcTo(this.gap * 2.5 + this.rebound, this.gap * 4.6, this.gap * 1.5 + this.rebound, this.gap * 4.6, this.gap);
    ctx.quadraticCurveTo(this.gap * 0.7 + this.rebound, this.gap * 4.7, this.gap * 0.3 + this.rebound, this.gap * 4.2);
    ctx.stroke();

    if (this.scene == 1) {
      if (this.lengths[0] < this.gap * 3.5) {
        this.lengths[0] += this.speed;
        ctx.fillStyle = "white";
        ctx.fillRect(this.gap * 1, this.gap * 3.6, this.gap * 2, this.gap * -3.5 + this.lengths[0]);
      }
      ctx.fillStyle = "white";
      ctx.fillRect(0, this.gap * 3.5, this.gap * 2.5 + 2 - this.lengths[1], this.gap * 2);
      if (this.lengths[0] >= this.gap * 3.5 && this.lengths[1] < this.gap * 2.5) {
        this.lengths[1] += this.speed;
      }
    }

    // I
    ctx.beginPath();
    ctx.moveTo(this.gap * 4.4 + this.rebound, this.gap * 0.1);
    ctx.lineTo(this.gap * 4.4 + this.rebound, this.gap * 4.9);
    ctx.stroke();

    if (this.scene == 1) {
      if (this.lengths[2] < this.gap * 5) {
        this.lengths[2] += this.speed;
        ctx.fillStyle = "white";
        ctx.fillRect(this.gap * 4.4 - 2, this.gap * 4.9, 4, this.gap * -5 + this.lengths[2]);
      }
    }

    // W
    ctx.beginPath();
    ctx.moveTo(this.gap * 6 + this.rebound, this.gap * -0.1);
    ctx.lineTo(this.gap * 7.3 + this.rebound, this.gap * 4.9);
    ctx.lineWidth = this.lineWidth * 0.85;
    ctx.lineTo(this.gap * 8.62 + this.rebound, this.gap * 0.1);
    ctx.lineTo(this.gap * 9.92 + this.rebound + this.kicking[0], this.gap * 4.9);
    ctx.lineWidth = this.lineWidth;
    ctx.lineTo(this.gap * 11.14 + this.rebound + this.kicking[0], this.gap * -0.1);
    ctx.stroke();

    if (this.scene == 1) {
      if (this.lengths[3] < this.gap * 5) {
        this.lengths[3] += this.speed;
        ctx.fillStyle = "white";
        ctx.fillRect(this.gap * 11.14 + 2, 0, this.gap * -5.14 + this.lengths[3], this.gap * 5);
      }
    }

    // 1
    ctx.beginPath();
    ctx.moveTo(this.gap * 16.1 + this.rebound, this.gap * 1);
    ctx.lineTo(this.gap * 17.48 + this.rebound, this.gap * 0.1);
    ctx.lineTo(this.gap * 17.48 + this.rebound, this.gap * 4.9);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.moveTo(this.gap * 15.5 + this.rebound, 0);
    ctx.lineTo(this.gap * 17.12 + this.rebound, 0);
    ctx.lineTo(this.gap * 16.34 + this.rebound, this.gap * 0.52);
    ctx.lineTo(this.gap * 16.34 + this.rebound, this.gap * 1.24);
    ctx.lineTo(this.gap * 17.10 + this.rebound, this.gap * 0.78);
    ctx.lineTo(this.gap * 17.10 + this.rebound, this.gap * 5);
    ctx.lineTo(this.gap * 15.5 + this.rebound, this.gap * 5);
    ctx.closePath();
    ctx.fill();

    if (this.scene == 1) {
      if (this.lengths[4] < this.gap * 1.18) {
        this.lengths[4] += this.speed;
        ctx.fillStyle = "white";
        ctx.fillRect(this.gap * 17.48 - 2, 0, this.gap * -1.18 + this.lengths[4], this.gap * 2);
      }
      ctx.fillStyle = "white";
      ctx.fillRect(this.gap * 17.48 - 2, this.gap * 5, 4, this.gap * -5 + this.lengths[5]);
      if (this.lengths[4] >= this.gap * 1.18 && this.lengths[5] < this.gap * 5) {
        this.lengths[5] += this.speed;
      }
    }

    // 0
    ctx.beginPath();
    ctx.moveTo(this.gap * 19.3 + this.rebound, this.gap * 1.2);
    ctx.lineTo(this.gap * 19.3 + this.rebound, this.gap * 3.6);
    ctx.arcTo(this.gap * 19.3 + this.rebound, this.gap * 4.6, this.gap * 20.9 + this.rebound, this.gap * 4.6, this.gap * 1);
    ctx.arcTo(this.gap * 21.46 + this.rebound, this.gap * 4.6, this.gap * 21.46 + this.rebound, this.gap * 3.6, this.gap * 1);
    ctx.lineTo(this.gap * 21.46 + this.rebound, this.gap * 1.2);
    ctx.arcTo(this.gap * 21.46 + this.rebound, this.gap * 0.3, this.gap * 20.9 + this.rebound, this.gap * 0.3, this.gap * 1);
    ctx.arcTo(this.gap * 19.3 + this.rebound, this.gap * 0.3, this.gap * 19.3 + this.rebound, this.gap * 1.2, this.gap * 1);
    ctx.closePath();
    ctx.stroke();

    if (this.scene == 1) {
      if (this.lengths[6] < this.gap * 5) {
        this.lengths[6] += this.speed;
        ctx.fillStyle = "white";
        ctx.fillRect(this.gap * 19.3 - 2, 0, this.gap * 2.16 + 4, this.gap * 5 - this.lengths[6]);
      }
    }

    // 1
    ctx.beginPath();
    ctx.moveTo(this.gap * 22.4 + this.rebound, this.gap * 1);
    ctx.lineTo(this.gap * 23.78 + this.rebound, this.gap * 0.1);
    ctx.lineTo(this.gap * 23.78 + this.rebound, this.gap * 4.9);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.moveTo(this.gap * 21.8 + this.rebound, 0);
    ctx.lineTo(this.gap * 23.42 + this.rebound, 0);
    ctx.lineTo(this.gap * 22.64 + this.rebound, this.gap * 0.52);
    ctx.lineTo(this.gap * 22.64 + this.rebound, this.gap * 1.24);
    ctx.lineTo(this.gap * 23.4 + this.rebound, this.gap * 0.78);
    ctx.lineTo(this.gap * 23.4 + this.rebound, this.gap * 5);
    ctx.lineTo(this.gap * 21.8 + this.rebound, this.gap * 5);
    ctx.closePath();
    ctx.fill();

    if (this.scene == 1) {
      if (this.lengths[7] < this.gap * 1.18) {
        this.lengths[7] += this.speed;
        ctx.fillStyle = "white";
        ctx.fillRect(this.gap * 23.75 - 2, 0, this.gap * -1.18 + this.lengths[7], this.gap * 2);
      }
      ctx.fillStyle = "white";
      ctx.fillRect(this.gap * 23.78 - 2, this.gap * 5, 4, this.gap * -5 + this.lengths[8]);
      if (this.lengths[7] >= this.gap * 1.18 && this.lengths[8] < this.gap * 5) {
        this.lengths[8] += this.speed;
      }
    }

    // 2
    ctx.beginPath();
    ctx.moveTo(this.gap * 25.5 + this.rebound, this.gap * 1.3);
    ctx.arcTo(this.gap * 25.5 + this.rebound, this.gap * 0.4, this.gap * 26.06 + this.rebound, this.gap * 0.4, this.gap * 1);
    ctx.arcTo(this.gap * 27.62 + this.rebound, this.gap * 0.4, this.gap * 27.62 + this.rebound, this.gap * 1.3, this.gap * 1);
    ctx.quadraticCurveTo(this.gap * 27.62 + this.rebound, this.gap * 1.8, this.gap * 25.5 + this.rebound, this.gap * 4.6);
    ctx.lineTo(this.gap * 28 + this.rebound, this.gap * 4.6);
    ctx.stroke();

    if (this.scene == 1) {
      if (this.lengths[9] < this.gap * 3) {
        this.lengths[9] += this.speed;
        ctx.fillStyle = "white";
        ctx.fillRect(this.gap * 27.62 + 2, 0, this.gap * -3 + this.lengths[9], this.gap * 1.7);
      }
      ctx.fillStyle = "white";
      ctx.fillRect(this.gap * 27.62 + 2, this.gap * 4.6 - 2, this.gap * -3, this.gap * -3.4 + this.lengths[10]);
      if (this.lengths[10] < this.gap * 3.3 && this.lengths[9] >= this.gap * 3) {
        this.lengths[10] += this.speed;
      }
      if (this.lengths[11] < this.gap * 2.5) {
        this.lengths[11] += this.speed;
        ctx.fillStyle = "white";
        ctx.fillRect(this.gap * 25.5 - 2, this.gap * 4.6 - 2, this.gap * 2.5 - this.lengths[11], 4);
      }
    }

    if ( this.lengths[10] >= this.gap * 3.3
      && this.lengths[3] >= this.gap * 5
      && this.count > 74
      && this.count < 84){
      this.scene = 2;
    }

    // _
    ctx.beginPath();
    ctx.moveTo(this.gap * 12.52 - this.stageWidth + this.lengths[12] + this.rebound - this.gap * 2.2 + this.kicking[1], this.gap * 4.62);
    ctx.lineTo(this.gap * 15.42 - this.stageWidth + this.lengths[12] + this.rebound - this.gap * 2.2 + this.kicking[1], this.gap * 4.62);
    ctx.stroke();

    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.translate(this.halfW, this.halfH);
    ctx.fillStyle = "white";
    ctx.fillRect(this.gap * -14, this.gap * -3, this.gap * 28, this.gap * 0.6);
    ctx.fillRect(this.gap * -14, this.gap * 2.4, this.gap * 28, this.gap * 0.6);
    ctx.restore();

    if (this.count > 240) {
      if (this.opacity < 1) {
        this.opacity += 0.02;
      }
      ctx.save();
      ctx.beginPath();
      ctx.translate(this.halfW + this.gap * 14, this.halfH + this.gap * 3.5);
      ctx.font = "16px Arial";
      ctx.textAlign = "end";
      ctx.fillStyle = `rgba(30, 39, 39, ${this.opacity})`;
      ctx.fillText("제일 바쁜 사람이 제일 많은 시간을 가진다 - 비네 -", 0, 0);
      ctx.restore();
    }

     // 종료
    if (this.count > 370) {
      this.opacity2 -= 0.01;
      document.getElementsByTagName("canvas")[0].style.opacity = this.opacity2;
      if (this.opacity2 < 0) {
        document.getElementsByTagName("canvas")[0].remove();
        document.normalize();
        if (document.body.classList.contains("pc")) {
          window.location.href = "main.html";
        }else if (document.body.classList.contains("mobile")) {
          window.location.href = "m_main.html"
        }
      }
    };
  } // draw() End --

} // Opening End --

window.addEventListener("load", (e) => {
  let canvas = new App();
})
