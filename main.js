const CON_MAIN = document.getElementById("canvas_main").getContext("2d");
const CON_SUB = document.getElementById("canvas_sub").getContext("2d");
const FONT_CHAR = "20px 'UD デジタル 教科書体 NP-B'";
// start
document.getElementById("but_start").addEventListener("click",() => {
    // ジャイロスコープと地磁気センサー開始
    if (!stsDire) {
        window.addEventListener("deviceorientationabsolute",set_dire);
        stsDire = true;
        }
    // 加速度センサー開始
    if (!stsTilt) {
        window.addEventListener("deviceorientation",set_tilt);
        stsTilt = true;    
        }
    timerId = setInterval(get_data,100); // 0.1秒間隔
});
// stop
document.getElementById("but_stop").addEventListener("click",() => {
    // ジャイロスコープと地磁気センサー停止
    if (stsDire) {
        window.removeEventListener("deviceorientationabsolute",set_dire);
        stsDire = false;
        }
    // 加速度センサー開始
    if (stsTilt) {
        window.removeEventListener("deviceorientation",set_tilt);
        stsTilt = false;
        }
    clearInterval(timerId);
});
// ロード時
window.onload = () => {
    canvas_main.height = 240;
    canvas_main.width  = 240;
    canvas_sub.height  = 240;
    canvas_sub.width   = 240;
    for (let i = 9; i > 0; i--) {con_arc(CON_MAIN,120,120,i*10,"green")}
}
// set
function set_dire(e) {cDire.set(e)}
function set_tilt(e) {cTilt.set(e)}
// 丸
function con_arc(con,x,y,radius,color) {
    con.beginPath();
    con.fillStyle = "white";
    con.strokeStyle = color;
    con.lineWidth = 1;
    con.arc(x,y,radius,0,Math.PI*2,true);
    con.fill();
    con.stroke(); 
}
// センサー取得
function get_data() {
    let dt = new Date;
    let HH = ("00" + dt.getHours()).slice(-2);
    let MM = ("00" + dt.getMinutes()).slice(-2);
    let SS = ("00" + dt.getSeconds()).slice(-2);
    span_a.innerHTML = `${HH}:${MM}:${SS}`;
    // Direction
    cDire.generate();
    tbody.rows[0].cells[1].innerHTML = cDire.time;
    tbody.rows[1].cells[1].innerHTML = cDire.absolute;
    tbody.rows[2].cells[1].innerHTML = cDire.alpha;
    tbody.rows[3].cells[1].innerHTML = cDire.beta;
    tbody.rows[4].cells[1].innerHTML = cDire.gamma;
    tbody.rows[5].cells[1].innerHTML = cDire.x;
    tbody.rows[6].cells[1].innerHTML = cDire.y;
    tbody.rows[7].cells[1].innerHTML = cDire.head;
    tbody.rows[8].cells[1].innerHTML = cDire.degrees;
    tbody.rows[9].cells[1].innerHTML = cDire.direction;
    // Tilt
    tbody.rows[0].cells[2].innerHTML = cTilt.time;
    tbody.rows[1].cells[2].innerHTML = cTilt.absolute;
    tbody.rows[2].cells[2].innerHTML = cTilt.alpha;
    tbody.rows[3].cells[2].innerHTML = cTilt.beta;
    tbody.rows[4].cells[2].innerHTML = cTilt.gamma;
    tbody.rows[5].cells[2].innerHTML = cTilt.x;
    tbody.rows[6].cells[2].innerHTML = cTilt.y;
    // canvas
    CON_SUB.clearRect(0,0,canvas_sub.width,canvas_sub.height);
    con_arc(CON_SUB,120 - cTilt.beta,120 - cTilt.gamma,2,"red");
}
// 開始
let timerId;    // タイマーid
let stsTilt = false;
let stsDire = false;
