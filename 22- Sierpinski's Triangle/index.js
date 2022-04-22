const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const scale = 7;
const Vector = (x, y) => ({ x: x * scale, y: y * scale });

const drawTriangle = (p1, p2, p3) => {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
};

const drawCircle = (vect, color = "white") => {
    ctx.beginPath();
    ctx.arc(vect.x, vect.y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
};

const pickMiddlePoint = (p1, p2, p3) => {
    return { x: (p1.x + p2.x + p3.x) / 3, y: (p1.y + p2.y + p3.y) / 3 };
};

const getMidPoint = (vect1, vect2) => {
    return { x: (vect1.x + vect2.x) / 2, y: (vect1.y + vect2.y) / 2 };
};

// points
const p1 = Vector(50, 50);
const p2 = Vector(100, 50);
const p3 = Vector(75, 10);

drawTriangle(p1, p2, p3);

const initPoint = pickMiddlePoint(p1, p2, p3);
drawCircle(initPoint);

let currentCoords = Object.assign({}, initPoint);
let pointCounts = 1;

const render = () => {
    if (pointCounts <= 20_000) {
        for (let i = 0; i < 2; i++) {
            const number = Math.floor(Math.random() * 3);

            if (number === 0) {
                currentCoords = getMidPoint(p1, currentCoords);
            } else if (number === 1) {
                currentCoords = getMidPoint(p2, currentCoords);
            } else {
                currentCoords = getMidPoint(p3, currentCoords);
                
            }
            pointCounts++;
            drawCircle(currentCoords);
            requestAnimationFrame(render);
        }
    }
};

requestAnimationFrame(render);
