document.addEventListener('DOMContentLoaded', () => {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

   
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
    
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText, save = true) {
        let currentTaskText;

        if (save) {
            currentTaskText = taskInput.value.trim();
        } else {
            currentTaskText = taskText;
        }

        if (currentTaskText === '') {
            alert('Please enter a task.');
            return; 
        }

        const li = document.createElement('li');

        li.textContent = currentTaskText;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn'; 
        li.appendChild(removeButton);
        taskList.appendChild(li);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(currentTaskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
        
        if (save) {
            taskInput.value = '';
        }
        removeButton.addEventListener('click', function() {
            taskList.removeChild(li);
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(task => task !== currentTaskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        });
    }
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    loadTasks();
});