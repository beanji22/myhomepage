let sketch3 = function(p) {
  let isBlinking = false;
  let blinkStartTime = 0;
  const blinkDuration = 150;

  p.setup = function() {
    p.createCanvas(600, 400);
  };

  p.draw = function() {
    p.background(235, 245, 255);

    const cx = p.width / 2;
    const cy = p.height / 2;

    // 머리카락
    p.noStroke();
    p.fill(0);
    p.beginShape();
    p.vertex(cx + 140, cy - 40);
    p.bezierVertex(cx + 220, cy - 10, cx + 240, cy + 120, cx + 120, cy + 150);
    p.bezierVertex(cx + 160, cy + 40, cx + 140, cy - 10, cx + 140, cy - 40);
    p.endShape(p.CLOSE);

    p.beginShape();
    p.vertex(cx - 140, cy - 40);
    p.bezierVertex(cx - 220, cy - 10, cx - 240, cy + 110, cx - 120, cy + 150);
    p.bezierVertex(cx - 160, cy + 40, cx - 140, cy - 10, cx - 140, cy - 40);
    p.endShape(p.CLOSE);

    // 얼굴
    p.fill(255, 235, 210);
    p.stroke(50);
    p.strokeWeight(3);
    p.ellipse(cx, cy - 10, 298, 320);

    const leftEyeX = cx - 60;
    const rightEyeX = cx + 60;
    const eyeY = cy - 10;

    // 눈 그리기 (깜빡임 로직)
    if (isBlinking && p.millis() - blinkStartTime < blinkDuration) {
      p.stroke(50);
      p.strokeWeight(4);
      p.noFill();
      p.arc(leftEyeX, eyeY, 70, 50, p.QUARTER_PI, p.PI - p.QUARTER_PI);
      p.arc(rightEyeX, eyeY, 70, 50, p.QUARTER_PI, p.PI - p.QUARTER_PI);
    } else {
      isBlinking = false;

      p.fill(255);
      p.stroke(50);
      p.strokeWeight(2);
      p.ellipse(leftEyeX, eyeY, 70, 50);
      p.ellipse(rightEyeX, eyeY, 70, 50);

      // 마우스 추적
      let angleL = p.atan2(p.mouseY - eyeY, p.mouseX - leftEyeX);
      let angleR = p.atan2(p.mouseY - eyeY, p.mouseX - rightEyeX);

      const pupilRadius = 12;
      const pupilDistL = p.constrain(p.dist(p.mouseX, p.mouseY, leftEyeX, eyeY), 0, pupilRadius);
      const pupilDistR = p.constrain(p.dist(p.mouseX, p.mouseY, rightEyeX, eyeY), 0, pupilRadius);

      const pupilLX = leftEyeX + p.cos(angleL) * pupilDistL;
      const pupilLY = eyeY + p.sin(angleL) * pupilDistL;
      const pupilRX = rightEyeX + p.cos(angleR) * pupilDistR;
      const pupilRY = eyeY + p.sin(angleR) * pupilDistR;

      p.fill(100, 60, 30);
      p.noStroke();
      p.ellipse(pupilLX, pupilLY, 28, 28);
      p.ellipse(pupilRX, pupilRY, 28, 28);

      p.fill(0);
      p.ellipse(pupilLX, pupilLY, 12, 12);
      p.ellipse(pupilRX, pupilRY, 12, 12);

      p.fill(255);
      p.ellipse(pupilLX + 6, pupilLY - 6, 6, 6);
      p.ellipse(pupilRX + 6, pupilRY - 6, 6, 6);
    }

    // 코
    p.fill(255, 230, 210);
    p.stroke(80);
    p.strokeWeight(2);
    p.triangle(cx, cy, cx - 12, cy + 40, cx + 12, cy + 40);

    p.noStroke();
    p.fill(50);
    p.ellipse(cx, cy + 25, 2.5, 2.5);
    p.ellipse(cx + 10, cy + 45, 3, 3);

    // 입
    p.fill(200, 90, 120);
    p.stroke(140, 40, 70);
    p.strokeWeight(2);
    p.ellipse(cx, cy + 70, 100, 50);

    p.fill(255, 235, 210);
    p.noStroke();
    p.arc(cx, cy + 64, 110, 40, p.PI, p.TWO_PI);

    // 볼터치
    p.fill(255, 180, 190, 180);
    p.noStroke();
    p.ellipse(cx - 110, cy + 25, 60, 40);
    p.ellipse(cx + 110, cy + 25, 60, 40);

    // 앞머리
    p.fill(0);
    p.noStroke();
    p.arc(cx, cy - 50, 295, 250, p.PI, p.TWO_PI);
  };

  // 키보드 이벤트 (스페이스바)
  p.keyPressed = function() {
    if (p.key === ' ') {
      isBlinking = true;
      blinkStartTime = p.millis();
    }
  };
};

new p5(sketch3, 'canvas3');