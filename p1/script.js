document.addEventListener("DOMContentLoaded", () => {
    const computer = document.getElementById("computer");
    const dots = document.getElementById("dots");
  
    computer.addEventListener("click", () => {
      dots.classList.add("show"); // fade-in
    });
  });
 