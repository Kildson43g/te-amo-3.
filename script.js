let highestZ = 1;

class Paper {
  holdingPaper = false;
  pointerX = 0;
  pointerY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  rotation = Math.random() * 30 - 15;
  rotating = false;

  init(paper) {
    paper.style.touchAction = "none";

    paper.addEventListener("pointerdown", (e) => {
      if (this.holdingPaper) return;

      e.preventDefault();

      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ++;

      this.pointerX = e.clientX;
      this.pointerY = e.clientY;

      this.rotating = e.pointerType === "mouse" && e.button === 2;

      paper.setPointerCapture(e.pointerId);
    });

    paper.addEventListener("pointermove", (e) => {
      if (!this.holdingPaper) return;

      e.preventDefault();

      const deltaX = e.clientX - this.pointerX;
      const deltaY = e.clientY - this.pointerY;

      if (this.rotating) {
        const angle = Math.atan2(
          e.clientY - this.pointerY,
          e.clientX - this.pointerX
        );

        this.rotation = (angle * 180) / Math.PI;
      } else {
        this.currentPaperX += deltaX;
        this.currentPaperY += deltaY;
      }

      this.pointerX = e.clientX;
      this.pointerY = e.clientY;

      paper.style.transform =
        `translateX(${this.currentPaperX}px) ` +
        `translateY(${this.currentPaperY}px) ` +
        `rotateZ(${this.rotation}deg)`;
    });

    const stopDragging = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    paper.addEventListener("pointerup", stopDragging);
    paper.addEventListener("pointercancel", stopDragging);
    paper.addEventListener("lostpointercapture", stopDragging);

    paper.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
