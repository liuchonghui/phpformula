const config = {
    canvas: document.getElementById('coordinateCanvas'),
    ctx: null,
    xRange: [-10, 10],
    yRange: [-10, 10],
    currentFormula: 'sin(x)',
    // 新增：函数说明配置
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
    // 新增：移动端缩放相关
    touchStart: { x: 0, y: 0, distance: 0 },
    isTouching: false
};

// 初始化画布
function initCanvas() {
    if (typeof math === 'undefined') {
        alert('math.min.js 加载失败！');
        return;
    }

    config.ctx = config.canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 绑定事件：鼠标滚轮 + 移动端触摸
    bindZoomEvents();
    bindDrawerEvents();
    bindTooltipEvents();
    bindInfoCardEvents();
    
    redrawAll();
}

// 调整画布尺寸
function resizeCanvas() {
    config.canvas.width = window.innerWidth;
    config.canvas.height = window.innerHeight;
}

// 重绘所有内容
function redrawAll() {
    drawCoordinateSystem();
    drawFormulaCurve(config.currentFormula);
}

// 绘制坐标系
function drawCoordinateSystem() {
    const { ctx, canvas, xRange, yRange } = config;
    const w = canvas.width;
    const h = canvas.height;
    const xMin = xRange[0], xMax = xRange[1];
    const yMin = yRange[0], yMax = yRange[1];
    const ox = w / 2;
    const oy = h / 2;
    const px = w / (xMax - xMin); // x轴像素/单位
    const py = h / (yMax - yMin); // y轴像素/单位

    ctx.clearRect(0, 0, w, h);

    // 绘制网格线
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

    // 绘制刻度文字
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

// 公式转换：兼容所有函数写法
function convertFormula(f) {
    if (!f) return '';
    
    // 幂函数转换
    f = f.replace(/x\^2/g, 'pow(x,2)');
    f = f.replace(/x\^3/g, 'pow(x,3)');
    f = f.replace(/x\^4/g, 'pow(x,4)');
    f = f.replace(/x\^0.5/g, 'sqrt(x)');
    f = f.replace(/x\^\(1\/3\)/g, 'pow(x,1/3)');
    
    // 特殊函数转换
    f = f.replace(/√x/g, 'sqrt(x)');
    f = f.replace(/e\^x/g, 'exp(x)');
    f = f.replace(/ln\(/g, 'log(');
    f = f.replace(/ctan\(/g, '1/tan(');
    f = f.replace(/cot\(/g, '1/tan(');
    
    // 剩余^转**
    f = f.replace(/\^/g, '**');
    
    return f;
}

// 核心修复：绘制曲线（解决tan竖线问题）
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
    const step = (xMax - xMin) / 2000; // 增加采样点，提升平滑度
    const PI = Math.PI;

    for (let x = xMin; x <= xMax; x += step) {
        try {
            // 修复tan曲线：过滤定义域外的点（π/2 ± kπ）
            if (formula.includes('tan(x)')) {
                // 计算x是否接近π/2 + kπ（误差范围0.01）
                const modX = x % PI;
                if (Math.abs(modX - PI/2) < 0.01 || Math.abs(modX + PI/2) < 0.01) {
                    first = true;
                    continue;
                }
            }

            const y = math.evaluate(f, { x });

            // 过滤无效值、超出值域的点、无穷大
            if (isNaN(y) || !isFinite(y) || y < yMin - 1 || y > yMax + 1) {
                first = true;
                continue;
            }

            const pxX = ox + x * px;
            const pxY = oy - y * py;

            // 过滤超出画布的点
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

// 绑定缩放事件：鼠标滚轮 + 移动端触摸
function bindZoomEvents() {
    // 鼠标滚轮缩放
    config.canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        zoomHandler(e.deltaY < 0 ? 'in' : 'out');
    });

    // 移动端触摸缩放
    config.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (e.touches.length === 2) {
            config.isTouching = true;
            // 计算初始两点距离
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            config.touchStart.x = (touch1.clientX + touch2.clientX) / 2;
            config.touchStart.y = (touch1.clientY + touch2.clientY) / 2;
            config.touchStart.distance = getDistance(touch1, touch2);
        }
    });

    config.canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (config.isTouching && e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const newDistance = getDistance(touch1, touch2);
            // 判断缩放方向
            if (newDistance > config.touchStart.distance + 5) {
                zoomHandler('in');
                config.touchStart.distance = newDistance;
            } else if (newDistance < config.touchStart.distance - 5) {
                zoomHandler('out');
                config.touchStart.distance = newDistance;
            }
        }
    });

    config.canvas.addEventListener('touchend', () => {
        config.isTouching = false;
    });
}

// 计算两点距离（移动端缩放用）
function getDistance(touch1, touch2) {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx*dx + dy*dy);
}

// 缩放处理逻辑（统一鼠标和移动端）
function zoomHandler(type) {
    const factor = 1.2;
    if (type === 'in') {
        // 放大：缩小坐标范围
        config.xRange = [config.xRange[0] / factor, config.xRange[1] / factor];
        config.yRange = [config.yRange[0] / factor, config.yRange[1] / factor];
    } else {
        // 缩小：扩大坐标范围（限制最大±20）
        const nx0 = config.xRange[0] * factor;
        const nx1 = config.xRange[1] * factor;
        const ny0 = config.yRange[0] * factor;
        const ny1 = config.yRange[1] * factor;

        config.xRange = [Math.max(nx0, -20), Math.min(nx1, 20)];
        config.yRange = [Math.max(ny0, -20), Math.min(ny1, 20)];
    }
    redrawAll();
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
        // 更新函数说明卡片
        updateFormulaInfo(f);
        redrawAll();
    };

    refresh.onclick = () => {
        const f = input.value.trim();
        if (f) {
            config.currentFormula = f;
            // 自定义公式清空说明卡片
            document.getElementById('formulaInfoContent').textContent = '自定义公式暂无详细说明';
            redrawAll();
        }
    };

    input.onkeydown = (e) => {
        if (e.key === 'Enter') refresh.click();
    };

    // 初始化默认公式说明
    updateFormulaInfo(config.currentFormula);
}

// 绑定鼠标悬停提示事件
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

// 更新函数说明卡片内容
function updateFormulaInfo(formula) {
    const content = document.getElementById('formulaInfoContent');
    // 替换换行符为<br>，适配HTML显示
    content.innerHTML = config.formulaInfos[formula] 
        ? config.formulaInfos[formula].replace(/\n/g, '<br>') 
        : '请选择一个预制公式查看详细说明...';
}

// 页面加载初始化
window.addEventListener('load', initCanvas);