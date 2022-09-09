document.addEventListener("DOMContentLoaded", function() {
    const cursor = document.querySelector('.cursor');
    
    const moveCursor = (e)=> {
      const mouseY = e.clientY;
      const mouseX = e.clientX;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
    window.addEventListener('mousemove', moveCursor);
});