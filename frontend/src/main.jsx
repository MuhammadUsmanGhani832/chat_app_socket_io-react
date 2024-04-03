import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { AuthProvider } from "./context/AuthContext.jsx"
import { SocketContextProvider } from "./context/SocketContext.jsx"
import { NotificationProvider } from './context/NotificationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketContextProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </SocketContextProvider>
    </AuthProvider>
  </React.StrictMode>
)
