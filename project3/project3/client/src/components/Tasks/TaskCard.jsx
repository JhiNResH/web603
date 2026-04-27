import React from 'react';

const PRIORITY_BADGE = {
  low:    { label: 'Low',    cls: 'bg-success' },
  medium: { label: 'Medium', cls: 'bg-warning text-dark' },
  high:   { label: 'High',   cls: 'bg-danger' }
};

function TaskCard({ task, onDelete, onToggle, onEdit }) {
  const badge = PRIORITY_BADGE[task.priority] || PRIORITY_BADGE.medium;
  const date = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric'
  });

  return (
    <div className={`task-card card mb-3 priority-${task.priority} ${task.completed ? 'is-completed' : ''}`}>
      <div className="card-body py-3">
        <div className="d-flex align-items-start justify-content-between gap-2">

          {/* Checkbox + content */}
          <div className="d-flex align-items-start gap-3 flex-grow-1">
            <input
              type="checkbox"
              className="form-check-input mt-1 flex-shrink-0"
              checked={task.completed}
              onChange={() => onToggle(task)}
              title="Mark complete"
            />
            <div>
              <p className={`task-title mb-0 ${task.completed ? 'done' : ''}`}>
                {task.title}
              </p>
              {task.description && (
                <p className="task-desc mb-0">{task.description}</p>
              )}
              <small className="text-muted">{date}</small>
            </div>
          </div>

          {/* Controls */}
          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <span className={`badge ${badge.cls}`}>{badge.label}</span>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => onEdit(task)}
              title="Edit"
            >
              ✏️
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(task._id)}
              title="Delete"
            >
              🗑️
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TaskCard;
