
const addNewProjectButton = document.getElementsByClassName("addButton")[0];
const addTaskButton = document.getElementsByClassName("addButton")[1];
var toDoTaskNumber = 0;
var projectNumber = 0;

function addToDoTextarea() {
	const newTask = document.createElement('textarea');
	newTask.classList.add("createNewTask" + toDoTaskNumber);
	return newTask;
}

function addToDoTask(){
	const newTaskForm = document.createElement('textarea');
	newTaskForm.classList.add("createNewTask" + toDoTaskNumber);
	newTaskForm.classList.add("tasks");
	newTaskForm.setAttribute("draggable", "true");

	
	const toDoList = document.getElementsByClassName("toDoList")[0];
	toDoList.appendChild(newTaskForm);
	toDoTaskNumber++;
}

function addNewProject() {
	const newProject = document.createElement('textarea');
	newProject.classList.add("createNewProject" + projectNumber);
	newProject.classList.add("projects");
	newProject.setAttribute("draggable", "true");

	const projectList = document.getElementsByClassName("sideBar")[0];
	projectList.appendChild(newProject);
	projectNumber++;
}

addTaskButton.addEventListener('click', ()=> addToDoTask());
addNewProjectButton.addEventListener('click', ()=> addNewProject());

// //make Project elements draggable
// const projectElement = document.getElementsByClassName('sideBar')[0];
// const projectDraggable =new Draggable.Draggable(projectElement, {
// 	draggable: '.projects'
// 	});

// //make tasks draggable
// const taskElement = document.getElementsByClassName('toDoList')[0];
// const tasksDraggable = new Draggable.Draggable(taskElement, {
// 	draggable: '.tasks'
// 	});

const tasks = document.getElementsByClassName('tasks')[0];
if(tasks){
	tasks.on('drag:start', ()=> console.log('dragging'));

}
// if(tasks){
// 	for(let task of tasks){
// 		console.log("here");
// 		task.on('drag:start', () => console.log('drag:start'));
// 	}
// }	

//I NEED HELP HERE!

// draggable.on('drag:start', () => console.log('drag:start'));
// draggable.on('drag:move', () => console.log('drag:move'));
// draggable.on('drag:stop', () => console.log('drag:stop'));

const toDoList = document.getElementsByClassName('toDoList')[0];
const inProgressList = document.getElementsByClassName('inProgressList')[0];
const doneList = document.getElementsByClassName('doneList')[0];

const toDoListWidth = toDoList.clientWidth;
const toDoListHeight = toDoList.clientHeight;
console.log("width: " + toDoListWidth, "height: " + toDoListHeight);



