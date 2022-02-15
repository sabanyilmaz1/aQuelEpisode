import { Link, useNavigate } from 'react-router-dom'
import React from 'react'

// Fonction firebase

import { signOut } from 'firebase/auth'
import { auth } from '../../firebase-config'

//Style

import { NavContainer } from './style'
import { TextLink } from './style'
import { TextDeconnecter } from './style'
import { HomeLogo } from './style'

//Logo
import logo from '../../assets/logoHeader.svg'

function Header() {
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
    <NavContainer>
      <Link to="/private/private-home">
        <HomeLogo src={logo} />
      </Link>

      <TextLink>Ajouter une série</TextLink>
      <TextLink>Mes Séries</TextLink>
      <TextLink>À voir</TextLink>
      <TextLink>À venir</TextLink>
      <TextLink>les meilleurs séries</TextLink>

      <TextDeconnecter onClick={logOut}> Se deconnecter</TextDeconnecter>
    </NavContainer>
  )
}

export default Header
