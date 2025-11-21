let sketch2 = function(p) {
  p.setup = function() {
    p.createCanvas(600, 400);
    p.noLoop();
  };

  p.draw = function() {
    p.background(235, 245, 255);

    const cx = p.width / 2;
    const cy = p.height / 2;

    p.noStroke();
    p.fill(0);
    
    // 머리카락 왼쪽
    p.beginShape();
    p.vertex(cx + 140, cy - 40);
    p.bezierVertex(cx + 220, cy - 10, cx + 240, cy + 120, cx + 120, cy + 150);
    p.bezierVertex(cx + 160, cy + 40, cx + 140, cy - 10, cx + 140, cy - 40);
    p.endShape(p.CLOSE);

    // 머리카락 오른쪽
    p.beginShape();
    p.vertex(cx - 140, cy - 40);
    p.bezierVertex(cx - 220, cy - 10, cx - 240, cy + 110, cx - 120, cy + 150);
    p.bezierVertex(cx - 160, cy + 40, cx - 140, cy - 10, cx - 140, cy - 40);
    p.endShape(p.CLOSE);

    // 얼굴형
    p.fill(255, 235, 210);
    p.stroke(50);
    p.strokeWeight(3);
    p.ellipse(cx, cy - 10, 298, 320);

    // 안경/눈 주변
    p.fill(255);
    p.stroke(50);
    p.strokeWeight(2);
    p.ellipse(cx - 60, cy - 10, 70, 50);
    p.ellipse(cx + 60, cy - 10, 70, 50);

    // 눈동자
    p.fill(100, 60, 30);
    p.noStroke();
    p.ellipse(cx - 60, cy - 10, 28, 28);
    p.ellipse(cx + 60, cy - 10, 28, 28);

    p.fill(0);
    p.ellipse(cx - 60, cy - 10, 12, 12);
    p.ellipse(cx + 60, cy - 10, 12, 12);
    p.fill(255);
    p.ellipse(cx - 54, cy - 16, 6, 6);
    p.ellipse(cx + 66, cy - 16, 6, 6);

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
};

new p5(sketch2, 'canvas2');