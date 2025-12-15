'use client'

import { useState, useEffect, useRef } from 'react'
import WheelSpinner from './components/WheelSpinner'
import './components/WheelSpinner.css'
import './page.css'

const STORAGE_KEY = 'wheelSpinner_names'

// Default names list (fallback if S3 fetch fails)
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
  const [names, setNames] = useState(DEFAULT_NAMES);
  const [isLoading, setIsLoading] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const audioRef = useRef(null);
  let interval = null;

  // Fetch names from S3 on mount
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('/api/names')
        const data = await response.json()
        
        if (data.success && Array.isArray(data.names)) {
          setNames(data.names)
          // Also save to localStorage as cache
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.names))
        } else {
          // Fall back to localStorage if API fails
          const storedNames = localStorage.getItem(STORAGE_KEY)
          if (storedNames) {
            setNames(JSON.parse(storedNames))
          }
        }
      } catch (error) {
        console.error('Error fetching names:', error)
        // Fall back to localStorage
        const storedNames = localStorage.getItem(STORAGE_KEY)
        if (storedNames) {
          try {
            setNames(JSON.parse(storedNames))
          } catch (err) {
            console.error('Error parsing stored names:', err)
          }
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchNames()
  }, [])

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

  const handleSaveNames = (newNames) => {
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newNames))
    setNames(newNames)
  }

  const handleSpinComplete = (selectedName) => {
    // Play the Yahoo Yodel sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.volume = 0.2; // Set volume to 20%
      audioRef.current.play().catch(err => {
        console.log('Audio playback failed:', err);
      });
    }
    
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


  if (isLoading) {
    return (
      <div className="app">
        <div className="container">
          <h1 className="title">{'>'} WHEEL_SPINNER.EXE</h1>
          <div className="wheel-container">
            <div className="wheel-placeholder">
              <div className="loading-text">Loading...</div>
            </div>
            <button className="spin-button" disabled>
              SPIN!
            </button>
            <p className="keyboard-hint">Press ENTER or SPACE to spin</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">{'>'} WHEEL_SPINNER.EXE</h1>

        <WheelSpinner 
          names={names} 
          onSpinComplete={handleSpinComplete}
        />
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

      {/* audio element for Yodel sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/Yahoo_Yodel_3Second.wav" type="audio/wav" />
      </audio>
    </div>
  )
}
