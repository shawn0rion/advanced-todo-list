// For ID selectors
const listOfLists = document.querySelector('#list-of-lists');
const listOfTasks = document.querySelector('#list-of-tasks');
const listForm = document.querySelector('#list-form');
const listInput = document.querySelector('#list-input');
const largeTitle = document.querySelector('#large-title');
const taskCount = document.querySelector('#task-count');
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');

// For class selectors (querySelectorAll as there are multiple elements with these classes)
const listItems = document.querySelectorAll('.list-item');
const taskItems = document.querySelectorAll('.task-item');

taskItems.forEach(task => {
    task.addEventListener('click', event => {
        task.classList.toggle('completed')
    })
})

// global data
const lists = [];
let selectedListId = '';

// select list
listOfLists.addEventListener('click', event => {
    if (event.target.tagName === 'LI'){
        const listTitle = event.target.textContent;
        const selectedListEl = document.querySelector('.list-item.selected');
        if (selectedListEl !== null) selectedListEl.classList.remove('selected') 

        const selectedList = lists.find(list => list.name === listTitle);
        // update global variable and display this list
        selectedListId = selectedList.id;
        event.target.classList.add('selected')
        renderTasks(selectedList);
    }
})

// create list event
listForm.addEventListener('submit', event => {
    event.preventDefault();
    // create list
    const list = createList(listInput.value);
    lists.push(list);
    render();
    // reset DOM
    listInput.value = ''
})

// create task event

taskForm.addEventListener('submit', e => {
    console.log('l')
    e.preventDefault();
    const selectedList = lists.find(list => list.id == selectedListId);
    console.log('list: ', selectedList);
    const task = createTask(taskInput.value, selectedList);

    selectedList.tasks.push(task);
    renderTasks(selectedList);
    taskInput.value = '';
})


function renderTasks(selectedList){
    clearContainer(listOfTasks);
    const largeTitle = document.getElementById('large-title');
    const taskCount = document.getElementById('task-count');

    // update header
    const numTasks = selectedList.tasks.length;
    largeTitle.textContent = selectedList.name;
    taskCount.textContent = `${numTasks} task${numTasks > 1 ? 's' : ''} remaining`;

    // Looping through tasks and creating task items
    selectedList.tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.textContent = task.name;
        taskItem.addEventListener('click', event => {
            if (task.completed){
                taskItem.classList.remove('completed')
                task.completed = false;
            } else{
                taskItem.classList.add('completed')
                task.completed = true;
            }
        })
        if (task.completed) taskItem.classList.add('completed');

        listOfTasks.appendChild(taskItem);
    });
}

// render list
function render(){
    const listOfLists = document.querySelector('#list-of-lists');
    clearContainer(listOfLists);
    let selectedList = '';
    lists.forEach(list => {
        if (list.id == selectedListId) selectedList = list;

        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.dataset.id = list.id;
        listItem.textContent = list.name;

        listOfLists.appendChild(listItem);
    });
    renderTasks(selectedList);
}



// create list
function createList(name){
    return {id: lists.length + 1, name: name, tasks: []}
}

function createTask(name, list){
    return {id: list.tasks.length + 1, name, completed: false}
}

// helper
function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}



lists.push(createList('one'))
lists.push(createList('two'))
lists.push(createList('three'))
selectedListId =1 
render();