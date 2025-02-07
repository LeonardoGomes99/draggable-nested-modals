import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ModalProvider} from './context/modal';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </StrictMode>
)
