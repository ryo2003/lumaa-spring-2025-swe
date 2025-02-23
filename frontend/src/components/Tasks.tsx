// frontend/src/components/Tasks.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

interface TasksProps {
  token: string;
}

const Tasks: React.FC<TasksProps> = ({ token }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks`,
        { title: newTaskTitle, description: newTaskDesc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
      setNewTaskTitle('');
      setNewTaskDesc('');
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  const updateTask = async (taskId: number, updatedFields: Partial<Task>) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/${taskId}`,
        updatedFields,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map(t => (t.id === taskId ? res.data : t)));
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDesc(task.description || '');
  };

  const handleEditSave = async () => {
    if (editingTask) {
      await updateTask(editingTask.id, { title: editTitle, description: editDesc, isComplete: editingTask.isComplete });
      setEditingTask(null);
    }
  };

  const handleEditCancel = () => {
    setEditingTask(null);
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <div>
        <input
          placeholder="Task title"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
        />
        <input
          placeholder="Task description"
          value={newTaskDesc}
          onChange={e => setNewTaskDesc(e.target.value)}
        />
        <button onClick={createTask}>Create Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {editingTask && editingTask.id === task.id ? (
              <div>
                <input
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <input
                  value={editDesc}
                  onChange={e => setEditDesc(e.target.value)}
                />
                <button onClick={handleEditSave}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
              </div>
            ) : (
              <div>
                <span style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
                  {task.title} {task.description && `- ${task.description}`}
                </span>
                <button
                  onClick={() =>
                    updateTask(task.id, {
                      title: task.title,
                      description: task.description,
                      isComplete: !task.isComplete,
                    })
                  }
                >
                  {task.isComplete ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
