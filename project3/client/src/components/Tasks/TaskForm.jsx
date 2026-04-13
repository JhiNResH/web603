import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function TaskForm({ onSaved, editTask, onCancel }) {
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description || '',
        priority: editTask.priority
      });
    } else {
      setForm({ title: '', description: '', priority: 'medium' });
    }
    setErrors({});
    setServerError('');
  }, [editTask]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    else if (form.title.trim().length > 100) e.title = 'Title must be under 100 characters';
    return e;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    setServerError('');
    try {
      let res;
      if (editTask) {
        res = await api.put(`/tasks/${editTask._id}`, form);
        onSaved(res.data, true);
      } else {
        res = await api.post('/tasks', form);
        onSaved(res.data, false);
        setForm({ title: '', description: '', priority: 'medium' });
      }
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-card card mb-4">
      <div className="card-header text-white py-3">
        <h5 className="mb-0">{editTask ? '✏️ Edit Task' : '＋ New Task'}</h5>
      </div>
      <div className="card-body">
        {serverError && <div className="alert alert-danger py-2">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title *</label>
            <input
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              maxLength={100}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add details (optional)"
              rows={3}
              maxLength={500}
            />
            <div className="form-text text-end">{form.description.length}/500</div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Priority</label>
            <select
              className="form-select"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary flex-grow-1"
              disabled={loading}
            >
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Saving...</>
                : editTask ? 'Update Task' : 'Add Task'
              }
            </button>
            {editTask && (
              <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
