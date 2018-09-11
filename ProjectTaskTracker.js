
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
const toDoTaskDraggable = new Draggable.Draggable(toDoList, {
  		draggable: '.tasks'
	});

const progressTaskDraggable = new Draggable.Draggable(inProgressList, {
  		draggable: '.tasks'
	});

const doneTaskDraggable = new Draggable.Draggable(doneList, {
  		draggable: '.tasks'
	});

const threeLists = [toDoList, inProgressList, doneList];

let currentMousePositionX = 0;
let currentMousePositionY = 0;

let currentDraggingItem;
let dragFromList;

function getDraggingElement(event) {
	const originalSource = event.data.originalSource;
	const elementClassName = originalSource.className.split(" ")[0];
	currentDraggingItem = document.getElementsByClassName(elementClassName)[0];
}

function dragStart(event){
	//find out which list the element came from and mark down which element is being dragged
	dragFromListName = (event.sourceContainer.className).split(" ")[1];
	for(let list of threeLists){
		let listName = list.className.split(" ")[1];
		if (listName == dragFromListName){
			dragFromList = list;
		}
	}
	getDraggingElement(event);
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

	for(let list of threeLists){
		if(isValidDropPosition(list)) {
			dragToList = list;
		}
	}
	if(!dragToList){
		dragToList = dragFromList;
	}

	//add that element to the new selected list
	dragToList.appendChild(currentDraggingItem);
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

