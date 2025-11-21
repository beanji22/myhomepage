let sketch4 = function(p) {
  let sunProgress = 0.0;
  let speed = 0.002;

  p.setup = function() {
    p.createCanvas(600, 400);
  };

  p.draw = function() {
    sunProgress += speed;
    if (sunProgress > 1.0) {
      sunProgress = 0.0;
    }

    drawDynamicSky(sunProgress);

    let waterY = p.height / 2;

    // 1. 물에 비친 산의 반영 그리기 (가장 밑바닥)
    drawMountainReflections(waterY);

    // 2. 해 위치 계산 (아직 그리지 않고 위치만 계산)
    let sunPosition = calculateSunPosition(sunProgress);

    // 3. 물에 비친 해의 반영 그리기 (산의 반영 위에, 하지만 물과 실제 산에 의해 가려질 수 있음)
    drawSunReflection(sunPosition.x, sunPosition.y, waterY);

    // 4. 물 그리기 (해의 반영이 물에 잠기는 효과)
    p.fill(16, 52, 108);
    p.noStroke();
    p.rect(0, waterY, p.width, p.height / 2);

    // 5. 실제 산 그리기 (해와 해의 반영을 가릴 수 있도록)
    drawMountains(waterY);

    // 6. 실제 해 그리기 (가장 위)
    drawMovingSun(sunPosition);
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

  // 해의 위치만 계산하는 함수로 분리
  function calculateSunPosition(progress) {
    let sunSize = 80;
    let sx = p.width * progress;
    let parabola = p.pow(progress - 0.5, 2);
    let sy = p.map(parabola, 0, 0.25, p.height * 0.1, p.height * 0.6);
    return {
      x: sx,
      y: sy,
      size: sunSize
    };
  }

  // 계산된 해의 위치를 받아 실제로 그리는 함수
  function drawMovingSun(sunPos) {
    let sunColor = p.color(255, 204, 0);
    p.fill(sunColor);
    p.noStroke();
    p.ellipse(sunPos.x, sunPos.y, sunPos.size, sunPos.size);
  }


  function drawMountains(waterY) {
    let grayMtn = p.color(150, 150, 150);
    let lightGreenMtn = p.color(60, 100, 85);
    let darkGreenMtn = p.color(46, 82, 70);

    p.noStroke();

    p.fill(grayMtn);
    p.triangle(p.width * 0.2, waterY, p.width * 0.5, p.height * 0.15, p.width * 0.75, waterY);

    p.fill(darkGreenMtn);
    p.triangle(p.width * 0.5, waterY, p.width * 0.9, p.height * 0.2, p.width, waterY);

    p.fill(lightGreenMtn);
    p.triangle(0, waterY, p.width * 0.35, p.height * 0.25, p.width * 0.6, waterY);
  }

  function drawMountainReflections(waterY) {
    let grayMtn = p.color(150, 150, 150);
    let lightGreenMtn = p.color(60, 100, 85);
    let darkGreenMtn = p.color(46, 82, 70);

    // 반영 색상 (더 어둡게)
    let grayRef = p.lerpColor(grayMtn, p.color(0), 0.4);
    let lightGreenRef = p.lerpColor(lightGreenMtn, p.color(0), 0.4);
    let darkGreenRef = p.lerpColor(darkGreenMtn, p.color(0), 0.4);

    p.noStroke();

    p.fill(grayRef);
    p.triangle(p.width * 0.2, waterY, p.width * 0.5, waterY + (waterY - p.height * 0.15), p.width * 0.75, waterY);

    p.fill(darkGreenRef);
    p.triangle(p.width * 0.5, waterY, p.width * 0.9, waterY + (waterY - p.height * 0.2), p.width, waterY);

    p.fill(lightGreenRef);
    p.triangle(0, waterY, p.width * 0.35, waterY + (waterY - p.height * 0.25), p.width * 0.6, waterY);
  }


  function drawSunReflection(sunX, sunY, waterY) {
    // 해가 수평선 아래로 내려가면 반영을 그리지 않음
    if (sunY >= waterY) return;

    // 해 높이에 따라 투명도 조절
    let maxAlpha = 60;
    let alpha = p.map(sunY, p.height * 0.1, waterY, 10, maxAlpha, true);

    let reflectionColor = p.color(255, 204, 0, alpha);
    p.fill(reflectionColor);
    p.noStroke();

    // 대칭 위치 계산
    let sunReflectionY = waterY + (waterY - sunY);
    let sunSize = 80;

    // 물에 비친 모양은 약간 납작하게
    let reflectionWidth = sunSize * 1.5;
    let reflectionHeight = sunSize * 0.4;

    p.ellipse(sunX, sunReflectionY, reflectionWidth, reflectionHeight);
  }
};


new p5(sketch4, 'canvas4');
