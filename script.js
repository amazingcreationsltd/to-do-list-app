const inputBox = document.getElementById("input_box");
const listContainer = document.getElementById("list_Container");

// Function to load tasks from localStorage
function loadTasks() {
    // Check if there are tasks stored in localStorage
    if (localStorage.getItem('tasks')) {
        // Parse the stored JSON string into an array of tasks
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        
        // Loop through the tasks and create DOM elements for each
        tasks.forEach(task => {
            createTaskElement(task);
        });
    }
}

// Function to save tasks to localStorage
function saveTasks() {
    // Get all the task elements currently in the DOM
    const taskElements = document.querySelectorAll('.list-container');
    
    // Create an array to store task data
    const tasks = [];
    
    // Iterate over each task element to extract task data
    taskElements.forEach(taskElement => {
        const taskText = taskElement.querySelector('.task').textContent;
        tasks.push(taskText);
    });
    
    // Store the tasks array in localStorage as a JSON string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a new task element
function createTaskElement(taskText) {
    // Create the necessary structure
    let listContainerDiv = document.createElement("div");
    listContainerDiv.className = "list-container";
    
    let listBoxDiv = document.createElement("div");
    listBoxDiv.className = "list-box";
    
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.textContent = taskText;

    // Add event listener to toggle task-checked class when the task is clicked
    taskDiv.addEventListener('click', function() {
        taskDiv.classList.toggle("task-checked");
        saveTasks(); // Save tasks whenever a task is toggled
    });

    let crossButtonDiv = document.createElement("div");
    crossButtonDiv.className = "cross-button";
    
    let crossIconSpan = document.createElement("span");
    crossIconSpan.className = "cross-icon";
    
    let crossIcon = document.createElement("i");
    crossIcon.className = "ri-delete-bin-5-fill";
    
    // Add event listener to remove task when dustbin icon is clicked
    crossIconSpan.addEventListener('click', function() {
        listContainer.removeChild(listContainerDiv);
        saveTasks(); // Save tasks after removing a task
    });

    // Append the dustbin icon to the cross icon span
    crossIconSpan.appendChild(crossIcon);
    
    // Append the task div and cross button div to the list box div
    listBoxDiv.appendChild(taskDiv);
    listBoxDiv.appendChild(crossButtonDiv);
    
    // Append the cross icon span to the cross button div
    crossButtonDiv.appendChild(crossIconSpan);
    
    // Append the list box div to the list container div
    listContainerDiv.appendChild(listBoxDiv);
    
    // Insert the final list container div at the beginning of the listContainer
    listContainer.insertBefore(listContainerDiv, listContainer.firstChild);
}

// Function to add a new task
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        createTaskElement(inputBox.value);
        saveTasks(); // Save tasks after adding a new task
        inputBox.value = ''; // Clear the input box after adding the task
    }
}

// Load tasks when the page initially loads
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});
