<?php
/**
 * 数学公式可视化入口文件 v3.1 最终版
 * 核心调整：趣味曲线改为独立展示模式，不受y=xxx限制
 */
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>数学公式笛卡尔坐标系可视化 v3.1</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="lib/math.min.js"></script>
</head>
<body>
    <!-- 左侧抽屉（公式选择/编辑区）- 层级100 -->
    <div class="drawer" id="drawer">
        <div class="drawer-header">
            <h3>公式设置 v3.1</h3>
            <button class="toggle-btn" id="toggleDrawer">收起</button>
        </div>
        <div class="drawer-content">
            <div class="formula-group">
                <label>预制公式：</label>
                <select id="presetFormula">
                    <!-- 基础可编辑函数 -->
                    <option value="sin(x)">正弦曲线 y=sin(x)（可编辑）</option>
                    <option value="cos(x)">余弦曲线 y=cos(x)（可编辑）</option>
                    <option value="tan(x)">正切曲线 y=tan(x)（可编辑）</option>
                    <option value="1/tan(x)">余切曲线 y=ctan(x)（可编辑）</option>
                    <option value="asin(x)">反正弦曲线 y=asin(x)（可编辑）</option>
                    <option value="acos(x)">反余弦曲线 y=acos(x)（可编辑）</option>
                    <option value="atan(x)">反正切曲线 y=atan(x)（可编辑）</option>
                    <option value="sinh(x)">双曲正弦 y=sinh(x)（可编辑）</option>
                    <option value="cosh(x)">双曲余弦 y=cosh(x)（可编辑）</option>
                    <option value="tanh(x)">双曲正切 y=tanh(x)（可编辑）</option>
                    <option value="ln(x)">自然对数 y=ln(x)（可编辑）</option>
                    <option value="exp(x)">指数函数 y=e^x（可编辑）</option>
                    <option value="x^2">二次曲线 y=x²（可编辑）</option>
                    <option value="x^3">三次曲线 y=x³（可编辑）</option>
                    <option value="x^4">四次曲线 y=x⁴（可编辑）</option>
                    <option value="sqrt(x)">平方根 y=√x（可编辑）</option>
                    <option value="x^(1/3)">立方根 y=x^(1/3)（可编辑）</option>
                    <option value="1/x">反比例函数 y=1/x（可编辑）</option>
                    <option value="2*x+1">线性函数 y=2x+1（可编辑）</option>
                    <!-- 趣味曲线（仅展示） -->
                    <optgroup label="趣味曲线（仅展示，不可编辑）">
                        <option value="heart">心形线</option>
                        <option value="beat_heart">跳动心形线</option>
                        <option value="rose_13">13瓣玫瑰线</option>
                        <option value="rose_5">五瓣玫瑰线</option>
                        <option value="archimedes">阿基米德螺线</option>
                        <option value="damped_sin">衰减正弦曲线</option>
                        <option value="circle">单位圆</option>
                        <option value="ellipse">椭圆 x²/4+y²/9=1</option>
                    </optgroup>
                    <!-- 自定义入口 -->
                    <option value="">自定义公式（y=）</option>
                </select>
            </div>
            <div class="formula-group">
                <label>自定义公式（y=）：</label>
                <input type="text" id="customFormula" placeholder="例如：sin(x)+cos(x)、x^2-5" value="">
                <button id="refreshBtn">刷新曲线</button>
            </div>
            <div class="tips">
                支持的运算符：+ - * / ^ ；<br>
                支持函数：sin cos tan cot(ctan) asin acos atan sinh cosh tanh ln exp sqrt 等<br>
                趣味曲线仅作展示，自定义公式仅支持y=f(x)形式
            </div>
        </div>
    </div>

    <!-- 函数说明卡片 - 层级99（低于抽屉） -->
    <div class="formula-info-card" id="formulaInfoCard">
        <div class="card-header">
            <span id="formulaInfoTitle">函数说明</span>
            <button class="close-card-btn" id="closeInfoCard">×</button>
        </div>
        <div class="card-content" id="formulaInfoContent">
            请选择一个预制公式查看详细说明...
        </div>
    </div>

    <!-- 鼠标悬停坐标提示框 - 层级102（最高） -->
    <div class="coord-tooltip" id="coordTooltip" style="display: none;">
        <span id="tooltipText"></span>
    </div>

    <!-- 缩放按钮组：固定在右下角 - 层级98（低于卡片/抽屉） -->
    <div class="zoom-btn-group">
        <button class="zoom-btn" id="zoomInBtn">🔍 放大</button>
        <button class="zoom-btn" id="zoomOutBtn">🔍 缩小</button>
    </div>

    <!-- 抽屉展开按钮：固定在左上角 - 层级101（高于抽屉） -->
    <button class="drawer-toggle-btn" id="showDrawer">展开公式设置</button>

    <!-- 坐标系画布 - 层级1 -->
    <canvas id="coordinateCanvas"></canvas>

    <script src="js/formula.js"></script>
</body>
</html>
