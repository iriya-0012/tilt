class Direction {
    constructor() {
        this.d2r = Math.PI / 180;   // Degree-to-Radian conversion
        this.absolute = true;       // true:相対値 false:絶対値
        this.alpha = 0;     // z軸 0 ～ 360度
        this.beta = 0;      // x軸 -180 ～ 180度
        this.gamma = 0;     // y軸 -90 ～ 90度
        this.x = 0;         // 角度 x -90 ~ 90
        this.y = 0;         // 角度 y -90 ~ 90
        this.time;     // 時間     
        this.sts = false;   // 状態
        this.head;          // 向
        this.degrees;       // 度
        this.direction;     // 方向
    }
    // セット
    set(e) {
        let dt = new Date;
        let HH = ("00" + dt.getHours()).slice(-2);
        let MM = ("00" + dt.getMinutes()).slice(-2);
        let SS = ("00" + dt.getSeconds()).slice(-2);
        this.absolute = e.absolute;
        this.alpha = Math.round(e.alpha,0);
        this.beta = Math.round(e.beta,0);
        this.gamma = Math.round(e.gamma,0);
        this.time = `${HH}:${MM}:${SS}`;
    }
    // 生成
    generate() {
        // alphaを補正
        let _x = this.beta ? this.beta * this.d2r : 0; // beta value
        let _y = this.gamma ? this.gamma * this.d2r : 0; // gamma value
        let _z = this.alpha ? this.alpha * this.d2r : 0; // alpha value
        let cX = Math.cos(_x);
        let cY = Math.cos(_y);
        let cZ = Math.cos(_z);
        let sX = Math.sin(_x);
        let sY = Math.sin(_y);
        let sZ = Math.sin(_z);
        // Vx Vy 計算
        let Vx = -cZ * sY - sZ * sX * cY;
        let Vy = -sZ * sY + cZ * sX * cY;
        // 向
        let Vh = Math.atan(Vx / Vy);
        // 向変換
        if      (Vy < 0) {Vh += Math.PI}
        else if (Vx < 0) {Vh += 2 * Math.PI}
        this.head = Math.round(Vh,6);    
        // 変換
        this.degrees = Math.round(this.head * (180 / Math.PI),1);
        // 方向
        if      (this.degrees < 22.5)  {this.direction = "北"}
        else if (this.degrees < 67.5)  {this.direction = "北東"}
        else if (this.degrees < 112.5) {this.direction = "東"}
        else if (this.degrees < 157.5) {this.direction = "南東"}
        else if (this.degrees < 202.5) {this.direction = "南"}
        else if (this.degrees < 247.5) {this.direction = "南西"}
        else if (this.degrees < 292.5) {this.direction = "西"}
        else if (this.degrees < 337.5) {this.direction = "北西"}
        else                           {this.direction = "北"}        
    }
}
let cDire = new Direction;
