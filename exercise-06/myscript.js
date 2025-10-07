// select document element
const body = document.body;

const cats = [
  { imgId: "cat1", buttonClass: "circle-button", on: "black-on.png", off: "blackcat-off.png" },
  { imgId: "cat2", buttonClass: "circle-button", on: "white-on-02.png", off: "white-off.png" },
  { imgId: "cat3", buttonClass: "circle-button", on: "bwcat-1.png", off: "bw-off.png" },
  { imgId: "cat4", buttonClass: "circle-button", on: "orange.png", off: "orange-off.png" },
  { imgId: "cat5", buttonClass: "circle-button", on: "graycat.png", off: "grayblack-off.png" },
  { imgId: "cat6", buttonClass: "circle-button", on: "white-on.png", off: "whitecat-off.png" },
  { imgId: "cat7", buttonClass: "circle-button", on: "mixcat-on.png", off: "mixcat-off.png" },
  { imgId: "cat8", buttonClass: "circle-button", on: "coco.png", off: "coco-off.png" },
  { imgId: "cat9", buttonClass: "circle-button", on: "graystrip-on.png", off: "graystrip-off-copy.png" },
  { imgId: "cat10", buttonClass: "circle-button", on: "blackcat-on.png", off: "blackcat-off-copy.png" },
  // Add more cats as needed
];

cats.forEach(cat => {
  const img = document.getElementById(cat.imgId); // get image
  const button = img.nextElementSibling; // get button

  //button color toggle
  button.addEventListener('click',()=> {
  button.classList.toggle('active'); 
  body.classList.toggle('dark');

  //image toggle
  img.src = button.classList.contains('active') ? cat.off : cat.on;
      body.style.backgroundColor = button.classList.contains('active') ? "black" : "white";
    
  });
  });



console.log("Button clicked!");



