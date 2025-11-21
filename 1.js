let sketch1 = function(p) {
  p.setup = function() {
    // HTML의 id="canvas1" 안에 생성됨
    p.createCanvas(600, 400);
    p.noLoop();
  };

  p.draw = function() {
    p.background(135, 206, 235);

    p.fill(255, 204, 0);
    p.noStroke();
    p.ellipse(p.width * 0.8, p.height * 0.2, 90, 90);

    p.fill(16, 52, 108);
    p.rect(0, p.height / 2, p.width, p.height / 2);

    drawMountains();
  };

  function drawMountains() {
    let mountainGray = p.color(150, 150, 150);
    let mountainGreenLight = p.color(60, 100, 85);
    let mountainGreenDark = p.color(46, 82, 70);

    let reflectionGray = p.lerpColor(mountainGray, p.color(0), 0.3);
    let reflectionGreenLight = p.lerpColor(mountainGreenLight, p.color(0), 0.3);
    let reflectionGreenDark = p.lerpColor(mountainGreenDark, p.color(0), 0.3);

    p.fill(mountainGray);
    p.noStroke();
    p.triangle(
      p.width * 0.2, p.height * 0.5,
      p.width * 0.5, p.height * 0.15,
      p.width * 0.75, p.height * 0.5
    );

    p.fill(mountainGreenDark);
    p.noStroke();
    p.triangle(
      p.width * 0.5, p.height * 0.5,
      p.width * 0.9, p.height * 0.2,
      p.width, p.height * 0.5
    );

    p.fill(mountainGreenLight);
    p.noStroke();
    p.triangle(
      0, p.height * 0.5,
      p.width * 0.35, p.height * 0.25,
      p.width * 0.6, p.height * 0.5
    );

    p.fill(reflectionGray);
    p.noStroke();
    p.triangle(
      p.width * 0.2, p.height * 0.5,
      p.width * 0.5, p.height * 0.85,
      p.width * 0.75, p.height * 0.5
    );

    p.fill(reflectionGreenDark);
    p.noStroke();
    p.triangle(
      p.width * 0.5, p.height * 0.5,
      p.width * 0.9, p.height * 0.8,
      p.width, p.height * 0.5
    );

    p.fill(reflectionGreenLight);
    p.noStroke();
    p.triangle(
      0, p.height * 0.5,
      p.width * 0.35, p.height * 0.75,
      p.width * 0.6, p.height * 0.5
    );
  }
};

new p5(sketch1, 'canvas1');