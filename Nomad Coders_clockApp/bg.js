const body = document.querySelector('body');

const IMG_Number = 3;
// function handleImgLoad(){
//   console.log('finished loading');
// }
function paintImage(imgNumber){
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
  // image.addEventListener("loadend",handleImgLoad); // api를 이용해서 했으면 로드가 끝나면 반응
}
function genRandom(){
  const number = Math.floor(Math.random() * IMG_Number);
  return number;
}

function init(){
  const ramdomNumber = genRandom();
  paintImage(ramdomNumber);
}


init();