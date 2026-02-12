const config = {
    canvas: document.getElementById('coordinateCanvas'),
    ctx: null,
    xRange: [-10, 10],
    yRange: [-10, 10],
    currentFormula: 'sin(x)'
};

function initCanvas() {
    if (typeof math === 'undefined') {
        alert('math.min.js 加载失败！');
        return;
    }

    config.ctx = config.canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    config.canvas.addEventListener('wheel', handleWheel);
    bindDrawerEvents();
    redrawAll();
}

function resizeCanvas() {
    config.canvas.width = window.innerWidth;
    config.canvas.height = window.innerHeight;
}

function redrawAll() {
    drawCoordinateSystem();
    drawFormulaCurve(config.currentFormula);
}

function drawCoordinateSystem() {
    const { ctx, canvas, xRange, yRange } = config;
    const w = canvas.width;
    const h = canvas.height;
    const xMin = xRange[0], xMax = xRange[1];
    const yMin = yRange[0], yMax = yRange[1];
    const ox = w / 2;
    const oy = h / 2;
    const px = w / (xMax - xMin);
    const py = h / (yMax - yMin);

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        const pxX = ox + x * px;
        ctx.beginPath();
        ctx.moveTo(pxX, 0);
        ctx.lineTo(pxX, h);
        ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
        const pxY = oy - y * py;
        ctx.beginPath();
        ctx.moveTo(0, pxY);
        ctx.lineTo(w, pxY);
        ctx.stroke();
    }

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, oy);
    ctx.lineTo(w, oy);
    ctx.moveTo(ox, 0);
    ctx.lineTo(ox, h);
    ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        if (x === 0) continue;
        const pxX = ox + x * px;
        ctx.fillText(x, pxX - 5, oy + 20);
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
        if (y === 0) continue;
        const pxY = oy - y * py;
        ctx.fillText(y, ox - 25, pxY + 5);
    }
    ctx.fillText('0', ox + 5, oy + 15);
}

// 关键修复：把 x^2 → pow(x,2)，x^3 → pow(x,3)
function convertFormula(f) {
    f = f.replace(/x\^2/g, 'pow(x,2)');
    f = f.replace(/x\^3/g, 'pow(x,3)');
    f = f.replace(/\^/g, '**');
    return f;
}

// 关键修复：绘制逻辑
function drawFormulaCurve(formula) {
    const f = convertFormula(formula);
    if (!f) return;

    const { ctx, canvas, xRange, yRange } = config;
    const w = canvas.width;
    const h = canvas.height;
    const xMin = xRange[0], xMax = xRange[1];
    const yMin = yRange[0], yMax = yRange[1];
    const ox = w / 2;
    const oy = h / 2;
    const px = w / (xMax - xMin);
    const py = h / (yMax - yMin);

    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let first = true;
    const step = (xMax - xMin) / 1000;

    for (let x = xMin; x <= xMax; x += step) {
        try {
            const y = math.evaluate(f, { x });

            if (isNaN(y) || !isFinite(y)) {
                first = true;
                continue;
            }

            const pxX = ox + x * px;
            const pxY = oy - y * py;

            if (first) {
                ctx.moveTo(pxX, pxY);
                first = false;
            } else {
                ctx.lineTo(pxX, pxY);
            }
        } catch (e) {
            first = true;
        }
    }
    ctx.stroke();
}

// 缩放：放大变宽，最小 -10~10
function handleWheel(e) {
    e.preventDefault();
    const factor = 1.2;
    if (e.deltaY < 0) {
        config.xRange = [config.xRange[0] * factor, config.xRange[1] * factor];
        config.yRange = [config.yRange[0] * factor, config.yRange[1] * factor];
    } else {
        const nx0 = config.xRange[0] / factor;
        const nx1 = config.xRange[1] / factor;
        const ny0 = config.yRange[0] / factor;
        const ny1 = config.yRange[1] / factor;

        config.xRange = [Math.max(nx0, -10), Math.min(nx1, 10)];
        config.yRange = [Math.max(ny0, -10), Math.min(ny1, 10)];
    }
    redrawAll();
}

function bindDrawerEvents() {
    const drawer = document.getElementById('drawer');
    const toggleDrawerBtn = document.getElementById('toggleDrawer');
    const showDrawerBtn = document.getElementById('showDrawer');
    const preset = document.getElementById('presetFormula');
    const input = document.getElementById('customFormula');
    const refresh = document.getElementById('refreshBtn');

    toggleDrawerBtn.onclick = () => drawer.classList.add('hidden');
    showDrawerBtn.onclick = () => drawer.classList.remove('hidden');

    preset.onchange = () => {
        const f = preset.value;
        input.value = f;
        config.currentFormula = f;
        redrawAll();
    };

    refresh.onclick = () => {
        const f = input.value.trim();
        if (f) {
            config.currentFormula = f;
            redrawAll();
        }
    };

    input.onkeydown = (e) => {
        if (e.key === 'Enter') refresh.click();
    };
}

window.addEventListener('load', initCanvas);