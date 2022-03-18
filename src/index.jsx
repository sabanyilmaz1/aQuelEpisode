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
import EpisodesToSee from './pages/Private/EpisodesToSee'
import MySeriesInDetail from './pages/Private/MySeriesInDetail'
import SeasonInDetail from './pages/Private/SeasonInDetail'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomeSignIn />} />
          <Route exact path="/inscription" element={<SignUp />} />
          <Route exact path="/private" element={<Private />}>
            <Route
              exact
              path="/private/private-home"
              element={<PrivateHome />}
            />
            <Route exact path="/private/myseries" element={<MySeries />} />
            <Route exact path="/private/addseries" element={<AddSeries />} />
            <Route
              exact
              path="/private/episodestosee"
              element={<EpisodesToSee />}
            />
            <Route
              exact
              path="/private/myseries/details"
              element={<MySeriesInDetail />}
            />
            <Route
              exact
              path="/private/myseries/details/season"
              element={<SeasonInDetail />}
            />
          </Route>
        </Routes>
      </UserContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
