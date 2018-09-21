
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

//for sortable purposes --recording the most recent changes in all three lists
var list_toDo = [];
var list_inProgress = [];
var list_done = [];


function addToDoTextarea() {
	const taskDiv = document.createElement('div');
	taskDiv.classList.add("taskDiv" + toDoTaskNumber, "task");

 	const newTextarea = document.createElement('textarea');
	newTextarea.classList.add("task" + toDoTaskNumber, "tasks");

	const arrowButtons = createArrowButtonDiv();

	taskDiv.appendChild(newTextarea);
	taskDiv.appendChild(arrowButtons);

	newTextarea.addEventListener("blur", (event)=> removeArrowButtonDiv(event));
	newTextarea.addEventListener("focus", (event)=> displayArrowButtons(event));

	return taskDiv;
}

function addNewProjectTextarea() {
	const newProjectTextarea = document.createElement('textarea');
	newProjectTextarea.classList.add("createNewProject" + projectNumber, "projects");
	return newProjectTextarea
}

function addToDoTask(){
	const newTaskForm = addToDoTextarea();
	const taskList__toDo = document.getElementsByClassName("toDo")[0];
	taskList__toDo.appendChild(newTaskForm);
	toDoTaskNumber++;

	//record it to the list
	list_toDo.push(newTaskForm);
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
	currentDraggingItem = document.getElementsByClassName(elementClassName)[0].parentNode;
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

let dragToList;

function dragStopMove(event){
	//find out which list the element is suppose to add to
	for(let list of draggableTargets){
		if(isValidDropPosition(list)) {
			if(list !== dragFromList){
				dragToList = list.getElementsByTagName("ul")[0];
				dragToList.appendChild(currentDraggingItem);
				recordDraggingHistory();
			}
		}
	}
}

function recordDraggingHistory() {
	const draggingItemIndex = list_toDo.indexOf(currentDraggingItem);
	list_toDo.splice(0,1);

	if(dragToList.className == "inProgress"){
		list_inProgress.push(currentDraggingItem);
	} else if (dragToList.className == "done"){
		list_done.push(currentDraggingItem);
	} else {
		list_toDo.push(currentDraggingItem);
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
let currentSelectedElement;

function removeArrowButtonDiv(event) {
	currentSelectedElement = event.target.parentNode;
	window.onclick = e => {
    console.log(e);
	}
	const onFocusTask = event.target.parentNode;
	const onFocusTask__arrowButton = onFocusTask.getElementsByClassName("arrowButtons")[0];
	onFocusTask__arrowButton.style = "visibility : hidden";
}

function createArrowButtonDiv() {
	const arrowButtons = document.createElement('div');
	arrowButtons.classList.add("arrowButtons" + toDoTaskNumber, "arrowButtons");

	const arrowButton__up = document.createElement('i');
	arrowButton__up.classList.add("fas", "fa-caret-up");
	arrowButton__up.addEventListener('mousedown', (event)=> moveUp(event));

	const arrowButton__down = document.createElement('i');
	arrowButton__down.classList.add("fas", "fa-caret-down");
	// arrowButton__down.addEventListener('click', (event)=> moveDown(event));

	arrowButtons.appendChild(arrowButton__up);
	arrowButtons.appendChild(arrowButton__down);


	return arrowButtons;
}


function displayArrowButtons(event) {
	currentSelectedElement = event.target.parentNode;

	const onFocusTask = event.target.parentNode;
	const onFocusTask__arrowButton = onFocusTask.getElementsByClassName("arrowButtons")[0];
	onFocusTask__arrowButton.style.visibility = "visible";
}

function findCurrentActiveList() {
	let currentListName = (document.activeElement.className).split(" ")[1];
	let currentActiveList = [];
	if(currentListName == "toDoList"){
		currentActiveList.push(list_toDo);
		currentActiveList.push(toDoList);
	} else if (currentListName == "inProgress"){
		currentActiveList.push(list_inProgress);
		currentActiveList.push(inProgressList);
	} else {
		currentActiveList.push(list_done);
		currentActiveList.push(doneList);
	}

	return currentActiveList;
}

function produceNewList(currentActiveList, originalListUL){
	copyULdiv = originalListUL.cloneNode();
	for(let task of currentActiveList){
		copyULdiv.appendChild(task);
	}
	return copyULdiv;
}


function moveUp(event) {
	let currentActiveList = findCurrentActiveList()[0];
	const originalList = findCurrentActiveList()[1];
	const originalListUL = originalList.getElementsByTagName('ul')[0]

	const currentIndex = currentActiveList.indexOf(currentSelectedElement);

	if (currentIndex > 0) {
		const newIndex = currentIndex - 1;

		let sourceNode = currentActiveList[currentIndex];
		let targetNode = currentActiveList[newIndex];

		currentActiveList[newIndex] = sourceNode;
		currentActiveList[currentIndex] = targetNode;
	}

	let newList = produceNewList(currentActiveList, originalListUL);

	originalList.removeChild(originalListUL);

	originalList.appendChild(newList);

	currentSelectedElement.focus();
}


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
