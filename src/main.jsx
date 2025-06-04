import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import api from "../src/axios.js";
import {LanguageProvider} from '../src/LanguageProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider api={api}>
    <App />
    </LanguageProvider>
  </StrictMode>,
)