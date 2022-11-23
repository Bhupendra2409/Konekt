import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthContextProvier} from './context/AuthContext'



ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvier>
    <App />
    </AuthContextProvier>
  </React.StrictMode>,
  document.getElementById('root')
);


