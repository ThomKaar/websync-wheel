import { useState, useRef, useEffect, useCallback } from 'react'
import './WheelSpinner.css'

const WheelSpinner = ({ names, onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef(null)

  const colors = [
    '#001a00', '#003300', '#004d00', '#006600',
    '#008000', '#009900', '#00b300', '#00cc00',
    '#002600', '#003d00'
  ]

  const spinWheel = useCallback(() => {
    if (isSpinning || names.length === 0) return;

    setIsSpinning(true);

    // Random spins between 5 and 8 full rotations
    const minSpins = 5
    const maxSpins = 8
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const degrees = spins * 360;

    // Random final position
    const extraDegrees = Math.random() * 360;
    const totalRotation = rotation + degrees + extraDegrees;

    setRotation(totalRotation);

    // Calculate which name was selected
    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const segmentAngle = 360 / names.length;
      // Adjusted to account for pointer at top
      const selectedIndex = Math.floor(((360 - normalizedRotation + segmentAngle / 2) % 360) / segmentAngle) % names.length;
      
      setIsSpinning(false);
      onSpinComplete(names[selectedIndex]);
    }, 4000);
  }, [isSpinning, names, rotation, onSpinComplete])

  // Add global keyboard event listener for Enter key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        spinWheel();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [spinWheel])

  if (names.length === 0) {
    return (
      <div className="wheel-container">
        <p className="no-names">Please add some names to spin the wheel!</p>
      </div>
    )
  }

  const segmentAngle = 360 / names.length

  return (
    <div className="wheel-container">
      <div className="wheel-pointer">▼</div>
      
      <div
        ref={wheelRef}
        className={`wheel ${isSpinning ? 'spinning' : ''}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
        }}
      >
        {names.map((name, index) => {
          const rotation = segmentAngle * index
          const color = colors[index % colors.length]
          const textDistance = names.length > 20 ? 80 : names.length > 15 ? 100 : 120
          
          return (
            <div
              key={index}
              className="wheel-segment"
              style={{
                transform: `rotate(${rotation}deg)`,
                background: color,
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`
              }}
            >
              <div
                className="segment-text"
                style={{
                  transform: `rotate(${segmentAngle / 2}deg) translateX(47%)`,
                  top: `${textDistance}px`,
                  fontSize: names.length > 25 ? '0.6rem' : names.length > 20 ? '0.7rem' : '0.8rem'
                }}
              >
                {name}
              </div>
            </div>
          )
        })}
        <div className="wheel-center"></div>
      </div>

      <button
        className="spin-button"
        onClick={spinWheel}
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'SPIN!'}
      </button>
      <p className="keyboard-hint">Press ENTER or SPACE to spin</p>
    </div>
  )
}

export default WheelSpinner

