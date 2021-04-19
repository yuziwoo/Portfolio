class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.opening = new Opening();

    window.addEventListener("resize" , this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 4;
    this.canvas.height = this.stageHeight * 4;
    this.ctx.scale(4,4);

    this.opening.resize(this.stageWidth,this.stageHeight)
  }

  animate(t) {
    if(document.getElementsByTagName("canvas")[0]){
      this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight);

      this.opening.draw(this.ctx)

      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

class Opening{
  constructor(){
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.radius = Math.min(this.stageWidth, this.stageHeight) / 20 * 9
    this.arc = this.radius / 2
    this.dashOffset = 0;
    this.change = 0;
    this.changeV = 5;
    this.fontColor = 0;
    this.isClick = 0;
    this.count = 0;
    this.opacity = 100;

    document.addEventListener("click", (e)=>{
      this.isClick += 1;
    })

  }
  resize(stageWidth, stageHeight){
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.radius = Math.min(this.stageWidth, this.stageHeight) / 20 * 9
    this.arc = this.radius / 2
  }
  draw(ctx){
    this.dashOffset += 3;

    if(this.isClick > 0){this.count += 3}

    if(this.count > 80 && this.isClick > 0){
      if(this.change < this.radius - this.changeV){
        this.changeV += 0.3;
        this.change += this.changeV;
        this.dashOffset += 1;
      }
      this.dashOffset -= 1;
    }


    ctx.beginPath();
    ctx.save();

    ctx.filter = `opacity(${this.opacity}%)`
    ctx.lineWidth = 3;
    ctx.lineCap = "round"
    ctx.strokeStyle = "black"
    ctx.setLineDash([this.radius*4, this.radius]);
    ctx.lineDashOffset = this.dashOffset;
    ctx.moveTo(this.stageWidth/2 + this.radius,this.stageHeight/2);
    ctx.arcTo(this.stageWidth/2 + this.radius, this.stageHeight/2 + this.radius, this.stageWidth/2 + this.change,this.stageHeight/2 + this.radius, this.radius - this.change);
    ctx.lineTo(this.stageWidth/2,this.stageHeight/2 + this.radius);
    ctx.arcTo(this.stageWidth/2 - this.radius, this.stageHeight/2 + this.radius, this.stageWidth/2 - this.radius, this.stageHeight/2 + this.change, this.radius - this.change);
    ctx.lineTo(this.stageWidth/2 - this.radius, this.stageHeight/2);
    ctx.arcTo(this.stageWidth/2 - this.radius, this.stageHeight/2 - this.radius, this.stageWidth/2 - this.change, this.stageHeight/2 - this.radius, this.radius - this.change);
    ctx.lineTo(this.stageWidth/2, this.stageHeight/2 - this.radius);
    ctx.arcTo(this.stageWidth/2 + this.radius, this.stageHeight/2 - this.radius, this.stageWidth/2 + this.radius, this.stageHeight/2 - this.change, this.radius - this.change);
    ctx.lineTo(this.stageWidth/2 + this.radius, this.stageHeight/2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    if(this.count > 375 && this.isClick > 0){
      if(this.fontColor < 1){this.fontColor += 0.03}
      ctx.beginPath();
      ctx.fillStyle = `rgba(0,0,0,${this.fontColor + this.opacity/100 - 1})`
      ctx.font = "bold 36px Arial"
      ctx.textAlign = "center"
      ctx.fillText("기본에 충실하되", this.stageWidth/2, this.stageHeight/2 - 26);
      ctx.fillText("세상은 널리보자", this.stageWidth/2, this.stageHeight/2 + 26);

      if(this.count > 600){
        if(this.opacity > 1){this.opacity -= 1;}
      };

      if(this.opacity <= 1){
        document.getElementsByTagName("canvas")[0].remove();
        document.normalize();
      }
    }


/*
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "skyblue"
    ctx.setLineDash([this.radius*3, this.radius]);
    ctx.lineDashOffset = this.dashOffset;
    ctx.moveTo(this.stageWidth/2 + this.radius,this.stageHeight/2);
    ctx.arcTo(this.stageWidth/2 + this.radius, this.stageHeight/2 + this.radius, this.stageWidth/2,this.stageHeight/2 + this.radius, this.radius);
    ctx.lineTo(this.stageWidth/2,this.stageHeight/2 + this.radius);
    ctx.arcTo(this.stageWidth/2 - this.radius, this.stageHeight/2 + this.radius, this.stageWidth/2 - this.radius, this.stageHeight/2, this.radius);
    ctx.lineTo(this.stageWidth/2 - this.radius, this.stageHeight/2);
    ctx.arcTo(this.stageWidth/2 - this.radius, this.stageHeight/2 - this.radius, this.stageWidth/2, this.stageHeight/2 - this.radius, this.radius);
    ctx.lineTo(this.stageWidth/2, this.stageHeight/2 - this.radius);
    ctx.arcTo(this.stageWidth/2 + this.radius, this.stageHeight/2 - this.radius, this.stageWidth/2 + this.radius, this.stageHeight/2, this.radius);
    ctx.lineTo(this.stageWidth/2 + this.radius, this.stageHeight/2);
    ctx.stroke();*/
  }
}

window.addEventListener("load", (e) => {
  let canvas = new App();

})
