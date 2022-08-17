let input = document.querySelector("#input");
let addBtn = document.querySelector('#addbtn');
let tasksContainer = document.querySelector('.taskslist');

//empty array
let TASKSARRAY = []
//check if there is tasks in localStorage 
if (localStorage.getItem('tasks')) {
  TASKSARRAY = JSON.parse(localStorage.getItem('tasks'));
}

// get Data from localStorage
getDataFromLocalStorage();

//click on Task Element 
tasksContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    //delete the parent Element from tasksList from Dom
    e.target.parentElement.remove();
    //remove Task from localStorage 
    deleteTaskWithId(e.target.parentElement.getAttribute('data-id'));
  }
  // check if Task Element is Clicked
  if (e.target.classList.contains('newtask')) {
    //toggle Complete in Storage 
    ToggleStatusOfTask(e.target.getAttribute('data-id'));
    //toggle completed Class
    e.target.classList.toggle('completed');
  }
})

// add new task 
addBtn.addEventListener('click', () => {
  if (input.value.trim() !== "") {
    addTaskToArray(input.value); // add task to array of tasks
    input.value = ""; // empty input feild
  }
})
//add task function 
function addTaskToArray(taskText) {
  // task Data 
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,

  }
  // push task to Tasks Array 
  TASKSARRAY.push(task);
  //Add Task Elements to page from Array of task
  addElementsToPage(TASKSARRAY);
  addTasksToLocalStorage(TASKSARRAY);

}

function addElementsToPage(arrayOfTasks) {
  //empty the tasks container
  tasksContainer.innerHTML = "";
  // loop on the arrayOfTasks
  arrayOfTasks.forEach((task) => {
    // create task Text
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('newtask');
    // check if Task is Done 
    if (task.completed) {
      taskDiv.classList.add('completed');
    }

    taskDiv.setAttribute('data-id', task.id);
    let taskText = document.createElement('p');
    taskText.textContent = task.title;
    // create Delete Button 
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('btn', 'delete');
    // append the tasks to Task Div container
    taskDiv.append(taskText, deleteBtn);
    tasksContainer.append(taskDiv);
  })

}


function addTasksToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks))

}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem('tasks')
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPage(tasks);
  }
}

function deleteTaskWithId(taskId) {
  // for (let i = 0 ; i<TASKSARRAY.length ; i++){
  //   console.log(`${TASKSARRAY[i].id} === ${taskId}`);
  // }
  TASKSARRAY = TASKSARRAY.filter((task) => task.id != taskId);
  addTasksToLocalStorage(TASKSARRAY)
}

function ToggleStatusOfTask(taskId) {
  for (let i = 0; i < TASKSARRAY.length; i++) {
    if (TASKSARRAY[i].id == taskId) {
      TASKSARRAY[i].completed == false ? (TASKSARRAY[i].completed = true) : (TASKSARRAY[i].completed = false)
    }
  }
  addTasksToLocalStorage(TASKSARRAY);
}