const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector('.js-greetings');

const User_LS = "currentUser";
const Showing_CN = "showing";

function saveName(text){
  localStorage.setItem(User_LS,text);
}
function handleSubmit(event){ // form ㅇㅔ서 submit 하면 그 위의 
  event.preventDefault();
  //input.placeholder="" / input.value
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
function askForName(){
  form.classList.add(Showing_CN);
  form.addEventListener('submit', handleSubmit);
}
function paintGreeting(text){
  form.classList.remove(Showing_CN)
  greeting.classList.add(Showing_CN);
  greeting.innerText = `Hello ${text}`;
}
function loadName(){
  const currentUser = localStorage.getItem(User_LS);
  if (currentUser === null){
    askForName();
  }else {
    paintGreeting(currentUser);
  }
}

function init(){
  loadName();
}
init();