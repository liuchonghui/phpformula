<?php
/**
 * 数学公式可视化入口文件
 * 访问地址：http://localhost/formula/index.php
 */
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>数学公式笛卡尔坐标系可视化</title>
    <!-- 修正：引入实际的math.min.js文件 -->
    <link rel="stylesheet" href="css/style.css">
    <script src="lib/math.min.js"></script> <!-- 关键修正：math.js → math.min.js -->
</head>
<body>
    <!-- 左侧抽屉（公式选择/编辑区） -->
    <div class="drawer" id="drawer">
        <div class="drawer-header">
            <h3>公式设置</h3>
            <button class="toggle-btn" id="toggleDrawer">收起</button>
        </div>
        <div class="drawer-content">
            <!-- 预制公式选择 -->
            <div class="formula-group">
                <label>预制公式：</label>
                <select id="presetFormula">
                    <option value="sin(x)">正弦曲线 y=sin(x)</option>
                    <option value="cos(x)">余弦曲线 y=cos(x)</option>
                    <option value="x^2">抛物线 y=x²</option>
                    <option value="x^3">三次曲线 y=x³</option>
                    <option value="1/x">反比例函数 y=1/x</option>
                    <option value="">自定义公式</option>
                </select>
            </div>
            <!-- 自定义公式输入 -->
            <div class="formula-group">
                <label>自定义公式（y=）：</label>
                <input type="text" id="customFormula" placeholder="例如：sin(x)+cos(x)、x^2-5" value="">
                <button id="refreshBtn">刷新曲线</button>
            </div>
            <div class="tips">
                支持的运算符：+ - * / ^ ；支持函数：sin cos tan log sqrt 等
            </div>
        </div>
    </div>

    <!-- 抽屉展开/收起按钮（抽屉收起时显示） -->
    <button class="drawer-toggle-btn" id="showDrawer">展开公式设置</button>

    <!-- 笛卡尔坐标系绘制区域（全屏） -->
    <canvas id="coordinateCanvas"></canvas>

    <!-- 引入核心逻辑脚本 -->
    <script src="js/formula.js"></script>
</body>
</html>