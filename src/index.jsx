import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom'
import HomeSignIn from './pages/HomeSignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import { UserContextProvider } from './utils/context'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomeSignIn />} />
          <Route path="/inscription" element={<SignUp />} />
        </Routes>
      </UserContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
