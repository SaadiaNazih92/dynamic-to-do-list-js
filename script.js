
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

        // Controlla se l'input non è vuoto.
        if (currentTaskText === '') {
            if (save) { // Mostra l'alert solo se l'utente prova a inserire un task vuoto.
                alert('Please enter a task.');
            }
            return; 
        }

        
        const li = document.createElement('li');
        li.textContent = currentTaskText;

        // Crea il pulsante "Remove".
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        
        // Assegna la classe usando il metodo richiesto dall'esercizio. ✅
        removeButton.classList.add('remove-btn');

        // Aggiunge il pulsante di rimozione all'elemento <li>.
        li.appendChild(removeButton);
        // Aggiunge l'elemento <li> completo alla lista <ul>.
        taskList.appendChild(li);
        
        // --- Gestione Local Storage ---
        // Se il flag 'save' è true, aggiorna Local Storage.
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(currentTaskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Pulisce il campo di input solo se si sta aggiungendo un nuovo task.
        if (save) {
            taskInput.value = '';
        }

        
        removeButton.addEventListener('click', function() {
            // Rimuove l'elemento <li> dal DOM.
            taskList.removeChild(li);

            // Aggiorna Local Storage rimuovendo il task.
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            // .filter() crea un nuovo array con tutti gli elementi tranne quello da rimuovere.
            storedTasks = storedTasks.filter(task => task !== currentTaskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        });
    }

    addButton.addEventListener('click', () => addTask());

    // Aggiunge un task quando il tasto "Invio" viene premuto nel campo di input.
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    
    loadTasks();
});