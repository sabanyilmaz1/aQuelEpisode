import { Link, useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'

// Fonction firebase
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase-config'

//Context
import { UserContext } from '../../utils/Usercontext'

//Style
import { NavContainer, TextLink, HomeLogo, LogoutBtn } from './style'

//Logo
import logo from '../../assets/logoHeader.svg'

function Header() {
  const { displayHeader, currentUser, HideHeader } = useContext(UserContext)

  const navigate = useNavigate()

  // Deconnexion de l'utilisateur, donc rediriger vers la page de connexion
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

  // Si un utilisateur est connecté alors l'header est affiché via cette fonction
  if (currentUser) {
    HideHeader('connecté')
  }

  return (
    <>
      {displayHeader && (
        <NavContainer>
          <Link to="/private/private-home">
            <HomeLogo src={logo} />
          </Link>

          <Link to="/private/addseries">
            <TextLink>Ajouter une série</TextLink>
          </Link>

          <Link to="/private/myseries">
            <TextLink>Mes Séries</TextLink>
          </Link>
          <Link to="/private/episodestosee">
            <TextLink>À voir</TextLink>
          </Link>
          <TextLink>À venir</TextLink>
          <TextLink>Les meilleurs séries</TextLink>
          <LogoutBtn>
            <TextLink onClick={logOut}>Se deconnecter</TextLink>
          </LogoutBtn>
        </NavContainer>
      )}
    </>
  )
}
export default Header
