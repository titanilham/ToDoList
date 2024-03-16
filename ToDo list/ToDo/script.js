document.addEventListener('DOMContentLoaded', function() {
  loadTasks();
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');

  taskList.innerHTML = '';

  tasks.forEach(function(task, index) {
    const li = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.textContent = `${index + 1}. ${task.name}`; // Добавляем нумерацию
    li.appendChild(taskText);

    if (task.completed) {
      li.classList.add('completed');
    }
    li.addEventListener('click', function() {
      toggleCompleted(index);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function(event) {
      event.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskName = taskInput.value.trim();

  if (taskName !== '') {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ name: taskName, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
  }
}

function toggleCompleted(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

document.getElementById('taskInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
