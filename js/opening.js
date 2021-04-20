class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.opening = new Opening();

    this.count = 0;

    window.addEventListener("resize" , this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  } // constructor() End

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 4;
    this.canvas.height = this.stageHeight * 4;
    this.ctx.scale(4,4);

    this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight);
    this.ctx.fillStyle = "rgba(8,8,15,1)"
    this.ctx.fillRect(0,0,this.stageWidth,this.stageHeight)


    this.opening.resize(this.ctx)
  } // resize() End

  animate(t) {
    if(document.getElementsByTagName("canvas")[0]){
      this.ctx.fillStyle = "rgba(8,8,15,0.1)"
      this.ctx.fillRect(0,0,this.stageWidth,this.stageHeight)

    this.opening.draw(this.ctx)

      requestAnimationFrame(this.animate.bind(this));
    }
  }// animate() End
}// App End

class Opening {
  constructor(){
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.halfW = document.body.clientWidth/2
    this.halfH = document.body.clientHeight/2
    this.eraser = new Eraser();

    // 내부 도형 설정
    this.radius = Math.min(this.stageWidth, this.stageHeight) / 20 * 9
    this.arc = this.radius / 2
    this.dashOffset = 0;

    // 도형의 변환을 위한 설정
    this.change = 0;
    this.changeV = 5;

    // 시간차에 따른 Scene의 변환을 주기위한 변수
    this.count = 0;
    this.opacity = 100;
    this.fontColor = 0;
    this.textDecoration = 0;
    this.textDecorationV = 15;

    // 마우스 클릭으로 이벤트 실행
    this.isClick = 0;
    document.addEventListener("click", (e)=>{
      this.isClick += 1;
    })

    // 마우스 hover로 text effect
    this.isHover = 0.8;
    document.addEventListener("mousemove", (e)=>{
      if(e.clientX > this.halfW - 125 &&
        e.clientX < this.halfW + 125 &&
        e.clientY > this.halfH - 32 &&
        e.clientY < this.halfH ){
          this.isHover = 1;
        }else { this.isHover = 0.8}
    });

  } // constructor() End

  resize(ctx){
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.halfW = document.body.clientWidth/2
    this.halfH = document.body.clientHeight/2
    this.gold1 = this.stageHeight/8*5
    this.gold2 = this.stageHeight/8*5/8*5
    this.gold3 = this.stageHeight/8*5/8*5/8*5
    this.frameGap = (Math.min(this.stageWidth, this.stageHeight) / 20 - 1)/2

    if(this.isClick < 1){ // 클릭한 후 로는 도형의 크기를 고정시켜 오류 발생 방지
      this.radius = Math.min(this.stageWidth, this.stageHeight) / 20 * 9
      this.arc = this.radius / 2
    }

    this.eraser.resize();
  } // resize() End

  draw(ctx){
    this.dashOffset += 3; // 도형의 dashOffset 이 바뀜에 따라 움직이는 듯한 모션
    if(this.isClick > 0){this.count += 3} // 마우스 클릭시 이벤트 시작
    if(this.count > 80 && this.isClick > 0){ // count가 80이 넘으면 도형의 변환 이벤트 시작
      if(this.change < this.radius - this.changeV){
        this.changeV += 0.3; // 가속도 증가
        this.change += this.changeV;
        this.dashOffset += 1; // 가속도에 따라 dashOffset 속도도 증가시키기
      }
      this.dashOffset -= 1; // 도형 변환이 종료된 후에는 늘렸던 dashOffset 감소
    }

    // 원 그리기
    ctx.beginPath();
    ctx.save();
    ctx.filter = `opacity(${this.opacity}%)`
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round"
    ctx.strokeStyle = "rgba(8,8,15,1)"

    // 도형 생성
    ctx.moveTo(this.halfW + this.radius,this.halfH);
    ctx.arcTo(this.halfW + this.radius, this.halfH + this.radius, this.halfW + this.change, this.halfH + this.radius, this.radius - this.change);
    ctx.lineTo(this.halfW , this.halfH + this.radius);
    ctx.arcTo(this.halfW - this.radius, this.halfH + this.radius, this.halfW - this.radius, this.halfH + this.change, this.radius - this.change);
    ctx.lineTo(this.halfW - this.radius, this.halfH);
    ctx.arcTo(this.halfW - this.radius, this.halfH - this.radius, this.halfW - this.change, this.halfH - this.radius, this.radius - this.change);
    ctx.lineTo(this.halfW, this.halfH - this.radius);
    ctx.arcTo(this.halfW + this.radius, this.halfH - this.radius, this.halfW + this.radius, this.halfH - this.change, this.radius - this.change);
    ctx.lineTo(this.halfW + this.radius, this.halfH);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // 원 그리기 2
    ctx.beginPath();
    ctx.save();
    ctx.filter = `opacity(${this.opacity}%)`
    ctx.fillStyle = "rgba(8,8,15,1)"
    ctx.lineWidth = 2;
    ctx.lineCap = "round"
    ctx.strokeStyle = "rgba(255,255,255,1)"


    // dashOffset
    ctx.setLineDash([this.radius*3, this.radius]);
    ctx.lineDashOffset = this.dashOffset;

    // 도형 생성
    ctx.moveTo(this.halfW + this.radius,this.halfH);
    ctx.arcTo(this.halfW + this.radius, this.halfH + this.radius, this.halfW + this.change, this.halfH + this.radius, this.radius - this.change);
    ctx.lineTo(this.halfW , this.halfH + this.radius);
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
    if(this.count < 300){
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${this.isHover})`
      ctx.font = "bold 36px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Click for Enter", this.halfW, this.halfH);

      if(this.isClick > 0){
        if(this.textDecoration < 250){
          this.textDecoration += this.textDecorationV;
          if(this.textDecorationV > 1){
            this.textDecorationV -= 0.55;
          }
          }
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.moveTo(this.halfW - 125,this.halfH - 8);
        ctx.lineTo(this.halfW - 125 + this.textDecoration , this.halfH - 8);
        ctx.stroke();
      }
    }


    // 텍스트 생성 2
    if(this.count > 375 && this.isClick > 0){
      if(this.fontColor < 1){
        this.fontColor += 0.02
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba( 255,255,255,${this.fontColor + this.opacity/100 - 1})`
      ctx.font = "bold 36px Arial"
      ctx.textAlign = "center"
      ctx.fillText("태어나면서부터", this.halfW, this.halfH - 26);
      ctx.fillText("현명한 이는 없다.", this.halfW, this.halfH + 26);
      ctx.fillStyle = `rgba( 255,255,255,${this.fontColor/2 + this.opacity/200 - 0.5})`
      ctx.font = "bold 18px Arial"
      ctx.textAlign = "center"
      ctx.fillText("- Miguel de Cervantes", this.halfW, this.halfH + 60);

    }

     // 텍스트까지 생성되는 이벤트가 끝나면 지우게 이벤트 실행
    if(this.count > 800 && this.isClick > 0){
      this.eraser.draw(ctx);
      if(this.opacity > 1){this.opacity -= 1;}
    };
  } // draw() End
} // Opening 객체 종료


class Eraser {
  constructor(){
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.line1X = 0;
    this.line1Y = 0;
    this.lineWidth = 0;
    this.lineWidthV = 5;

    this.count = 0;

  } // constructor() End

  resize(){
    if(this.move1 < 1){
      this.stageWidth = document.body.clientWidth;
      this.stageHeight = document.body.clientHeight;
    }
  } // resize() End

  draw(ctx){
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    this.lineWidthV += 1
    this.lineWidth += this.lineWidthV
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round"
    ctx.strokeStyle = "egba(255,255,255,1)";
    ctx.moveTo(this.stageWidth , 0);
    this.line1X += this.stageWidth / 10;
    this.line1Y += this.stageHeight / 10;
    ctx.lineTo(this.stageWidth - this.line1X , this.line1Y);
    ctx.stroke();
    ctx.restore();

    this.count += 1;
    if(this.count > 80){
      document.getElementsByTagName("canvas")[0].remove();
      document.normalize();
      window.location.href = "main.html"
    }
  }
}

window.addEventListener("load", (e) => {
  let canvas = new App();

})
