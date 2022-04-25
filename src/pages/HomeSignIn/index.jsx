import React, { useState, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

//Context
import { UserContext } from '../../utils/Usercontext'

//Logo
import logo from '../../assets/logoHome.svg'

//Style
import {
  LogoWrapper,
  DescriptionContainer,
  DescriptionText,
  ConnexionText,
  ConnexionContainer,
  TextInput,
  SuivantBtn,
  SuivantText,
  FooterBtn,
  FooterSignIn,
  FooterText,
  PageWrapper,
  SuivantContainer,
  ValidationStyle,
} from './style'

function HomeSignIn() {
  // Afficher un message d'alerte en cas de problème de saisi
  const [validation, setValidation] = useState('')

  const navigate = useNavigate()
  const { signInFirebase, HideHeader } = useContext(UserContext)

  HideHeader('nonConnecté') // On masque l'header pour cette page

  // La variable inputs stocke les inputs via la fonction addInputs
  const inputs = useRef([])
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el)
    }
  }

  const formRef = useRef()
  //la fonction qui gere le form pour connecter l'utilisateur
  const handleForm = async (e) => {
    e.preventDefault()
    try {
      await signInFirebase(inputs.current[0].value, inputs.current[1].value)
      setValidation('')

      //Redirection vers la page d'accueil en mode connecté si la connexion est bonne
      navigate('/private/private-home')
    } catch {
      setValidation("Erreur ! l'email ou le mot de passe est incorrect")
    }
  }

  return (
    <PageWrapper>
      <LogoWrapper>
        <img src={logo} alt="Logo" />
      </LogoWrapper>

      <DescriptionContainer>
        <DescriptionText>
          Si vous voulez suivre vos séries et ne plus rater aucun épisode,
          inscris-toi vite et commence à ajouter tes séries préférées.
        </DescriptionText>
      </DescriptionContainer>

      <ConnexionContainer>
        <ConnexionText>Connexion</ConnexionText>
        <form ref={formRef} onSubmit={handleForm}>
          <label htmlFor="SignInEmail"></label>
          <TextInput
            ref={addInputs}
            id="SignInEmail"
            name="email"
            type="email"
            placeholder="Votre email ..."
            required
          />

          <label htmlFor="PwdEmail"></label>
          <TextInput
            ref={addInputs}
            id="PwdEmail"
            name="pwd"
            type="password"
            placeholder="Votre mot de passe ..."
            required
          />
          <p>
            <ValidationStyle>{validation}</ValidationStyle>
          </p>
          <SuivantContainer>
            <SuivantBtn>
              <SuivantText>Suivant</SuivantText>
            </SuivantBtn>
          </SuivantContainer>
        </form>
        <FooterSignIn>
          <FooterBtn>
            <Link style={{ textDecoration: 1 }} to="/inscription">
              <FooterText>Créer un compte</FooterText>{' '}
            </Link>
          </FooterBtn>
        </FooterSignIn>
      </ConnexionContainer>
    </PageWrapper>
  )
}

export default HomeSignIn
