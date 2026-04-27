import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import api from '../../services/api';

const FILTERS = ['all', 'active', 'done'];

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSaved = (savedTask, isEdit) => {
    setTasks(prev =>
      isEdit
        ? prev.map(t => t._id === savedTask._id ? savedTask : t)
        : [savedTask, ...prev]
    );
    setEditTask(null);
  };

  const handleToggle = async task => {
    const res = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
    setTasks(prev => prev.map(t => t._id === task._id ? res.data : t));
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this task?')) return;
    await api.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'done')   return t.completed;
    return true;
  });

  const done  = tasks.filter(t => t.completed).length;
  const total = tasks.length;

  return (
    <div className="row">
      {/* Form column */}
      <div className="col-lg-4 mb-4">
        <TaskForm
          onSaved={handleSaved}
          editTask={editTask}
          onCancel={() => setEditTask(null)}
        />
      </div>

      {/* List column */}
      <div className="col-lg-8">
        {/* Stats bar */}
        <div className="stats-bar d-flex gap-4 mb-3">
          <span className="stat-item">Total: <strong>{total}</strong></span>
          <span className="stat-item">Done: <strong className="text-success">{done}</strong></span>
          <span className="stat-item">Active: <strong className="text-primary">{total - done}</strong></span>
        </div>

        {/* Filter */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 fw-bold">My Tasks</h5>
          <div className="btn-group btn-group-sm">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-btn btn ${filter === f ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Task list */}
        {loading ? (
          <div className="page-loading">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>{filter === 'all' ? 'No tasks yet. Add one!' : `No ${filter} tasks.`}</p>
          </div>
        ) : (
          filtered.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={setEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
