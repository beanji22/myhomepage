let sketch4 = function(p) {
  let sunProgress = 0.0;
  let speed = 0.002;

  p.setup = function() {
    p.createCanvas(600, 400);
  };

  p.draw = function() {
    // 1. 시간 흐름 진행
    sunProgress += speed;
    if (sunProgress > 1.0) {
      sunProgress = 0.0;
    }

    // 2. 하늘 그리기
    drawDynamicSky(sunProgress);

    // 3. 해 그리기 (하늘에 떠있는 해)
    // 산 뒤로 넘어가야 하므로 산보다 먼저 그립니다.
    let sunPosition = drawMovingSun(sunProgress);

    // 4. 물 배경 그리기
    let waterY = p.height / 2;
    p.fill(16, 52, 108);
    p.noStroke();
    p.rect(0, waterY, p.width, p.height / 2);

    // === [수정된 부분] ===
    // 5. 물에 비친 태양 그리기
    // 산의 반영보다 뒤에 있어야 하므로 *먼저* 그립니다.
    drawSunReflection(sunPosition.x, sunPosition.y, waterY);

    // 6. 산과 산의 반영 그리기
    // 가장 마지막에 그려서 뒤에 있는 요소들을 덮습니다.
    drawMountainsAndReflections(waterY);
  };

  function drawDynamicSky(progress) {
    let nightColor = p.color(20, 24, 82);
    let sunriseColor = p.color(255, 145, 0);
    let dayColor = p.color(135, 206, 235);

    let currentSky;
    if (progress < 0.2) {
      let t = p.map(progress, 0, 0.2, 0, 1);
      currentSky = p.lerpColor(nightColor, sunriseColor, t);
    } else if (progress < 0.5) {
      let t = p.map(progress, 0.2, 0.5, 0, 1);
      currentSky = p.lerpColor(sunriseColor, dayColor, t);
    } else if (progress < 0.8) {
      let t = p.map(progress, 0.5, 0.8, 0, 1);
      currentSky = p.lerpColor(dayColor, sunriseColor, t);
    } else {
      let t = p.map(progress, 0.8, 1.0, 0, 1);
      currentSky = p.lerpColor(sunriseColor, nightColor, t);
    }
    p.background(currentSky);
  }

  function drawMovingSun(progress) {
    let sunColor = p.color(255, 204, 0);
    let sunSize = 80;

    let sx = p.width * progress;
    let parabola = p.pow(progress - 0.5, 2);
    let sy = p.map(parabola, 0, 0.25, p.height * 0.1, p.height * 0.6);

    p.fill(sunColor);
    p.noStroke();
    p.ellipse(sx, sy, sunSize, sunSize);

    return {x: sx, y: sy, size: sunSize};
  }

  function drawMountainsAndReflections(waterY) {
    let grayMtn = p.color(150, 150, 150);
    let lightGreenMtn = p.color(60, 100, 85);
    let darkGreenMtn = p.color(46, 82, 70);

    let grayRef = p.lerpColor(grayMtn, p.color(0), 0.4);
    let lightGreenRef = p.lerpColor(lightGreenMtn, p.color(0), 0.4);
    let darkGreenRef = p.lerpColor(darkGreenMtn, p.color(0), 0.4);

    p.noStroke();

    // === 반영 (물 그림자) ===
    p.fill(grayRef);
    p.triangle(p.width * 0.2, waterY, p.width * 0.5, waterY + (waterY - p.height * 0.15), p.width * 0.75, waterY);

    p.fill(darkGreenRef);
    p.triangle(p.width * 0.5, waterY, p.width * 0.9, waterY + (waterY - p.height * 0.2), p.width, waterY);

    p.fill(lightGreenRef);
    p.triangle(0, waterY, p.width * 0.35, waterY + (waterY - p.height * 0.25), p.width * 0.6, waterY);

    // === 실제 산 ===
    p.fill(grayMtn);
    p.triangle(p.width * 0.2, waterY, p.width * 0.5, p.height * 0.15, p.width * 0.75, waterY);

    p.fill(darkGreenMtn);
    p.triangle(p.width * 0.5, waterY, p.width * 0.9, p.height * 0.2, p.width, waterY);

    p.fill(lightGreenMtn);
    p.triangle(0, waterY, p.width * 0.35, p.height * 0.25, p.width * 0.6, waterY);
  }

  function drawSunReflection(sunX, sunY, waterY) {
    if (sunY >= waterY) return;

    let maxAlpha = 60;
    let alpha = p.map(sunY, p.height * 0.1, waterY, 10, maxAlpha, true);

    let reflectionColor = p.color(255, 204, 0, alpha);
    p.fill(reflectionColor);
    p.noStroke();

    let sunReflectionY = waterY + (waterY - sunY);
    let sunSize = 80;

    let reflectionWidth = sunSize * 1.5;
    let reflectionHeight = sunSize * 0.4;

    p.ellipse(sunX, sunReflectionY, reflectionWidth, reflectionHeight);
  }
};

new p5(sketch4, 'canvas4');
