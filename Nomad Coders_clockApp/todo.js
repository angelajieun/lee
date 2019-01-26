const toDoForm = document.querySelector('.js-toDoForm'),
      toDoInput = toDoForm.querySelector('input'),
      toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';
let toDos = [];

// function filterFn(toDo){
//   return toDo.id === 1;
// }
function deleteToDo(evnet){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  // const cleanToDos = toDos.filter(filterFn);
  const cleanToDos = toDos.filter(function(toDo){
    //console.log(toDo.id , li.id); // toDo.id 는 num, li.id 는 string
    // so parseInt() 로 숫자로 변경해주기
    return toDo.id !== parseInt(li.id);
  });
  console.log(cleanToDos);
  toDos = cleanToDos;
  saveToDos();
}  
function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function paintToDo(text){
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newID = toDos.length + 1;
  delBtn.innerText = 'x';
  delBtn.addEventListener("click",deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newID;
  toDoList.appendChild(li);

  const toDoObj = {
    text : text,
    id: newID,
  };
  toDos.push(toDoObj);
  saveToDos();
}
function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
}
function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){
   // console.log(loadedToDos); // 전부 스트링으로 들어옴
    const parsedToDos = JSON.parse(loadedToDos); //하여 다시 오브젝트로 바꿈
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    });
  }
}



function init(){
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();