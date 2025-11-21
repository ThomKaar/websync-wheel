'use client'

import { useState, useEffect } from 'react'
import WheelSpinner from './components/WheelSpinner'
import NameManager from './components/NameManager'
import './page.css'

const EDIT_PASSWORD = 'admin123' // You can change this password
const STORAGE_KEY = 'wheelSpinner_names'

// Default names list
const DEFAULT_NAMES = [
  'Vineet',
  'Maneesha',
  'Megan',
  'Nazmus',
  'Paul',
  'RJ',
  'Roque',
  'Priyanka',
  'Sree',
  'Steve',
  'Sumit',
  'Veronica',
  'Victoria',
  'Kaleb',
  'Alex',
  'Andy',
  'Chi',
  'Thomas',
  'Hari',
  'Jiahao',
  'Andrew',
  'Christopher',
  'Chinmay',
  'Dana',
  'Dom',
  'Han',
  'Jui',
  'Kevin',
  'Khoa',
  'Tony',
  'Suraj',
  'Gabriel',
  'Justin',
  'Praneeth',
]

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function Home() {
  // Load names from local storage on component mount
  const [names, setNames] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedNames = localStorage.getItem(STORAGE_KEY)
      if (storedNames) {
        try {
          return JSON.parse(storedNames)
        } catch (err) {
          console.error('Error parsing stored names:', err)
          return DEFAULT_NAMES
        }
      }
    }
    return DEFAULT_NAMES
  });
  const [isEditing, setIsEditing] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  let interval = null;

  const handleCloseWinner = () => {
    setShowWinner(false);
    setTimeout(() => setWinner(null), 300);
  }

  // Handle Escape key to close winner modal
  useEffect(() => {
    const handleKeyPressCloseWinner = (e) => {
      if (showWinner && e.key === 'Escape') {
        handleCloseWinner()
      }
    }
    
    window.addEventListener('keydown', handleKeyPressCloseWinner)

    return () => {
      window.removeEventListener('keydown', handleKeyPressCloseWinner)
    }
  }, [showWinner])

  const handlePasswordSubmit = (password) => {
    if (password === EDIT_PASSWORD) {
      setIsEditing(true)
      return true
    }
    return false
  }

  const handleSaveNames = (newNames) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newNames))
    setNames(newNames)
    setIsEditing(false)
  }

  const handleSpinComplete = (selectedName) => {
    setShowWinner(true);
    setTimeout(() => scramblingText(selectedName), 300);
  };

  const scramblingText = (name) => {
    setIsScrambling(true);
    let iteration = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      setWinner(name
          .split("")
          .map((_letter, index) => {
              if (index < iteration) {
                  return name[index];
              }

              return letters[Math.floor(Math.random() * 26)];
          })
          .join(""));
      if (iteration >= name.length) {
          clearInterval(interval);
          setIsScrambling(false);
        }

        iteration += 1 / 3;
    }, 30);
  };


  return (
    <div className="app">
      <div className="container">
        <h1 className="title">{'>'} WHEEL_SPINNER.EXE</h1>

        {!isEditing ? (
          <>
            <WheelSpinner 
              names={names} 
              onSpinComplete={handleSpinComplete}
            />
            
            <button 
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
            Edit Names
            </button>
          </>
        ) : (
          <NameManager
            initialNames={names}
            onSave={handleSaveNames}
            onCancel={() => setIsEditing(false)}
            onPasswordSubmit={handlePasswordSubmit}
          />
        )}
      </div>

      {showWinner && (
        <div className="winner-modal" onClick={handleCloseWinner}>
          <div className="winner-content" onClick={(e) => e.stopPropagation()}>
            <h2>
              <span className="desktop-fluff">(〜^∇^)〜 </span> 
              Winner! 
              <span className="desktop-fluff">~( ˘▾˘~)</span>
            </h2>
            <div className="winner-name"><span className={isScrambling ? 'scrambling' : ''}>{winner}</span></div>
            <button className="close-button" onClick={handleCloseWinner}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

