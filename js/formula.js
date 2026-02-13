const config = {
    canvas: document.getElementById('coordinateCanvas'),
    ctx: null,
    xRange: [-10, 10],
    yRange: [-10, 10],
    currentFormula: 'sin(x)',
    currentCurveType: 'normal', // normal:基础函数, fun:趣味曲线
    // 函数说明配置（更新趣味曲线说明）
    formulaInfos: {
        // 基础可编辑函数（保留原有说明）
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
        '2*x+1': '线性函数 y=2x+1\n• 定义域：全体实数 R\n• 值域：全体实数 R\n• 奇偶性：非奇非偶\n• 单调性：在R上单调递增\n• 斜率：2，截距：1',
        // 趣味曲线（仅展示）说明
        'heart': '心形线\n• 极坐标方程：r = 1 - sinθ 或 r = a(1 - cosθ)\n• 笛卡尔方程：x²+(y-√(x²))²=1\n• 特性：关于y轴对称，完整心形图案',
        'beat_heart': '跳动心形线\n• 基于基础心形线叠加正弦波动\n• 特性：边缘呈周期性波动，视觉上“跳动”',
        'rose_13': '13瓣玫瑰线\n• 极坐标方程：r = cos(13θ/2)\n• 特性：13个对称花瓣，奇数瓣玫瑰线',
        'rose_5': '五瓣玫瑰线\n• 极坐标方程：r = sin(5θ)\n• 特性：5个对称花瓣，简洁美观',
        'archimedes': '阿基米德螺线\n• 极坐标方程：r = aθ（a为常数）\n• 特性：随θ增大，螺线均匀向外扩展\n• 应用：螺旋楼梯、蚊香等设计',
        'damped_sin': '衰减正弦曲线\n• 方程：y = e^(-x/10) * sin(x)\n• 特性：正弦波振幅随x指数衰减\n• 应用：物理阻尼振动、电路衰减信号',
        'circle': '单位圆\n• 方程：x² + y² = 1\n• 特性：圆心在原点，半径1，对称图形',
        'ellipse': '椭圆 x²/4 + y²/9 = 1\n• 长轴：y轴方向，长度6（半长轴3）\n• 短轴：x轴方向，长度4（半短轴2）\n• 离心率：√5/3 ≈ 0.745'
    },
    // 缩放范围配置（调整移动端最大范围，适配全屏）
    maxZoomRange: {
        pc: { x: [-200, 200], y: [-200, 200] },
        mobile: { x: [-50, 50], y: [-50, 50] }
    },
    minZoomRange: { x: [-5, 5], y: [-5, 5] },
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
    bindTooltipEvents();
    redrawAll();
}

// 重构resizeCanvas：动态调整坐标范围以适配全屏
function resizeCanvas() {
    const canvas = config.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 核心：根据屏幕宽高比动态调整坐标范围，保证单位长度一致且全屏填充
    const w = canvas.width;
    const h = canvas.height;
    const baseRange = 10; // 基础参考范围
    
    // 计算宽高比
    const aspectRatio = w / h;
    
    // 动态调整x/y范围，让坐标系填满屏幕
    if (aspectRatio > 1) {
        // 宽屏（PC端）：x轴范围按比例扩大，y轴保持基础范围
        const newXRange = [
            -baseRange * aspectRatio,
            baseRange * aspectRatio
        ];
        config.xRange = newXRange;
        config.yRange = [-baseRange, baseRange];
    } else {
        // 竖屏（移动端）：y轴范围按比例扩大，x轴保持基础范围
        const newYRange = [
            -baseRange / aspectRatio,
            baseRange / aspectRatio
        ];
        config.xRange = [-baseRange, baseRange];
        config.yRange = newYRange;
    }
}

// 重构redrawAll：区分基础函数和趣味曲线
function redrawAll() {
    drawCoordinateSystem();
    if (config.currentCurveType === 'fun') {
        // 绘制趣味曲线
        drawFunCurve(config.currentFormula);
    } else {
        // 绘制基础函数（原有逻辑）
        drawFormulaCurve(config.currentFormula);
    }
}

function drawCoordinateSystem() {
    const { ctx, canvas, xRange, yRange } = config;
    const w = canvas.width;
    const h = canvas.height;
    const xMin = xRange[0], xMax = xRange[1];
    const yMin = yRange[0], yMax = yRange[1];

    // 核心：计算等比例单位像素（保证x/y单位长度一致）
    const pxBase = w / (xMax - xMin);
    const pyBase = h / (yMax - yMin);
    const unitPx = Math.min(pxBase, pyBase);
    
    // 计算实际可用的坐标范围（确保填满屏幕）
    const actualXMax = (w / 2) / unitPx;
    const actualXMin = -actualXMax;
    const actualYMax = (h / 2) / unitPx;
    const actualYMin = -actualYMax;

    // 坐标系中心（始终在屏幕中心）
    const ox = w / 2;
    const oy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // 绘制网格（基于实际可用范围，填满屏幕）
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    // X轴网格：从实际最小到实际最大，步长1
    for (let x = Math.ceil(actualXMin); x <= Math.floor(actualXMax); x++) {
        const pxX = ox + x * unitPx;
        if (pxX < 0 || pxX > w) continue;
        ctx.beginPath();
        ctx.moveTo(pxX, 0);
        ctx.lineTo(pxX, h);
        ctx.stroke();
    }
    // Y轴网格：从实际最小到实际最大，步长1
    for (let y = Math.ceil(actualYMin); y <= Math.floor(actualYMax); y++) {
        const pxY = oy - y * unitPx;
        if (pxY < 0 || pxY > h) continue;
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

    // 绘制刻度（只显示整数刻度，避免过于密集）
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    // X轴刻度：控制密度（PC端每1个单位，移动端每2个单位）
    const xTickStep = config.isMobile ? 2 : 1;
    for (let x = Math.ceil(actualXMin); x <= Math.floor(actualXMax); x += xTickStep) {
        if (x === 0) continue;
        const pxX = ox + x * unitPx;
        if (pxX < 0 || pxX > w) continue;
        ctx.fillText(x, pxX - 5, oy + 20);
    }
    // Y轴刻度：控制密度（PC端每1个单位，移动端每2个单位）
    const yTickStep = config.isMobile ? 2 : 1;
    for (let y = Math.ceil(actualYMin); y <= Math.floor(actualYMax); y += yTickStep) {
        if (y === 0) continue;
        const pxY = oy - y * unitPx;
        if (pxY < 0 || pxY > h) continue;
        ctx.fillText(y, ox - 25, pxY + 5);
    }
    // 原点刻度
    ctx.fillText('0', ox + 5, oy + 15);
}

// 原有基础函数绘制逻辑（适配新的unitPx）
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

    // 统一单位像素
    const pxBase = w / (xMax - xMin);
    const pyBase = h / (yMax - yMin);
    const unitPx = Math.min(pxBase, pyBase);

    // 计算实际绘制范围（填满屏幕）
    const actualXMax = (w / 2) / unitPx;
    const actualXMin = -actualXMax;

    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let first = true;
    const step = (actualXMax - actualXMin) / 4000; // 更高精度，保证曲线平滑
    const PI = Math.PI;

    for (let x = actualXMin; x <= actualXMax; x += step) {
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

            if (isNaN(y) || !isFinite(y)) {
                first = true;
                continue;
            }

            const pxX = ox + x * unitPx;
            const pxY = oy - y * unitPx;

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

// 趣味曲线独立绘制函数（适配新的unitPx和全屏范围）
function drawFunCurve(curveType) {
    const { ctx, canvas, xRange, yRange } = config;
    const w = canvas.width;
    const h = canvas.height;
    const ox = w / 2;
    const oy = h / 2;

    // 统一单位像素
    const pxBase = w / (xRange[1] - xRange[0]);
    const pyBase = h / (yRange[1] - yRange[0]);
    const unitPx = Math.min(pxBase, pyBase);

    // 计算实际可视范围
    const actualXMax = (w / 2) / unitPx;
    const actualXMin = -actualXMax;
    const actualYMax = (h / 2) / unitPx;
    const actualYMin = -actualYMax;

    const step = 0.005; // 更高精度，保证曲线平滑

    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.beginPath();

    switch (curveType) {
        case 'heart': // 心形线（极坐标转笛卡尔）
            for (let θ = 0; θ < 2 * Math.PI; θ += step) {
                const r = Math.min(actualXMax * 0.4, actualYMax * 0.4) * (1 - Math.sin(θ)); // 适配屏幕大小
                const x = r * Math.cos(θ);
                const y = r * Math.sin(θ);
                const pxX = ox + x * unitPx;
                const pxY = oy - y * unitPx;
                if (θ === 0) {
                    ctx.moveTo(pxX, pxY);
                } else {
                    ctx.lineTo(pxX, pxY);
                }
            }
            break;
        
        case 'beat_heart': // 跳动心形线
            const heartRange = Math.min(actualXMax * 0.3, actualYMax * 0.3);
            for (let x = -heartRange; x <= heartRange; x += step) {
                const maxY = Math.sqrt(heartRange * heartRange - x * x);
                if (maxY < 0) continue;
                const y1 = Math.pow(Math.pow(x, 2), 1/3) + 0.9 * maxY * Math.sin(10 * Math.PI * x);
                const y2 = Math.pow(Math.pow(x, 2), 1/3) + 0.9 * maxY * Math.cos(10 * Math.PI * x);
                const pxX = ox + x * unitPx;
                const pxY1 = oy - y1 * unitPx;
                const pxY2 = oy - y2 * unitPx;
                
                if (x === -heartRange) {
                    ctx.moveTo(pxX, pxY1);
                } else {
                    ctx.lineTo(pxX, pxY1);
                }
                ctx.moveTo(pxX, pxY2);
            }
            break;
        
        case 'rose_13': // 13瓣玫瑰线
            for (let θ = 0; θ < 4 * Math.PI; θ += step) {
                const r = Math.min(actualXMax * 0.4, actualYMax * 0.4) * Math.cos(13 * θ / 2);
                const x = r * Math.cos(θ);
                const y = r * Math.sin(θ);
                const pxX = ox + x * unitPx;
                const pxY = oy - y * unitPx;
                if (θ === 0) {
                    ctx.moveTo(pxX, pxY);
                } else {
                    ctx.lineTo(pxX, pxY);
                }
            }
            break;
        
        case 'rose_5': // 五瓣玫瑰线
            for (let θ = 0; θ < 2 * Math.PI; θ += step) {
                const r = Math.min(actualXMax * 0.4, actualYMax * 0.4) * Math.sin(5 * θ);
                const x = r * Math.cos(θ);
                const y = r * Math.sin(θ);
                const pxX = ox + x * unitPx;
                const pxY = oy - y * unitPx;
                if (θ === 0) {
                    ctx.moveTo(pxX, pxY);
                } else {
                    ctx.lineTo(pxX, pxY);
                }
            }
            break;
        
        case 'archimedes': // 阿基米德螺线
            for (let θ = 0; θ < 6 * Math.PI; θ += step) {
                const r = Math.min(actualXMax * 0.05, actualYMax * 0.05) * θ;
                const x = r * Math.cos(θ);
                const y = r * Math.sin(θ);
                const pxX = ox + x * unitPx;
                const pxY = oy - y * unitPx;
                if (θ === 0) {
                    ctx.moveTo(pxX, pxY);
                } else {
                    ctx.lineTo(pxX, pxY);
                }
            }
            break;
        
        case 'damped_sin': // 衰减正弦曲线
            for (let x = actualXMin; x <= actualXMax; x += step) {
                const y = Math.exp(-x/actualXMax) * Math.sin(x * Math.PI / (actualXMax / 5));
                const pxX = ox + x * unitPx;
                const pxY = oy - y * unitPx;
                if (x === actualXMin) {
                    ctx.moveTo(pxX, pxY);
                } else {
                    ctx.lineTo(pxX, pxY);
                }
            }
            break;
        
        case 'circle': // 单位圆（适配屏幕大小）
            const circleRadius = Math.min(actualXMax * 0.4, actualYMax * 0.4);
            for (let θ = 0; θ < 2 * Math.PI; θ += step) {
                const x = circleRadius * Math.cos(θ);
                const y = circleRadius * Math.sin(θ);
                const pxX = ox + x * unitPx;
                const pxY = oy - y * unitPx;
                if (θ === 0) {
                    ctx.moveTo(pxX, pxY);
                } else {
                    ctx.lineTo(pxX, pxY);
                }
            }
            break;
        
        case 'ellipse': // 椭圆（适配屏幕大小）
            const ellipseX = Math.min(actualXMax * 0.4, actualYMax * 0.6);
            const ellipseY = Math.min(actualXMax * 0.6, actualYMax * 0.4);
            for (let θ = 0; θ < 2 * Math.PI; θ += step) {
                const x = ellipseX * Math.cos(θ);
                const y = ellipseY * Math.sin(θ);
                const pxX = ox + x * unitPx;
                const pxY = oy - y * unitPx;
                if (θ === 0) {
                    ctx.moveTo(pxX, pxY);
                } else {
                    ctx.lineTo(pxX, pxY);
                }
            }
            break;
    }

    ctx.stroke();
}

// 缩放逻辑（适配新的全屏范围）
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

// 绑定缩放按钮事件（保留原有，适配新范围）
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

// 重构抽屉事件：区分基础函数和趣味曲线
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
        input.value = ''; // 趣味曲线清空自定义输入框
        // 判断是否为趣味曲线
        const funCurveTypes = ['heart', 'beat_heart', 'rose_13', 'rose_5', 'archimedes', 'damped_sin', 'circle', 'ellipse'];
        if (funCurveTypes.includes(f)) {
            config.currentFormula = f;
            config.currentCurveType = 'fun';
            // 禁用自定义输入和刷新按钮
            input.disabled = true;
            refresh.disabled = true;
        } else {
            config.currentFormula = f;
            config.currentCurveType = 'normal';
            input.value = f;
            // 启用自定义输入和刷新按钮
            input.disabled = false;
            refresh.disabled = false;
        }
        updateFormulaInfo(f);
        redrawAll();
    };

    refresh.onclick = () => {
        const f = input.value.trim();
        if (f) {
            config.currentFormula = f;
            config.currentCurveType = 'normal';
            document.getElementById('formulaInfoContent').innerHTML = '自定义公式暂无详细说明';
            redrawAll();
        }
    };

    input.onkeydown = (e) => {
        if (e.key === 'Enter' && !input.disabled) refresh.click();
    };

    // 初始化默认公式说明
    updateFormulaInfo(config.currentFormula);
}

// 绑定函数说明卡片事件（保留原有）
function bindInfoCardEvents() {
    const closeBtn = document.getElementById('closeInfoCard');
    const card = document.getElementById('formulaInfoCard');
    
    closeBtn.onclick = () => {
        card.style.display = 'none';
    };
    // 默认显示卡片
    card.style.display = 'block';
}

// 绑定鼠标悬停坐标提示事件（适配新的unitPx和全屏范围）
function bindTooltipEvents() {
    const tooltip = document.getElementById('coordTooltip');
    const tooltipText = document.getElementById('tooltipText');
    const canvas = config.canvas;

    canvas.addEventListener('mousemove', (e) => {
        const { xRange, yRange, currentCurveType } = config;
        const w = canvas.width;
        const h = canvas.height;
        const ox = w / 2;
        const oy = h / 2;

        // 统一单位像素
        const pxBase = w / (xRange[1] - xRange[0]);
        const pyBase = h / (yRange[1] - yRange[0]);
        const unitPx = Math.min(pxBase, pyBase);

        // 获取鼠标在画布中的坐标
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // 转换为数学坐标系坐标
        const mathX = Math.round((mouseX - ox) / unitPx * 100) / 100;
        const mathY = Math.round((oy - mouseY) / unitPx * 100) / 100;

        if (currentCurveType === 'fun') {
            // 趣味曲线仅显示鼠标位置坐标
            tooltipText.textContent = `坐标：(${mathX}, ${mathY})`;
        } else {
            // 基础函数显示计算后坐标（原有逻辑）
            const mathXInt = Math.round(mathX);
            const f = convertFormula(config.currentFormula);
            if (f) {
                try {
                    const calcY = math.evaluate(f, { x: mathXInt });
                    const roundY = Math.round(calcY * 100) / 100;
                    tooltipText.textContent = `(${mathXInt}, ${roundY})`;
                } catch (e) {
                    tooltipText.textContent = `坐标：(${mathX}, ${mathY})`;
                }
            } else {
                tooltipText.textContent = `坐标：(${mathX}, ${mathY})`;
            }
        }

        // 定位提示框（鼠标右下方）
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY + 10}px`;
        tooltip.style.display = 'block';
    });

    canvas.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
}

// 更新公式说明卡片内容（保留原有）
function updateFormulaInfo(formula) {
    const content = document.getElementById('formulaInfoContent');
    content.innerHTML = config.formulaInfos[formula] 
        ? config.formulaInfos[formula].replace(/\n/g, '<br>') 
        : '请选择一个预制公式查看详细说明...';
}

window.addEventListener('load', initCanvas);