'use client'

import { useState } from 'react'
import './NameManager.css'

const NameManager = ({ initialNames, onSave, onCancel }) => {
  const [names, setNames] = useState([...initialNames])
  const [newName, setNewName] = useState('')

  const handleAddName = (e) => {
    e.preventDefault()
    if (newName.trim() && !names.includes(newName.trim())) {
      setNames([...names, newName.trim()])
      setNewName('')
    }
  }

  const handleRemoveName = (index) => {
    setNames(names.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (names.length > 0) {
      onSave(names)
    }
  }

  return (
    <div className="name-manager">
      <h2>Edit Names</h2>
      
      <form onSubmit={handleAddName} className="add-name-form">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Add new name..."
          className="name-input"
        />
        <button type="submit" className="add-button">
          ➕ Add
        </button>
      </form>

      <div className="names-list">
        {names.length === 0 ? (
          <p className="empty-message">No names yet. Add some names above!</p>
        ) : (
          names.map((name, index) => (
            <div key={index} className="name-item">
              <span className="name-text">{name}</span>
              <button
                onClick={() => handleRemoveName(index)}
                className="remove-button"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      <div className="action-buttons">
        <button onClick={handleSave} className="save-button" disabled={names.length === 0}>
          💾 Save Changes
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default NameManager
