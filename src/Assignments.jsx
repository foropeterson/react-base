// Assignments.jsx
import React, { useState, useEffect } from 'react';

function Assignments({ userType }) {
  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem('assignments');
    return savedAssignments ? JSON.parse(savedAssignments) : [];
  });
  const [newAssignment, setNewAssignment] = useState('');
  const [editingAssignment, setEditingAssignment] = useState(null);

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (newAssignment.trim() === '') return;

    const newAssign = {
      id: Date.now(),
      title: newAssignment,
      description: '',
      dueDate: '',
      completed: false,
    };

    setAssignments([...assignments, newAssign]);
    setNewAssignment('');
  };

  const handleEditAssignment = (id, updatedAssignment) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id
        ? { ...assignment, ...updatedAssignment }
        : assignment
    );
    setAssignments(updatedAssignments);
  };

  const handleDeleteAssignment = (id) => {
    const updatedAssignments = assignments.filter(
      (assignment) => assignment.id !== id
    );
    setAssignments(updatedAssignments);
  };

  const handleToggleComplete = (id) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id
        ? { ...assignment, completed: !assignment.completed }
        : assignment
    );
    setAssignments(updatedAssignments);
  };

  return (
    <div className="assignments-container">
      {userType === 'teacher' ? (
        <div className="teacher-assignments">
          <h1>Manage Assignments</h1>
          <form onSubmit={handleAssignmentSubmit} className="assignment-form">
            <input
              type="text"
              placeholder="Enter assignment title..."
              value={newAssignment}
              onChange={(e) => setNewAssignment(e.target.value)}
              className="form-input"
            />
            <button type="submit" className="primary-button">
              Add Assignment
            </button>
          </form>
          <ul className="assignment-list">
            {assignments.length === 0 ? (
              <li className="no-assignments">No assignments available.</li>
            ) : (
              assignments.map((assignment) => (
                <li key={assignment.id} className="assignment-item">
                  <h3>{assignment.title}</h3>
                  <div className="assignment-actions">
                    <button
                      onClick={() => setEditingAssignment(assignment)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAssignment(assignment.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* Edit Assignment Modal */}
          {editingAssignment && (
            <div className="modal">
              <div className="modal-content">
                <h2>Edit Assignment</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditAssignment(editingAssignment.id, {
                      title: editingAssignment.title,
                    });
                    setEditingAssignment(null);
                  }}
                >
                  <input
                    type="text"
                    value={editingAssignment.title}
                    onChange={(e) =>
                      setEditingAssignment({
                        ...editingAssignment,
                        title: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                  <button type="submit" className="primary-button">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingAssignment(null)}
                    className="secondary-button"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="student-assignments">
          <h1>Your Assignments</h1>
          <ul className="assignment-list">
            {assignments.length === 0 ? (
              <li className="no-assignments">No assignments available.</li>
            ) : (
              assignments.map((assignment) => (
                <li key={assignment.id} className="assignment-item">
                  <h3
                    style={{
                      textDecoration: assignment.completed
                        ? 'line-through'
                        : 'none',
                    }}
                  >
                    {assignment.title}
                  </h3>
                  <button
                    onClick={() => handleToggleComplete(assignment.id)}
                    className={`complete-button ${
                      assignment.completed ? 'completed' : ''
                    }`}
                  >
                    {assignment.completed ? 'Undo' : 'Mark as Completed'}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Assignments;
