// select the elements like image, button, and body
const body = document.body;  

const cats = [
  { imgId: "cat1", buttonClass: "circle-button", on: "black-on.png", off: "blackcat-off.png" },
  { imgId: "cat2", buttonClass: "circle-button", on: "white-on-02.png", off: "white-0ff.png" },
  { imgId: "cat3", buttonClass: "circle-button", on: "blackcat3-on.png", off: "blackcat3-off.png" }
];

cats.forEach(cat => {
  const img = document.getElementById(cat.imgId);
  const button = img.nextElementSibling;


button.addEventListener('click',()=> {
// toggle button classes
button.classList.toggle('active');
button.classList.toggle('dark');

// toggle image and background color
if (button.classList.contains('active')) {
  img.src= cat.on; // change image to "on" version
  body.style.backgroundColor = "gray";
} else {
  img.src= cat.off; 
  body.style.backgroundColor = "white";
}
})

});





