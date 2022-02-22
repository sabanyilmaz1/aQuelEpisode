import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom'
import HomeSignIn from './pages/HomeSignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import { UserContextProvider } from './utils/Usercontext'
import Private from './pages/Private'
import PrivateHome from './pages/Private/PrivateHome'
import MySeries from './pages/Private/MySeries'
import AddSeries from './pages/Private/AddSeries'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomeSignIn />} />
          <Route path="/inscription" element={<SignUp />} />
          <Route path="/private" element={<Private />}>
            <Route path="/private/private-home" element={<PrivateHome />} />
            <Route path="/private/myseries" element={<MySeries />} />
            <Route path="/private/addseries" element={<AddSeries />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
