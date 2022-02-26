class Tilt {
    constructor() {
        this.absolute = true;   // true:相対値 false:絶対値
        this.alpha = 0;     // z軸 0 ～ 360度
        this.beta = 0;      // x軸 -180 ～ 180度
        this.gamma = 0;     // y軸 -90 ～ 90度
        this.x = 0;         // 角度 x -90 ~ 90
        this.y = 0;         // 角度 y -90 ~ 90
        this.time = "hh:mm:ss";     // 時間
        this.sts = false;   // 状態
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
        this.x = Math.max(-90,Math.min(this.beta,90));  //角度を -90 ~ 90 に制限
        this.y = Math.max(-90,Math.min(this.gamma,90));  //角度を -90 ~ 90 に制限
        this.time = `${HH}:${MM}:${SS}`;
    }
}
let cTilt = new Tilt;
