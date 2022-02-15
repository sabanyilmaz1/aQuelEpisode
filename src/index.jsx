import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom'
import HomeSignIn from './pages/HomeSignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeSignIn />} />
        <Route path="/inscription" element={<SignUp />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
