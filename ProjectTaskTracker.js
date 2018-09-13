
/*-------------------------------creating the template-------------------------------------------*/

const addNewProjectButton = document.getElementsByClassName("addButton")[0];
const addTaskButton = document.getElementsByClassName("addButton")[1];

const deleteButton__Project = document.getElementsByClassName("deleteButton")[0];
const deleteButton__Task = document.getElementsByClassName('deleteButton')[1];

const projectList = document.getElementsByClassName('sideBar')[0];
const toDoList = document.getElementsByClassName("toDoList")[0];
const inProgressList = document.getElementsByClassName('inProgressList')[0];
const doneList = document.getElementsByClassName('doneList')[0];

let toDoTaskNumber = 0;
let projectNumber = 0;

const taskList__toDo = document.getElementsByClassName("taskList--toDo")[0];
const toDotasks = taskList__toDo.getElementsByTagName("textarea");

function addToDoTextarea() {

	const taskDiv = document.createElement('div');
	taskDiv.classList.add("individualTask");

 	const newTextarea = document.createElement('textarea');
	newTextarea.classList.add("createNewTask" + toDoTaskNumber, "tasks");	

	newTextarea.addEventListener("focus", (event)=> displayArrowButtons(event));
	newTextarea.addEventListener("onblur", (event)=> textAreaOnBlur(event));  //HELP!!!!!!This somehow is not working

	//add arrow buttons and display only when it is on focus; 
	const arrowButtons = createArrowButtonDiv();

	taskDiv.appendChild(newTextarea);
	taskDiv.appendChild(arrowButtons);

	return taskDiv;
}

function addNewProjectTextarea() {
	const newProjectTextarea = document.createElement('textarea');
	newProjectTextarea.classList.add("createNewProject" + projectNumber, "projects");
	return newProjectTextarea
}

function addToDoTask(){
	const newTaskForm = addToDoTextarea();
	taskList__toDo.appendChild(newTaskForm);
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
const toDoTaskDraggable = new Draggable.Draggable(toDoList, {
  		draggable: '.tasks'
	});

const progressTaskDraggable = new Draggable.Draggable(inProgressList, {
  		draggable: '.tasks'
	});

const doneTaskDraggable = new Draggable.Draggable(doneList, {
  		draggable: '.tasks'
	});

const draggableTargets = [toDoList, inProgressList, doneList];

let currentMousePositionX = 0;
let currentMousePositionY = 0;

let currentDraggingItem;
let dragFromList;

function assignDraggingElement(event) {
	const originalSource = event.data.originalSource;
	const elementClassName = originalSource.className.split(" ")[0];
	currentDraggingItem = document.getElementsByClassName(elementClassName)[0];
}

function dragStart(event){
	// find out which list the element came from and mark down which element is being dragged
	dragFromListName = (event.sourceContainer.className).split(" ")[1];
	for(let list of draggableTargets){
		let listName = list.className.split(" ")[1];
		if (listName == dragFromListName){
			dragFromList = list;
		}
	}
	assignDraggingElement(event);
}

function onDragMove(event) {
	currentMousePositionX = event.sensorEvent.data.clientX;
	currentMousePositionY = event.sensorEvent.data.clientY;
}

function isValidDropPosition(list){
	const listCoordinates = list.getBoundingClientRect();
	if((listCoordinates.left < currentMousePositionX)
		 &&(currentMousePositionX < listCoordinates.right) 
		&&(listCoordinates.top < currentMousePositionY) 
		&& (currentMousePositionY < listCoordinates.bottom)){
		return true;
	}
	return false;
}


function dragStopMove(event){
	//find out which list the element is suppose to add to
	let dragToList;
	for(let list of draggableTargets){
		if(isValidDropPosition(list)) {
			if(list !== dragFromList){
				dragToList = list;
				dragToList.appendChild(currentDraggingItem);
			}
		}
	}
}

toDoTaskDraggable.on('drag:start', (event) => dragStart(event));
toDoTaskDraggable.on('drag:move', (event) => onDragMove(event));
toDoTaskDraggable.on('drag:stop', (event) => dragStopMove(event)); 

progressTaskDraggable.on('drag:start', (event) => dragStart(event));
progressTaskDraggable.on('drag:move', (event) => onDragMove(event));
progressTaskDraggable.on('drag:stop', (event) => dragStopMove(event));

doneTaskDraggable.on('drag:start', (event) => dragStart(event));
doneTaskDraggable.on('drag:move', (event) => onDragMove(event));
doneTaskDraggable.on('drag:stop', (event) => dragStopMove(event));



/*-----------------------------develop sortable feature------------------------------------*/
// TODO -- add sort buttons to the side of the focus object

function createArrowButtonDiv() {
	const arrowButtons = document.createElement('div');
	arrowButtons.classList.add("arrowButtons" + toDoTaskNumber, "arrowButtons");

	const arrowButton__up = document.createElement('i');
	arrowButton__up.classList.add("fas", "fa-caret-up");
	arrowButton__up.addEventListener('click', ()=> moveUp());

	const arrowButton__down = document.createElement('i');
	arrowButton__down.classList.add("fas", "fa-caret-down");
	// arrowButton__down.addEventListener('click', (event)=> moveDown(event));

	arrowButtons.appendChild(arrowButton__up);
	arrowButtons.appendChild(arrowButton__down);

	return arrowButtons;
}


function displayArrowButtons(event) {
	const onFocusTask = event.target.parentNode;
	const onFocusTask__arrowButton = onFocusTask.getElementsByClassName("arrowButtons")[0];
	onFocusTask__arrowButton.style.visibility = "visible";
}

function fileter__getTextarea(element) {
	if(element.tagName == "textarea"){
		return true;
	} 
	return false;
}
function moveUp() {
	const activeElement = document.activeElement;
	console.log(activeElement);

}

function restoreOriginalTextarea() {
	console.log("it is out of focus");
}

// TODO -- add css to the arrow buttons 
// then figure out sorting functions

/*----------------------------------delete tasks/project button------------------------------*/
var focusElements = [];
// let currentSelectedElement = document.activeElement;
// focusElements.push(currentSelectedElement);

function deleteTasks(){
	console.log(focusElements);
	// const currentSelectedElement = document.activeElement;
	// currentSelectedElement.parentNode.removeChild(focusElements[focusElements.size() - 2]);
}

// deleteButton__Task.addEventListener('click', ()=>deleteTasks());
//TODO: add created date to tasks

/*------------------------------------------------------------------------------------------*/

