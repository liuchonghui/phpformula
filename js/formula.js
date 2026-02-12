const config = {
    canvas: document.getElementById('coordinateCanvas'),
    ctx: null,
    xRange: [-10, 10],
    yRange: [-10, 10],
    currentFormula: 'sin(x)',
    // 函数说明配置
    formulaInfos: {
        'sin(x)': '正弦函数 y=sin(x)\n• 定义域：全体实数 R\n• 值域：[-1, 1]\n• 奇偶性：奇函数\n• 周期：2π\n• 单调性：在[-π/2+2kπ, π/2+2kπ]递增，在[π/2+2kπ, 3π/2+2kπ]递减',
        'cos(x)': '余弦函数 y=cos(x)\n• 定义域：全体实数 R\n• 值域：[-1, 1]\n• 奇偶性：偶函数\n• 周期：2π\n• 单调性：在[2kπ, π+2kπ]递减，在[π+2kπ, 2π+2kπ]递增',
        'tan(x)': '正切函数 y=tan(x)\n• 定义域：{x | x ≠ π/2 + kπ, k∈Z}\n• 值域：全体实数 R\n• 奇偶性：奇函数\n• 周期：π\n• 单调性：在(-π/2+kπ, π/2+kπ)内单调递增',
        '1/tan(x)': '余切函数 y=ctan(x)（cot(x)）\n• 定义域：{x | x ≠ kπ, k∈Z}\n• 值域：全体实数 R\n• 奇偶性：奇函数\n• 周期：π\n• 单调性：在(kπ, π+kπ)内单调递减',
        'asin(x)': '反正弦函数 y=asin(x)\n• 定义域：[-1, 1]\n• 值域：[-π/2, π/2]\n• 奇偶性：奇函数\n• 单调性：在[-1, 1]上单调递增',
        'acos(x)': '反余弦函数 y=acos(x)\n• 定义域：[-1, 1]\n• 值域：[0, π]\n• 奇偶性：非奇非偶\n• 单调性：在[-1, 1]上单调递减',
        'atan(x)': '反正切函数 y=atan(x)\n• 定义域：全体实数 R\n• 值域：(-π/2, π/2)\n• 奇偶性：奇函数\n• 单调性：在R上单调递增',
        'sinh(x)': '双曲正弦函数 y=sinh(x)\n• 定义域：全体实数 R\n• 值域：全体实数 R\n• 奇偶性：奇函数\n• 单调性：在R上单调递增',
        'cosh(x)': '双曲余弦函数 y=cosh(x)\n• 定义域：全体实数 R\n• 值域：[1, +∞)\n• 奇偶性：偶函数\n• 单调性：在(-∞,0)递减，在(0,+∞)递增',
        'tanh(x)': '双曲正切函数 y=tanh(x)\n• 定义域：全体实数 R\n• 值域：(-1, 1)\n• 奇偶性：奇函数\n• 单调性：在R上单调递增',
        'ln(x)': '自然对数函数 y=ln(x)\n• 定义域：(0, +∞)\n• 值域：全体实数 R\n• 奇偶性：非奇非偶\n• 单调性：在(0,+∞)上单调递增',
        'exp(x)': '指数函数 y=e^x\n• 定义域：全体实数 R\n• 值域：(0, +∞)\n• 奇偶性：非奇非偶\n• 单调性：在R上单调递增',
        'x^2': '二次函数 y=x²\n• 定义域：全体实数 R\n• 值域：[0, +∞)\n• 奇偶性：偶函数\n• 单调性：在(-∞,0)递减，在(0,+∞)递增',
        'x^3': '三次函数 y=x³\n• 定义域：全体实数 R\n• 值域：全体实数 R\n• 奇偶性：奇函数\n• 单调性：在R上单调递增',
        'x^4': '四次函数 y=x⁴\n• 定义域：全体实数 R\n• 值域：[0, +∞)\n• 奇偶性：偶函数\n• 单调性：在(-∞,0)递减，在(0,+∞)递增',
        'sqrt(x)': '平方根函数 y=√x\n• 定义域：[0, +∞)\n• 值域：[0, +∞)\n• 奇偶性：非奇非偶\n• 单调性：在[0,+∞)上单调递增',
        'x^(1/3)': '立方根函数 y=x^(1/3)\n• 定义域：全体实数 R\n• 值域：全体实数 R\n• 奇偶性：奇函数\n• 单调性：在R上单调递增',
        '1/x': '反比例函数 y=1/x\n• 定义域：{x | x ≠ 0}\n• 值域：{y | y ≠ 0}\n• 奇偶性：奇函数\n• 单调性：在(-∞,0)和(0,+∞)上分别递减',
        '2*x+1': '线性函数 y=2x+1\n• 定义域：全体实数 R\n• 值域：全体实数 R\n• 奇偶性：非奇非偶\n• 单调性：在R上单调递增\n• 斜率：2，截距：1'
    },
    // 缩放范围配置
    maxZoomRange: {
        pc: { x: [-1000, 1000], y: [-1000, 1000] },
        mobile: { x: [-100, 100], y: [-100, 100] }
    },
    minZoomRange: { x: [-10, 10], y: [-10, 10] },
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
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
    bindZoomBtnEvents(); 
    bindInfoCardEvents();
    bindTooltipEvents(); // 恢复坐标提示绑定
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

    // 绘制网格
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

    // 绘制坐标轴
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, oy);
    ctx.lineTo(w, oy);
    ctx.moveTo(ox, 0);
    ctx.lineTo(ox, h);
    ctx.stroke();

    // 绘制刻度
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

function convertFormula(f) {
    if (!f) return '';
    
    f = f.replace(/x\^2/g, 'pow(x,2)');
    f = f.replace(/x\^3/g, 'pow(x,3)');
    f = f.replace(/x\^4/g, 'pow(x,4)');
    f = f.replace(/x\^0.5/g, 'sqrt(x)');
    f = f.replace(/x\^\(1\/3\)/g, 'pow(x,1/3)');
    
    f = f.replace(/√x/g, 'sqrt(x)');
    f = f.replace(/e\^x/g, 'exp(x)');
    f = f.replace(/ln\(/g, 'log(');
    f = f.replace(/ctan\(/g, '1/tan(');
    f = f.replace(/cot\(/g, '1/tan(');
    
    f = f.replace(/\^/g, '**');
    
    return f;
}

// 修复tan曲线竖线问题
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
    const step = (xMax - xMin) / 2000;
    const PI = Math.PI;

    for (let x = xMin; x <= xMax; x += step) {
        try {
            // 过滤tan定义域外的点
            if (formula.includes('tan(x)')) {
                const modX = x % PI;
                if (Math.abs(modX - PI/2) < 0.01 || Math.abs(modX + PI/2) < 0.01) {
                    first = true;
                    continue;
                }
            }

            const y = math.evaluate(f, { x });

            if (isNaN(y) || !isFinite(y) || y < yMin - 1 || y > yMax + 1) {
                first = true;
                continue;
            }

            const pxX = ox + x * px;
            const pxY = oy - y * py;

            if (pxX < 0 || pxX > w || pxY < 0 || pxY > h) {
                first = true;
                continue;
            }

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

// 缩放逻辑（区分PC/移动端范围）
function handleWheel(e) {
    e.preventDefault();
    const factor = 1.2;
    const maxRange = config.isMobile ? config.maxZoomRange.mobile : config.maxZoomRange.pc;
    const minRange = config.minZoomRange;

    if (e.deltaY < 0) {
        // 放大：不小于最小范围
        const nx0 = config.xRange[0] / factor;
        const nx1 = config.xRange[1] / factor;
        const ny0 = config.yRange[0] / factor;
        const ny1 = config.yRange[1] / factor;

        config.xRange = [Math.max(nx0, minRange.x[0]), Math.min(nx1, minRange.x[1])];
        config.yRange = [Math.max(ny0, minRange.y[0]), Math.min(ny1, minRange.y[1])];
    } else {
        // 缩小：不超过最大范围
        const nx0 = config.xRange[0] * factor;
        const nx1 = config.xRange[1] * factor;
        const ny0 = config.yRange[0] * factor;
        const ny1 = config.yRange[1] * factor;

        config.xRange = [Math.max(nx0, maxRange.x[0]), Math.min(nx1, maxRange.x[1])];
        config.yRange = [Math.max(ny0, maxRange.y[0]), Math.min(ny1, maxRange.y[1])];
    }
    redrawAll();
}

// 绑定缩放按钮事件（右下角按钮）
function bindZoomBtnEvents() {
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const maxRange = config.isMobile ? config.maxZoomRange.mobile : config.maxZoomRange.pc;
    const minRange = config.minZoomRange;
    const factor = 1.2;

    // 放大按钮
    zoomInBtn.onclick = () => {
        const nx0 = config.xRange[0] / factor;
        const nx1 = config.xRange[1] / factor;
        const ny0 = config.yRange[0] / factor;
        const ny1 = config.yRange[1] / factor;

        config.xRange = [Math.max(nx0, minRange.x[0]), Math.min(nx1, minRange.x[1])];
        config.yRange = [Math.max(ny0, minRange.y[0]), Math.min(ny1, minRange.y[1])];
        redrawAll();
    };

    // 缩小按钮
    zoomOutBtn.onclick = () => {
        const nx0 = config.xRange[0] * factor;
        const nx1 = config.xRange[1] * factor;
        const ny0 = config.yRange[0] * factor;
        const ny1 = config.yRange[1] * factor;

        config.xRange = [Math.max(nx0, maxRange.x[0]), Math.min(nx1, maxRange.x[1])];
        config.yRange = [Math.max(ny0, maxRange.y[0]), Math.min(ny1, maxRange.y[1])];
        redrawAll();
    };
}

// 绑定抽屉事件
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
        updateFormulaInfo(f); // 更新卡片内容
        redrawAll();
    };

    refresh.onclick = () => {
        const f = input.value.trim();
        if (f) {
            config.currentFormula = f;
            // 自定义公式更新卡片提示
            document.getElementById('formulaInfoContent').innerHTML = '自定义公式暂无详细说明';
            redrawAll();
        }
    };

    input.onkeydown = (e) => {
        if (e.key === 'Enter') refresh.click();
    };

    // 初始化默认公式说明
    updateFormulaInfo(config.currentFormula);
}

// 绑定函数说明卡片事件
function bindInfoCardEvents() {
    const closeBtn = document.getElementById('closeInfoCard');
    const card = document.getElementById('formulaInfoCard');
    
    closeBtn.onclick = () => {
        card.style.display = 'none';
    };
    // 默认显示卡片
    card.style.display = 'block';
}

// 恢复：绑定鼠标悬停坐标提示事件
function bindTooltipEvents() {
    const tooltip = document.getElementById('coordTooltip');
    const tooltipText = document.getElementById('tooltipText');
    const canvas = config.canvas;

    canvas.addEventListener('mousemove', (e) => {
        const { xRange, yRange } = config;
        const w = canvas.width;
        const h = canvas.height;
        const xMin = xRange[0], xMax = xRange[1];
        const yMin = yRange[0], yMax = yRange[1];
        const ox = w / 2;
        const oy = h / 2;
        const px = w / (xMax - xMin);
        const py = h / (yMax - yMin);

        // 获取鼠标在画布中的坐标
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // 转换为数学坐标系的x值（取最近的自然数）
        const mathX = Math.round((mouseX - ox) / px);
        // 计算对应y值
        const f = convertFormula(config.currentFormula);
        if (f) {
            try {
                const mathY = math.evaluate(f, { x: mathX });
                // 仅在y值有效且为有限数时显示
                if (!isNaN(mathY) && isFinite(mathY)) {
                    const roundY = Math.round(mathY * 100) / 100; // 保留两位小数
                    tooltipText.textContent = `(${mathX}, ${roundY})`;
                    // 定位提示框（鼠标右下方）
                    tooltip.style.left = `${e.clientX + 10}px`;
                    tooltip.style.top = `${e.clientY + 10}px`;
                    tooltip.style.display = 'block';
                    return;
                }
            } catch (e) {}
        }
        // 无效值隐藏提示框
        tooltip.style.display = 'none';
    });

    canvas.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
}

// 更新公式说明卡片内容
function updateFormulaInfo(formula) {
    const content = document.getElementById('formulaInfoContent');
    content.innerHTML = config.formulaInfos[formula] 
        ? config.formulaInfos[formula].replace(/\n/g, '<br>') 
        : '请选择一个预制公式查看详细说明...';
}

window.addEventListener('load', initCanvas);