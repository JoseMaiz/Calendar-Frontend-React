import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import './styles.css'
import { CalendarApp } from './CalendarApp.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <CalendarApp />
  // </React.StrictMode>,
)
