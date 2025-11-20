import { useState } from 'react'
import './NameManager.css'

const NameManager = ({ initialNames, onSave, onCancel, onPasswordSubmit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [names, setNames] = useState([...initialNames])
  const [newName, setNewName] = useState('')

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    const isValid = onPasswordSubmit(password)
    if (isValid) {
      setIsAuthenticated(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
      setPassword('')
    }
  }

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

  if (!isAuthenticated) {
    return (
      <div className="password-container">
        <h2>🔒 Enter Password</h2>
        <p className="password-hint">Enter the password to edit the names list</p>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`password-input ${passwordError ? 'error' : ''}`}
            autoFocus
          />
          {passwordError && (
            <p className="error-message">❌ Incorrect password. Please try again.</p>
          )}
          <div className="button-group">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
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

