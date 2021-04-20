class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.opening = new Opening();

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

    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0,0, this.stageWidth, this.stageHeight);
    this.opening.resize(this.ctx)
  } // resize() End

  animate(t) {
    if(document.getElementsByTagName("canvas")[0]){

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

    // 마우스 클릭으로 이벤트 실행
    this.isClick = 0;
    document.addEventListener("click", (e)=>{
      this.isClick += 1;
    })

  } // constructor() End

  resize(ctx){
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.halfW = document.body.clientWidth/2
    this.halfH = document.body.clientHeight/2

    if(this.isClick < 1){ // 클릭한 후 로는 도형의 크기를 고정시켜 오류 발생 방지
      this.radius = Math.min(this.stageWidth, this.stageHeight) / 20 * 9
      this.arc = this.radius / 2
    }

    // line 1
    ctx.save();
    ctx.filter = `opacity(${this.opacity}%)`
    ctx.beginPath();
    ctx.fillStyle = "rgba(199,54,72,0.7)"//"rgba(225,75,67,1)"
    ctx.moveTo(0,this.stageHeight/13*8);
    ctx.lineTo(0,this.stageHeight);
    ctx.lineTo(this.stageWidth,this.stageHeight);
    ctx.lineTo(this.stageWidth,this.stageHeight/13*5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

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
    ctx.lineWidth = 3;
    ctx.lineCap = "round"
    ctx.strokeStyle = "white"

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
    ctx.fillStyle = "white"
    ctx.lineWidth = 1;
    ctx.lineCap = "round"
    ctx.strokeStyle = "black"


    // dashOffset
    ctx.setLineDash([this.radius*4, this.radius]);
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
    if(this.count > 375 && this.isClick > 0){
      if(this.fontColor < 1){this.fontColor += 0.02}
      ctx.beginPath();
      ctx.fillStyle = `rgba(0,0,0,${this.fontColor + this.opacity/100 - 1})`
      ctx.font = "bold 36px Arial"
      ctx.textAlign = "center"
      ctx.fillText("태어나면서부터", this.halfW, this.halfH - 26);
      ctx.fillText("현명한 이는 없다.", this.halfW, this.halfH + 26);
      ctx.fillStyle = `rgba(0,0,0,${this.fontColor/2 + this.opacity/200 - 0.5})`
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
    this.count = 0;

    // 지우개 설정
    this.r = Math.max(this.stageWidth , this.stageHeight) / 5;
    this.r2 = this.r / 2
    this.color = "rgba(0,0,0,1)"

    // 지우개 움직임 설정
    this.speed = this.r / 8;
    this.move1 = 0;
    this.move2 = 0;
    this.move3 = 0;
    this.move4 = 0;
    this.move5 = 0;
    this.move6 = 0;
    this.move7 = 0;
    this.move8 = 0;
    this.move9 = 0;
    this.xy = [[0,0] , [0,0] ,[0,-this.r2] ,[-this.r2,0] ,[0,-this.r2] ,[-this.r2,0] ,[0,-this.r2] ,[-this.r2,0] ,[0,-this.r2] ,[-this.r2,0] ];
  } // constructor() End

  resize(){
    if(this.move1 < 1){
      this.stageWidth = document.body.clientWidth;
      this.stageHeight = document.body.clientHeight;
      this.r = Math.max(this.stageWidth , this.stageHeight) / 5;
      this.r2 = this.r / 2
      this.speed = this.r / 8;
      this.xy = [[0,0] , [0,0] ,[0,-this.r2] ,[-this.r2,0] ,[0,-this.r2] ,[-this.r2,0] ,[0,-this.r2] ,[-this.r2,0] ,[0,-this.r2] ,[-this.r2,0] ];
    }
  } // resize() End

  draw(ctx){
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.lineWidth = this.r;
    ctx.lineCap = "round"
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.r2 , -this.r2);

      //scene1
      ctx.lineTo(this.r2 - this.move1 , -this.r2 + this.move1);
      if(this.move1 <= this.r){this.move1 += this.speed;}

      //scene2
      if(this.r2 - this.move1 < -this.r2){ // x값이 먼저 0보다 작아지면
        this.move1 -= this.speed;
        ctx.lineTo(-this.r2 , this.r2 + this.r)
        ctx.lineTo(-this.r2 + this.move2 , this.r2 + this.r - this.move2)
        this.xy[2] = [-this.r2 + this.move2 , this.r2 + this.r - this.move2]
        this.move2 += this.speed;
      }else if(-this.r2 + this.move1 > this.stageHeight + this.r2){ // y값이 먼저 stageHeight보다 커지면
        this.move1 -= this.speed;
        ctx.lineTo(this.r2 - this.move1 + this.r, this.stageHeight + this.r2)
        ctx.lineTo(this.r2 - this.move1 + this.r + this.move2, this.stageHeight + this.r2 - this.move2)
        this.xy[2] = [this.r2 - this.move1 + this.r + this.move2, this.stageHeight + this.r2 - this.move2]
        this.move2 += this.speed;
      }

      //scene3
        if(this.xy[2][0] > this.stageWidth + this.r2){ // x값이 먼저 stageWidth보다 커지면
          this.move2 -= this.speed;
          ctx.lineTo(this.xy[2][0] , this.xy[2][1] + this.r);
          ctx.lineTo(this.xy[2][0] - this.move3 , this.xy[2][1] + this.r + this.move3);
          this.xy[3] = [this.xy[2][0] - this.move3 , this.xy[2][1] + this.r + this.move3]
          this.move3 += this.speed;
        }else if(this.xy[2][1] < -this.r2){ // y값이 먼저 0보다 작아지면
          this.move2 -= this.speed;
          ctx.lineTo(this.xy[2][0] + this.r , this.xy[2][1]);
          ctx.lineTo(this.xy[2][0] + this.r - this.move3 , this.xy[2][1] + this.move3);
          this.xy[3] = [this.xy[2][0] + this.r - this.move3 , this.xy[2][1] + this.move3]
          this.move3 += this.speed;
        }

      // scene4
      if(this.xy[3][0] < -this.r2){ // x값이 먼저 0보다 작아지면
        this.move3 -= this.speed;
        ctx.lineTo(this.xy[3][0] , this.xy[3][1] + this.r);
        ctx.lineTo(this.xy[3][0] + this.move4 , this.xy[3][1] + this.r - this.move4);
        this.xy[4] = [this.xy[3][0] + this.move4 , this.xy[3][1] + this.r - this.move4];
        this.move4 += this.speed;
      }else if(this.xy[3][1] > this.stageHeight + this.r2){ // y값이 먼저 stageHeight 보다 커지면
        this.move3 -= this.speed;
        ctx.lineTo(this.xy[3][0] + this.r , this.xy[3][1]);
        ctx.lineTo(this.xy[3][0] + this.r + this.move4 , this.xy[3][1] - this.move4);
        this.xy[4] = [this.xy[3][0] + this.r + this.move4 , this.xy[3][1] - this.move4];
        this.move4 += this.speed;
      }

      // scene5
      if(this.xy[4][0] > this.stageWidth + this.r2){ // x값이 먼저 stageWidth 보다 커지면
        this.move4 -= this.speed;
        ctx.lineTo(this.xy[4][0] , this.xy[4][1] + this.r);
        ctx.lineTo(this.xy[4][0] - this.move5 , this.xy[4][1] + this.r + this.move5);
        this.xy[5] = [this.xy[4][0] - this.move5 , this.xy[4][1] + this.r + this.move5];
        this.move5 += this.speed;
      }else if(this.xy[4][1] < -this.r2){ // y값이 먼저 0보다 작아지면
        this.move4 -= this.speed;
        ctx.lineTo(this.xy[4][0] + this.r , this.xy[4][1]);
        ctx.lineTo(this.xy[4][0] + this.r - this.move5 , this.xy[4][1] + this.move5);
        this.xy[5] = [this.xy[4][0] + this.r - this.move5 , this.xy[4][1] + this.move5];
        this.move5 += this.speed;
      }

      // scene6
      if(this.xy[5][0] < -this.r2){ // x값이 먼저 0보다 작아지면
        this.move5 -= this.speed;
        ctx.lineTo(this.xy[5][0] , this.xy[5][1] + this.r);
        ctx.lineTo(this.xy[5][0] + this.move6 , this.xy[5][1] + this.r - this.move6);
        this.xy[6] = [this.xy[5][0] + this.move6 , this.xy[5][1] + this.r - this.move6];
        this.move6 += this.speed;
      }else if(this.xy[5][1] > this.stageHeight + this.r2){ // y값이 먼저 stageHeight 보다 커지면
        this.move5 -= this.speed;
        ctx.lineTo(this.xy[5][0] + this.r , this.xy[5][1]);
        ctx.lineTo(this.xy[5][0] + this.r + this.move6 , this.xy[5][1] - this.move6);
        this.xy[6] = [this.xy[5][0] + this.r + this.move6 , this.xy[5][1] - this.move6];
        this.move6 += this.speed;
      }

      // scene7
      if(this.xy[6][0] > this.stageWidth + this.r2){ // x값이 먼저 stageWidth 보다 커지면
        this.move6 -= this.speed;
        ctx.lineTo(this.xy[6][0] , this.xy[6][1] + this.r);
        ctx.lineTo(this.xy[6][0] - this.move7 , this.xy[6][1] + this.r + this.move7);
        this.xy[7] = [this.xy[6][0] - this.move7 , this.xy[6][1] + this.r + this.move7];
        this.move7 += this.speed;
      }else if(this.xy[6][1] < -this.r2){ // y값이 먼저 0보다 작아지면
        this.move6 -= this.speed;
        ctx.lineTo(this.xy[6][0] + this.r , this.xy[6][1]);
        ctx.lineTo(this.xy[6][0] + this.r - this.move7 , this.xy[6][1] + this.move7);
        this.xy[5] = [this.xy[6][0] + this.r - this.move7 , this.xy[6][1] + this.move7];
        this.move7 += this.speed;
      }

      // scene8
      if(this.xy[7][0] < -this.r2){ // x값이 먼저 0보다 작아지면
        this.move7 -= this.speed;
        ctx.lineTo(this.xy[7][0] , this.xy[7][1] + this.r);
        ctx.lineTo(this.xy[7][0] + this.move8 , this.xy[7][1] + this.r - this.move8);
        this.xy[8] = [this.xy[7][0] + this.move8 , this.xy[7][1] + this.r - this.move8];
        this.move8 += this.speed;
      }else if(this.xy[7][1] > this.stageHeight + this.r2){ // y값이 먼저 stageHeight 보다 커지면
        this.move7 -= this.speed;
        ctx.lineTo(this.xy[7][0] + this.r , this.xy[7][1]);
        ctx.lineTo(this.xy[7][0] + this.r + this.move8 , this.xy[7][1] - this.move8);
        this.xy[8] = [this.xy[7][0] + this.r + this.move8 , this.xy[7][1] - this.move8];
        this.move8 += this.speed;
      }

      // scene9
      if(this.xy[8][0] > this.stageWidth + this.r2){ // x값이 먼저 stageWidth 보다 커지면
        this.move8 -= this.speed;
        ctx.lineTo(this.xy[8][0] , this.xy[8][1] + this.r);
        ctx.lineTo(this.xy[8][0] - this.move9 , this.xy[8][1] + this.r + this.move9);
        this.xy[9] = [this.xy[8][0] - this.move9 , this.xy[8][1] + this.r + this.move9];
        this.move9 += this.speed;
      }else if(this.xy[8][1] < -this.r2){ // y값이 먼저 0보다 작아지면
        this.move8 -= this.speed;
        ctx.lineTo(this.xy[8][0] + this.r , this.xy[8][1]);
        ctx.lineTo(this.xy[8][0] + this.r - this.move9 , this.xy[8][1] + this.move9);
        this.xy[9] = [this.xy[8][0] + this.r - this.move9 , this.xy[8][1] + this.move9];
        this.move9 += this.speed;
      }
      ctx.stroke();
      ctx.restore();
      if(this.move9 > 0){
        this.count += 1;
      }

    if(this.count > 10){
      document.getElementsByTagName("canvas")[0].remove();
      document.normalize();
    }
  }
}

window.addEventListener("load", (e) => {
  let canvas = new App();

})
