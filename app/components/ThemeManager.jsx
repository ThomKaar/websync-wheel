'use client'

import { useState } from 'react'
import './ThemeManager.css'
import { init } from 'next/dist/compiled/webpack/webpack'

const STORAGE_KEY = 'sync-theme';
const ThemeManager = ({ initalTheme }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
          const storedTheme = localStorage.getItem(STORAGE_KEY);
          if (storedTheme) {
            try {
              return JSON.parse(storedTheme);
            } catch (err) {
              console.error('Error parsing stored names:', err);
              return 'terminal';
            }
          }
        }
        return 'terminal';
      });

      const toggleTheme = () => {
        const newTheme = theme === 'terminal' ? 'classic' : 'terminal';
        setTheme(newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme);
        const app = document.querySelector('.app');
        app.class
        
      };

      return (        
        <button onClick={toggleTheme}>
            <div  className="toggle"/>
        </button>
      );

}

export default ThemeManager;

