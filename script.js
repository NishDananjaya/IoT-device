document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll('.spec-box');
    
    boxes.forEach((box, index) => {
      setTimeout(() => {
        box.style.opacity = '1';
        box.style.transform = 'scale(1)';
      }, index * 200); // Stagger the appearance of the boxes
    });
  });
  