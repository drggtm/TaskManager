async function fetchTasks() {
    try {
      const response = await fetch('/api/tasks');
      const tasks = await response.json();
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="p-3">${task.title}</td>
          <td class="p-3">${task.description || ''}</td>
          <td class="p-3">${new Date(task.createdAt).toLocaleString()}</td>
        `;
        taskList.appendChild(row);
      });
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  }
  
  async function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
  
    if (!title) {
      alert('Title is required');
      return;
    }
  
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      if (response.ok) {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        fetchTasks(); // Refresh task list
      } else {
        alert('Error adding task');
      }
    } catch (err) {
      console.error('Error adding task:', err);
      alert('Error adding task');
    }
  }
  
  // Load tasks on page load
  document.addEventListener('DOMContentLoaded', fetchTasks);