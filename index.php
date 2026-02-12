<?php
/**
 * 数学公式可视化入口文件 v3.0
 * 核心升级：修正tan曲线、函数说明卡片、移动端缩放、鼠标悬停坐标提示
 */
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>数学公式笛卡尔坐标系可视化 v3.0</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="lib/math.min.js"></script>
</head>
<body>
    <!-- 左侧抽屉（公式选择/编辑区） -->
    <div class="drawer" id="drawer">
        <div class="drawer-header">
            <h3>公式设置 v3.0</h3>
            <button class="toggle-btn" id="toggleDrawer">收起</button>
        </div>
        <div class="drawer-content">
            <div class="formula-group">
                <label>预制公式：</label>
                <select id="presetFormula">
                    <!-- 基础三角函数 -->
                    <option value="sin(x)">正弦曲线 y=sin(x)</option>
                    <option value="cos(x)">余弦曲线 y=cos(x)</option>
                    <option value="tan(x)">正切曲线 y=tan(x)</option>
                    <option value="1/tan(x)">余切曲线 y=ctan(x)（cot(x)）</option>
                    <!-- 反三角函数 -->
                    <option value="asin(x)">反正弦曲线 y=asin(x)</option>
                    <option value="acos(x)">反余弦曲线 y=acos(x)</option>
                    <option value="atan(x)">反正切曲线 y=atan(x)</option>
                    <!-- 双曲函数 -->
                    <option value="sinh(x)">双曲正弦 y=sinh(x)</option>
                    <option value="cosh(x)">双曲余弦 y=cosh(x)</option>
                    <option value="tanh(x)">双曲正切 y=tanh(x)</option>
                    <!-- 对数/指数 -->
                    <option value="ln(x)">自然对数 y=ln(x)</option>
                    <option value="exp(x)">指数函数 y=e^x</option>
                    <!-- 幂函数/根式 -->
                    <option value="x^2">二次曲线 y=x²</option>
                    <option value="x^3">三次曲线 y=x³</option>
                    <option value="x^4">四次曲线 y=x⁴</option>
                    <option value="sqrt(x)">平方根 y=√x (x^0.5)</option>
                    <option value="x^(1/3)">立方根 y=x^(1/3)</option>
                    <!-- 简单代数函数 -->
                    <option value="1/x">反比例函数 y=1/x</option>
                    <option value="2*x+1">线性函数 y=2x+1</option>
                    <!-- 自定义入口 -->
                    <option value="">自定义公式</option>
                </select>
            </div>
            <div class="formula-group">
                <label>自定义公式（y=）：</label>
                <input type="text" id="customFormula" placeholder="例如：sin(x)+cos(x)、x^2-5、e^x-ln(x)" value="">
                <button id="refreshBtn">刷新曲线</button>
            </div>
            <div class="tips">
                支持的运算符：+ - * / ^ ；<br>
                支持函数：sin cos tan cot(ctan) asin acos atan sinh cosh tanh ln exp sqrt 等<br>
                示例：exp(x)（e^x）、sqrt(x)（√x）、x^(1/3)（立方根）、2*x+1（线性函数）
            </div>
        </div>
    </div>

    <!-- 抽屉展开/收起按钮 -->
    <button class="drawer-toggle-btn" id="showDrawer">展开公式设置</button>

    <!-- 函数说明卡片（悬浮展示，不影响坐标系） -->
    <div class="formula-info-card" id="formulaInfoCard">
        <div class="card-header">
            <span id="formulaInfoTitle">函数说明</span>
            <button class="close-card-btn" id="closeInfoCard">×</button>
        </div>
        <div class="card-content" id="formulaInfoContent">
            请选择一个预制公式查看详细说明...
        </div>
    </div>

    <!-- 鼠标悬停坐标提示框 -->
    <div class="coord-tooltip" id="coordTooltip" style="display: none;">
        <span id="tooltipText"></span>
    </div>

    <!-- 笛卡尔坐标系绘制区域 -->
    <canvas id="coordinateCanvas"></canvas>

    <script src="js/formula.js"></script>
</body>
</html>