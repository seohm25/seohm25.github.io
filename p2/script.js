firebase.database().ref("visitors").remove()
  .then(() => console.log("visitors 초기화 완료"))
  .catch(err => console.error(err));

firebase.database().ref("dustDots").remove()
  .then(() => console.log("dustDots 초기화 완료"))
  .catch(err => console.error(err));


// Firebase 초기화
const firebaseConfig = {
  apiKey: "AIzaSyBo9ctGVcPZSbvzmXoZbHer6EU00sk0q_o",
  authDomain: "galla-d7b16.firebaseapp.com",
  projectId: "galla-d7b16",
  databaseURL: "https://galla-d7b16-default-rtdb.firebaseio.com/",
  storageBucket: "galla-d7b16.firebasestorage.app",
  messagingSenderId: "790986481992",
  appId: "1:790986481992:web:f347763bb72766de1e137d",
  measurementId: "G-VC8DBJRVX1"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

//방문자 수 
const visitorsRef = db.ref("visitors");
const visitorId = Date.now() + "-" + Math.floor(Math.random()*1000000);
visitorsRef.child(visitorId).set(true);
visitorsRef.on("value", snapshot => {
  const count = snapshot.numChildren();
  document.getElementById("visitorCount").innerText = count + " Germ Donors!";
});
window.addEventListener("beforeunload", () => {
  visitorsRef.child(visitorId).remove();
});

// 마우스 잔상 먼지 데이터 
const dustRef = db.ref("dustDots"); // 점 데이터 저장
const canvas = document.getElementById("trail");
const ctx = canvas.getContext("2d");
function resizeCanvas() { canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// // 마우스 이동 시 Firebase에 점 추가
// window.addEventListener("mousemove", e => {
//   const x = e.clientX;
//   const y = e.clientY;
//   const r = 1 + Math.random()*2;
//   const alpha = 0.4 + Math.random()*0.3;
//   dustRef.push({ x, y, r, alpha });
// });

// 마우스 이동 시 Firebase에 여러 점 추가 (흩날리는 먼지)
window.addEventListener("mousemove", e => {
  const numDots = 3;           // 한 번에 생성할 점 개수
  const radius = 20;           // 마우스 주변 반경

  for(let i = 0; i < numDots; i++){
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * radius;
    const x = e.clientX + Math.cos(angle) * dist;
    const y = e.clientY + Math.sin(angle) * dist;
    const r = 1 + Math.random()*2;
    const alpha = 0.2 + Math.random()*0.3;
    dustRef.push({ x, y, r, alpha });
  }
});

// 점 배열
let dustDots = [];

// Firebase에서 모든 점 받아서 그림
dustRef.on("child_added", snapshot => {
  const dot = snapshot.val();
  dustDots.push(dot);
});

// 애니메이션
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let i = dustDots.length-1; i >=0; i--){
    const dot = dustDots[i];

    // --- fuzzy particle effect with slow growth ---
    ctx.fillStyle = `rgba(234,228,134,${dot.alpha})`;
    ctx.shadowBlur = dot.r * 2;            
    ctx.shadowColor = `rgba(0,0,0,${dot.alpha/2})`; 

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI*2); 
    ctx.fill();

    // alpha 점점 감소, 최소값 유지
    dot.alpha -= 0.002;  // alpha 감소 속도도 천천히
    if(dot.alpha < 0.06) dot.alpha = 0.06;

    // radius 천천히 커지도록
    dot.r += 0.02;       // 커지는 속도
    if(dot.r > 5) dot.r = 5;  // 최대값 제한
  }

  requestAnimationFrame(animate);
}

animate();


//caption dot
const dot = document.querySelector('.dot');
const textbox = document.querySelector('.textbox');

dot.addEventListener('click', () => {
  textbox.style.display = textbox.style.display === 'block' ? 'none' : 'block';
});

document.getElementById("resetButton").addEventListener("click", () => {
  firebase.database().ref("dustDots").remove();
  dustDots = []; // 화면에서도 즉시 제거
});


drawBackground();

////////light version///////
// // // Firebase 초기화
// const firebaseConfig = {
//   apiKey: "AIzaSyBo9ctGVcPZSbvzmXoZbHer6EU00sk0q_o",
//   authDomain: "galla-d7b16.firebaseapp.com",
//   projectId: "galla-d7b16",
//   databaseURL: "https://galla-d7b16-default-rtdb.firebaseio.com/",
//   storageBucket: "galla-d7b16.firebasestorage.app",
//   messagingSenderId: "790986481992",
//   appId: "1:790986481992:web:f347763bb72766de1e137d",
//   measurementId: "G-VC8DBJRVX1"
// };
// firebase.initializeApp(firebaseConfig);
// const db = firebase.database();

// // 방문자 수
// const visitorsRef = db.ref("visitors");
// const visitorId = Date.now() + "-" + Math.floor(Math.random()*1000000);
// visitorsRef.child(visitorId).set(true);
// visitorsRef.on("value", snapshot => {
//   const count = snapshot.numChildren();
//   document.getElementById("visitorCount").innerText = "Germ Donors : " + count + " people";
// });
// window.addEventListener("beforeunload", () => { visitorsRef.child(visitorId).remove(); });

// // 점 데이터
// const dustRef = db.ref("dustDots");
// const canvas = document.getElementById("trail");
// const ctx = canvas.getContext("2d");
// function resizeCanvas(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
// window.addEventListener("resize", resizeCanvas);
// resizeCanvas();

// let dustDots = [];     // 클라이언트 렌더용
// let dustBuffer = [];   // Firebase 전송용
// const sendInterval = 200; // 0.2초마다 Firebase 전송

// window.addEventListener("mousemove", e => {
//   const numDots = 5;
//   const radius = 20;
//   for(let i=0;i<numDots;i++){
//     const angle = Math.random()*Math.PI*2;
//     const dist = Math.random()*radius;
//     const x = e.clientX + Math.cos(angle)*dist;
//     const y = e.clientY + Math.sin(angle)*dist;
//     const r = 1 + Math.random()*2;
//     const alpha = 0.2 + Math.random()*0.3;
//     const dot = {x, y, r, alpha};
//     dustDots.push(dot);
//     dustBuffer.push(dot);
//   }
//   if(dustDots.length>500) dustDots.splice(0,50);
// });

// // 일정 간격으로 Firebase 전송
// setInterval(()=>{
//   if(dustBuffer.length>0){
//     dustBuffer.forEach(dot=>dustRef.push(dot));
//     dustBuffer = [];
//   }
// }, sendInterval);

// // 애니메이션
// function animate(){
//   ctx.clearRect(0,0,canvas.width,canvas.height);
//   for(let i=dustDots.length-1;i>=0;i--){
//     const dot = dustDots[i];
//     ctx.fillStyle = `rgba(234,228,134,${dot.alpha})`;
//     ctx.shadowBlur = dot.r*2;
//     ctx.shadowColor = `rgba(0,0,0,${dot.alpha/2})`;
//     ctx.beginPath();
//     ctx.arc(dot.x,dot.y,dot.r,0,Math.PI*2);
//     ctx.fill();
//     dot.alpha -= 0.002; if(dot.alpha<0.06) dot.alpha=0.06;
//     dot.r +=0.02; if(dot.r>5) dot.r=5;
//   }
//   requestAnimationFrame(animate);
// }
// animate();

// // reset button
// document.getElementById("resetButton").addEventListener("click", ()=>{
//   firebase.database().ref("dustDots").remove();
//   dustDots = [];
// });

// // 🔹 배경 이미지 하나만 사용
// const bgCanvas = document.getElementById("bgCanvas");
// const bgCtx = bgCanvas.getContext("2d");
// function resizeBgCanvas(){ bgCanvas.width=window.innerWidth; bgCanvas.height=window.innerHeight; }
// resizeBgCanvas();
// window.addEventListener("resize", resizeBgCanvas);

// let currentImage = new Image();
// currentImage.src = "01.png"; // 단일 배경 이미지
// let alphaBG = 0.5;

// function drawBackground(){
//   bgCtx.clearRect(0,0,bgCanvas.width,bgCanvas.height);
//   bgCtx.save();
//   bgCtx.globalAlpha = alphaBG;
//   const imgRatio = currentImage.width / currentImage.height;
//   const canvasRatio = bgCanvas.width / bgCanvas.height;
//   let drawWidth, drawHeight, drawX, drawY;
//   if(canvasRatio>imgRatio){
//     drawWidth=bgCanvas.width; drawHeight=bgCanvas.width/imgRatio;
//     drawX=0; drawY=(bgCanvas.height-drawHeight)/2;
//   } else {
//     drawWidth=bgCanvas.height*imgRatio; drawHeight=bgCanvas.height;
//     drawX=(bgCanvas.width-drawWidth)/2; drawY=0;
//   }
//   bgCtx.drawImage(currentImage,drawX,drawY,drawWidth,drawHeight);
//   bgCtx.restore();
//   requestAnimationFrame(drawBackground);
// }
// drawBackground();

////////////design/////////

// const toggle = document.getElementById('toggleExhibition');
//   const details = document.getElementById('exhibitionText');

//   toggle.addEventListener('click', () => {
//     // 텍스트 박스 토글
//     if(details.style.display === 'none' || details.style.display === '') {
//       details.style.display = 'block';
//     } else {
//       details.style.display = 'none';
//     }

//     // 텍스트 색 토글
//     toggle.classList.toggle('active');
//   });