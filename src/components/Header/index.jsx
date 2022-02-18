import { Link, useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'

// Fonction firebase

import { signOut } from 'firebase/auth'
import { auth } from '../../firebase-config'

//Context
import { UserContext } from '../../utils/context'

//Style

import { NavContainer } from './style'
import { TextLink } from './style'
import { HomeLogo } from './style'

//Logo
import logo from '../../assets/logoHeader.svg'

function Header() {
  const { displayHeader } = useContext(UserContext)

  const navigate = useNavigate()

  const logOut = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch {
      alert(
        'Pour plusieurs raisons, vous ne pouvez pas vous connecter , verifiez votre connexion Internet'
      )
    }
  }

  return (
    <>
      {displayHeader && (
        <NavContainer>
          <Link to="/private/private-home">
            <HomeLogo src={logo} />
          </Link>

          <TextLink>Ajouter une série</TextLink>
          <Link to="/private/mytvshows">
            <TextLink>Mes Séries</TextLink>
          </Link>
          <TextLink>À voir</TextLink>
          <TextLink>À venir</TextLink>
          <TextLink>les meilleurs séries</TextLink>

          <TextLink onClick={logOut}>Se deconnecter</TextLink>
        </NavContainer>
      )}
    </>
  )
}
export default Header
