// Airbnb 스타일가이드에 맞춰서 작성하였습니다. canvas에 낯선분들을 위하여 최대한 많은 주석을 남깁니다. 감사합니다.

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
    this.eraser = new Eraser();

    // 도형 설정
    this.radius = Math.min(this.stageWidth, this.stageHeight) / 20 * 9;
    this.arc = this.radius / 2;
    this.dashOffset = 0;

    // 도형의 변환을 위한 설정
    this.change = 0;
    this.changeV = 5;

    // 시간차에 따른 Scene의 변환을 주기 위한 설정
    this.count = 0;
    this.opacity = 100;
    this.fontColor = 0;
    this.textDecoration = 0;
    this.textDecorationV = 15;

    // 클릭을 했는지 알아내기 위한 이벤트
    this.isClick = 0;
    document.addEventListener("click", (e) => {
      this.isClick += 1;
    })

    // 마우스 hover시 중앙 텍스트의 투명도 조절 이벤트
    this.isHover = 0.8;
    document.addEventListener("mousemove", (e) => {
      if (this.isClick < 1) {
        if (e.clientX > this.halfW - 125 &&
            e.clientX < this.halfW + 125 &&
            e.clientY > this.halfH - 32 &&
            e.clientY < this.halfH ) {
            this.isHover = 0.6;
          }else {
            this.isHover = 0.8;
          }
      }else if (this.isClick > 0) {
        this.isHover = 0.8;
      }
    });

  } // constructor() End --

  resize(ctx) {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.halfW = document.body.clientWidth / 2;
    this.halfH = document.body.clientHeight / 2;

    if (this.isClick < 1) { // 클릭이 실행된 이후에는 도형의 크기를 고정시켜 오류의 발생을 방지합니다.
      this.radius = Math.min(this.stageWidth, this.stageHeight) / 20 * 9;
      this.arc = this.radius / 2;
    }

    this.eraser.resize();
  } // resize() End --

  draw(ctx) {
    // 배경 색상 생성
    this.grd = ctx.createLinearGradient(0, 0, this.stageWidth, this.stageHeight);
    this.grd.addColorStop(0,"rgba(255, 255, 255, 1)");
    this.grd.addColorStop(1,"rgba(247, 243, 242, 1)");

    // 도형의 움직임
    this.dashOffset += 3;
    if (this.isClick) {
      this.count += 3;
    }

    if (this.count > 80 && this.isClick) {
       if (this.change < this.radius - this.changeV){
         this.changeV += 0.3;
         this.change += this.changeV;
         this.dashOffset += 1;
       }else {
         this.dashOffset -= 1;
       }
    }

    // 배경 그리기
    ctx.beginPath();
    ctx.save();
    ctx.filter = `opacity(${this.opacity}%)`;
    ctx.fillStyle = this.grd;
    ctx.fillRect(0,0,this.stageWidth,this.stageHeight);
    ctx.restore();

    // 원 그리기 2
    ctx.beginPath();
    ctx.save();
    ctx.filter = `opacity(${this.opacity}%)`;
    ctx.fillStyle = this.grd;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(8, 8, 15, 0.8)";


    // DashOffset 설정
    ctx.setLineDash([this.radius*3, this.radius]);
    ctx.lineDashOffset = this.dashOffset;

    // 도형 생성
    ctx.moveTo(this.halfW + this.radius, this.halfH);
    ctx.arcTo(this.halfW + this.radius, this.halfH + this.radius, this.halfW + this.change, this.halfH + this.radius, this.radius - this.change);
    ctx.lineTo(this.halfW, this.halfH + this.radius);
    ctx.arcTo(this.halfW - this.radius, this.halfH + this.radius, this.halfW - this.radius, this.halfH + this.change, this.radius - this.change);
    ctx.lineTo(this.halfW - this.radius, this.halfH);
    ctx.arcTo(this.halfW - this.radius, this.halfH - this.radius, this.halfW - this.change, this.halfH - this.radius, this.radius - this.change);
    ctx.lineTo(this.halfW, this.halfH - this.radius);
    ctx.arcTo(this.halfW + this.radius, this.halfH - this.radius, this.halfW + this.radius, this.halfH - this.change, this.radius - this.change);
    ctx.lineTo(this.halfW + this.radius, this.halfH);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 텍스트 생성
    if (this.count < 300) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(8, 8, 15, ${this.isHover})`;
      ctx.font = "bold 36px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Click for Enter", this.halfW, this.halfH + 4);

      if (this.isClick) {
        if (this.textDecoration < 250) {
          this.textDecoration += this.textDecorationV;
          if (this.textDecorationV > 1) {
            this.textDecorationV -= 0.55;
          }
        }
        ctx.beginPath();
        ctx.strokeStyle = `rgba(8,8,15,${this.isHover})`;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.moveTo(this.halfW - 125, this.halfH - 8);
        ctx.lineTo(this.halfW - 125 + this.textDecoration , this.halfH - 8);
        ctx.stroke();
      }
    }


    // 텍스트 생성 2
    if (this.count > 375 && this.isClick) {
      if (this.fontColor < 1) {
        this.fontColor += 0.02;
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(8, 8, 15, ${this.fontColor / 5 * 4 + this.opacity / 100 - 1})`;
      ctx.font = "bold 36px Arial";
      ctx.textAlign = "center";
      ctx.fillText("태어나면서부터", this.halfW, this.halfH - 26);
      ctx.fillText("현명한 이는 없다.", this.halfW, this.halfH + 26);
      ctx.fillStyle = `rgba(8, 8, 15, ${this.fontColor / 2 + this.opacity / 200 - 0.5})`;
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "center";
      ctx.fillText("- Miguel de Cervantes", this.halfW, this.halfH + 60);
    }

     // 텍스트가 생성되는 이벤트가 끝나면 eraser.draw() 이벤트 실행
    if (this.count > 800 && this.isClick > 0) {
      this.eraser.draw(ctx);
      if (this.opacity > 1) {
        this.opacity -= 1;
      }
    };
  } // draw() End --

} // Opening End --


class Eraser {
  constructor() {
    // display 설정
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    // 지우개 역할
    this.line1X = 0;
    this.line1Y = 0;
    this.lineWidth = 0;
    this.lineWidthV = 5;
    this.count = 0;
  }

  resize() {
      this.stageWidth = document.body.clientWidth;
      this.stageHeight = document.body.clientHeight;
  }

  draw(ctx) {
    this.lineWidthV += 1;
    this.lineWidth += this.lineWidthV;
    this.line1X += this.stageWidth / 10;
    this.line1Y += this.stageHeight / 10;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round"
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.moveTo(this.stageWidth , 0);
    ctx.lineTo(this.stageWidth - this.line1X, this.line1Y);
    ctx.stroke();
    ctx.restore();

    this.count += 1;
    if (this.count > 80) {
      document.getElementsByTagName("canvas")[0].remove();
      document.normalize();
      if (document.body.classList.contains("pc")) {
        window.location.href = "main.html";
      }else if (document.body.classList.contains("mobile")) {
        window.location.href = "m_main.html"
      }

    }
  }
}

window.addEventListener("load", (e) => {
  let canvas = new App();
})
