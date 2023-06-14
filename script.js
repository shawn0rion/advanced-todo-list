// For ID selectors
const listOfLists = document.querySelector('#list-of-lists');
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
        const listTitle = event.target.querySelector('.list-title').innerText;
        const selectedListItem = document.querySelector('.list-item.selected');
        if (selectedListItem !== null) selectedListItem.classList.remove('selected') 
        // update data AND dom
        selectedListId = lists.find(list => list.name === listTitle).id;
        console.log(selectedListId)
        event.target.classList.add('selected')
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


// render list
function render(){
    const listOfLists = document.querySelector('#list-of-lists');
    clearContainer(listOfLists);

    lists.forEach(list => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.dataset.id = list.id;

        const checkbox = document.createElement('div');
        checkbox.className = 'checkbox';

        const listTitle = document.createElement('p');
        listTitle.className = 'list-title';
        listTitle.innerText = list.name;

        listItem.appendChild(checkbox);
        listItem.appendChild(listTitle);

        listOfLists.appendChild(listItem);
    });
}

// create list
function createList(name){
    return {id: lists.length + 1, name: name, tasks: []}
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
render();