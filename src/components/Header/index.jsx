import { Link, useLocation, useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'

// Fonction firebase
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase-config'

//Context
import { UserContext } from '../../utils/Usercontext'

//Style
import {
  NavContainer,
  TextLink,
  HomeLogo,
  LogoutBtn,
  LogoDiv,
  StyledLink1,
  StyledLink2,
  StyledLink3,
  StyledLink4,
  LogoutLink,
} from './style'

//Logo
import logo from '../../assets/logoHeader.svg'

function Header() {
  const {
    displayHeader,
    currentUser,
    HideHeader,
    clickedLink,
    setClickedLink,
  } = useContext(UserContext)

  const navigate = useNavigate()

  const { pathname } = useLocation()
  console.log(pathname)
  console.log(clickedLink)
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
          <LogoDiv>
            <Link to="/private/private-home">
              <HomeLogo src={logo} />
            </Link>
          </LogoDiv>

          <TextLink>
            <div
              onClick={() => {
                setClickedLink('/private/addseries')
              }}
            >
              <StyledLink1
                to="/private/addseries"
                url={pathname === '/private/addseries'}
              >
                Ajouter une série
              </StyledLink1>
            </div>

            <div
              onClick={() => {
                setClickedLink('/private/myseries')
              }}
            >
              <StyledLink2
                to="/private/myseries"
                url={pathname === '/private/myseries'}
              >
                Mes Séries
              </StyledLink2>
            </div>

            <div
              onClick={() => {
                setClickedLink('/private/episodestosee')
              }}
            >
              <StyledLink3
                to="/private/episodestosee"
                url={pathname === '/private/episodestosee'}
              >
                À voir
              </StyledLink3>
            </div>

            <div
              onClick={() => {
                setClickedLink('/private/episodescomingsoon')
              }}
            >
              <StyledLink4
                to="/private/episodescomingsoon"
                url={pathname === '/private/episodescomingsoon'}
              >
                À venir
              </StyledLink4>
            </div>

            <LogoutBtn>
              <LogoutLink onClick={logOut}>Se deconnecter</LogoutLink>
            </LogoutBtn>
          </TextLink>
        </NavContainer>
      )}
    </>
  )
}
export default Header
