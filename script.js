var add = document.getElementById('addToDo');
var input = document.getElementById('inputField');
var toDoContainer = document.getElementById('toDoContainer');

// Retrieve tasks from local storage or set to an empty array if not available
var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

add.addEventListener('click', addItem);
input.addEventListener('keypress', function (e) {
    if (e.key == "Enter") {
        addItem();
    }
});

function addItem() {
    const item_value = input.value;
    const item = document.createElement('div');
    item.classList.add('item');

    const item_content = document.createElement('div');
    item_content.classList.add('content');

    item.appendChild(item_content);

    const incompleteButton = document.createElement('button');
    incompleteButton.classList.add('incomplete', 'btn', 'btn-secondary');
    incompleteButton.type = "button";
    incompleteButton.innerText = 'Incomplete';

    const input_item = document.createElement('input');
    input_item.classList.add('text');
    input_item.type = 'text';
    input_item.value = item_value;
    input_item.setAttribute('readonly', 'readonly');
    item_content.appendChild(incompleteButton);
    item_content.appendChild(input_item);

    const item_action = document.createElement('div');
    item_action.classList.add('actions');

    const edit_item = document.createElement('button');
    edit_item.classList.add('edit', 'btn', 'btn-success');
    edit_item.type = "button";
    edit_item.innerText = 'Edit';

    const delete_item = document.createElement('button');
    delete_item.classList.add('delete', 'btn', 'btn-danger', 'fa', 'fa-trash');

    item_action.appendChild(incompleteButton);
    item_action.appendChild(edit_item);
    item_action.appendChild(delete_item);

    item.appendChild(item_action);

    toDoContainer.appendChild(item);

    input.value = '';

    let completionToggled = false;

    input_item.addEventListener('dblclick', function () {
        if (!completionToggled) {
            toggleCompletion(incompleteButton, input_item);
            completionToggled = true;
        }
        updateLocalStorage();
    });

    incompleteButton.addEventListener('click', function () {
        if (!completionToggled) {
            toggleCompletion(incompleteButton, input_item);
            completionToggled = true;
        }
        updateLocalStorage();
    });

    edit_item.addEventListener('click', (e) => {
        if (edit_item.innerText.toLowerCase() == "edit") {
            edit_item.innerText = "Save";
            input_item.removeAttribute("readonly");
            input_item.focus();
        } else {
            edit_item.innerText = "Edit";
            input_item.setAttribute("readonly", "readonly");
            // Update the task in the tasks array
            const index = tasks.indexOf(item_value);
            if (index !== -1) {
                tasks[index] = input_item.value;
                updateLocalStorage();
            }
        }
    });

    delete_item.addEventListener('click', (e) => {
        toDoContainer.removeChild(item);
        // Remove the task from the tasks array
        const index = tasks.indexOf(item_value);
        if (index !== -1) {
            tasks.splice(index, 1);
            updateLocalStorage();
        }
    });

    // Store the task in the tasks array
    tasks.push({ value: item_value, completed: false });
    updateLocalStorage();
}

function toggleCompletion(button, input) {
    button.innerText = button.innerText === 'Incomplete' ? 'Completed' : 'Incomplete';
    button.style.backgroundColor = button.innerText === 'Incomplete' ? 'gray' : 'green';
    input.style.textDecoration = button.innerText === 'Completed' ? 'line-through' : 'none';
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage when the page loads
function loadTasksFromLocalStorage() {
    tasks.forEach(function (task) {
        const item = document.createElement('div');
        item.classList.add('item');

        const item_content = document.createElement('div');
        item_content.classList.add('content');

        item.appendChild(item_content);

        const incompleteButton = document.createElement('button');
        incompleteButton.classList.add('incomplete', 'btn', 'btn-secondary');
        incompleteButton.type = "button";
        incompleteButton.innerText = task.completed ? 'Completed' : 'Incomplete';

        const input_item = document.createElement('input');
        input_item.classList.add('text');
        input_item.type = 'text';
        input_item.value = task.value;
        input_item.setAttribute('readonly', 'readonly');
        item_content.appendChild(incompleteButton);
        item_content.appendChild(input_item);

        const item_action = document.createElement('div');
        item_action.classList.add('actions');

        const edit_item = document.createElement('button');
        edit_item.classList.add('edit', 'btn', 'btn-success');
        edit_item.type = "button";
        edit_item.innerText = 'Edit';

        const delete_item = document.createElement('button');
        delete_item.classList.add('delete', 'btn', 'btn-danger', 'fa', 'fa-trash');

        item_action.appendChild(incompleteButton);
        item_action.appendChild(edit_item);
        item_action.appendChild(delete_item);

        item.appendChild(item_action);

        toDoContainer.appendChild(item);

        let completionToggled = false;

        input_item.addEventListener('dblclick', function () {
            if (!completionToggled) {
                toggleCompletion(incompleteButton, input_item);
                completionToggled = true;
                updateLocalStorage();
            }
        });

        incompleteButton.addEventListener('click', function () {
            if (!completionToggled) {
                toggleCompletion(incompleteButton, input_item);
                completionToggled = true;
                updateLocalStorage();
            }
        });

        edit_item.addEventListener('click', (e) => {
            if (edit_item.innerText.toLowerCase() == "edit") {
                edit_item.innerText = "Save";
                input_item.removeAttribute("readonly");
                input_item.focus();
            } else {
                edit_item.innerText = "Edit";
                input_item.setAttribute("readonly", "readonly");
                // Update the task in the tasks array
                const index = tasks.findIndex(t => t.value === task.value);
                if (index !== -1) {
                    tasks[index].value = input_item.value;
                    updateLocalStorage();
                }
            }
        });

        delete_item.addEventListener('click', (e) => {
            toDoContainer.removeChild(item);
            // Remove the task from the tasks array
            const index = tasks.findIndex(t => t.value === task.value);
            if (index !== -1) {
                tasks.splice(index, 1);
                updateLocalStorage();
            }
        });
    });
}

// Load tasks from local storage when the page loads
loadTasksFromLocalStorage();
