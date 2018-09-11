
/*-------------------------------creating the template-------------------------------------------*/

const addNewProjectButton = document.getElementsByClassName("addButton")[0];
const addTaskButton = document.getElementsByClassName("addButton")[1];

const deleteProjectButton = document.getElementsByClassName("deleteButton")[0];
const deleteTaskButton = document.getElementsByClassName('deleteButton')[1];

const projectList = document.getElementsByClassName('sideBar')[0];
const toDoList = document.getElementsByClassName("toDoList")[0];
const inProgressList = document.getElementsByClassName('inProgressList')[0];
const doneList = document.getElementsByClassName('doneList')[0];

let toDoTaskNumber = 0;
let projectNumber = 0;

function addToDoTextarea() {
 	const newTask = document.createElement('textarea');
	newTask.classList.add("createNewTask" + toDoTaskNumber, "tasks");
	return newTask;
}

function addNewProjectTextarea() {
	const newProjectTextarea = document.createElement('textarea');
	newProjectTextarea.classList.add("createNewProject" + projectNumber, "projects");
	return newProjectTextarea
}

function addToDoTask(){
	const newTaskForm = addToDoTextarea();
	toDoList.appendChild(newTaskForm);
	toDoTaskNumber++;
}

function addNewProject() {
	const newProject = addNewProjectTextarea();
	const projectList = document.getElementsByClassName("sideBar")[0];
	projectList.appendChild(newProject);
	projectNumber++;
}

addTaskButton.addEventListener('click', ()=> addToDoTask());
addNewProjectButton.addEventListener('click', ()=> addNewProject());
/*---------------------------------------------------------------------------------------*/

/*----------------------------develop draggable event------------------------------------*/
const taskDraggable = new Draggable.Draggable(toDoList, {
  		draggable: '.tasks'
	});

let currentMousePositionX = 0;
let currentMousePositionY = 0;

function onDragMove(event) {
	currentMousePositionX = event.sensorEvent.data.clientX;
	currentMousePositionY = event.sensorEvent.data.clientY;
}

function isValidDropPosition(list){
	const listCoordinates = list.getBoundingClientRect();
	if((listCoordinates.left < currentMousePositionX < listCoordinates.right) 
		&& (listCoordinates.bottom < currentMousePositionY < listCoordinates.top)){
		return true;
	}
	return false;
}

function dragStopMove(event){
	// TODO figure out the list the task came from -- then delete the task 
		// ---> event.data.sourceContainer.className (parse it, then get second item)
	// .... then figure out which list it landed at when mouse up, then add it to the list 
	console.log(event);
}

// taskDraggable.on('drag:start', () => console.log('drag:start'));
taskDraggable.on('drag:move', (event) => onDragMove(event));
taskDraggable.on('drag:stop', (event) => dragStopMove(event)); 

// TODO -- function -- add to the right spot in the list;

/*----------------------------------delete tasks/project button------------------------------*/
var focusElements = [];
let currentSelectedElement = document.activeElement;
focusElements.push(currentSelectedElement);

function deleteTasks(){
	console.log(focusElements);
	// const currentSelectedElement = document.activeElement;
	// currentSelectedElement.parentNode.removeChild(focusElements[focusElements.size() - 2]);
}

deleteTaskButton.addEventListener('click', ()=>deleteTasks());
//TODO: add created date to tasks

/*------------------------------------------------------------------------------------------*/

