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
    <div>
      <LogoWrapper>
        <img src={logo} alt="Logo" />
      </LogoWrapper>

      <DescriptionContainer>
        <DescriptionText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          scelerisque arcu eget arcu mollis, at consectetur dui malesuada. Sed a
          magna fringilla, convallis ex nec, rhoncus diam. Suspendisse porttitor
          imperdiet dui, a sodales dolor tincidunt maximus. Maecenas eu lorem
          consectetur est lacinia dapibus id faucibus nibh. In feugiat orci
          eros, nec sodales dui rhoncus eu. Nullam eget elit in enim fermentum
          volutpat at eget ante. Cras placerat eros id dolor accumsan, a dapibus
          eros porta. Ut ante erat, luctus malesuada euismod ac, maximus vel
          libero.
        </DescriptionText>
      </DescriptionContainer>

      <ConnexionContainer>
        <ConnexionText>Connexion</ConnexionText>

        <div>
          <form ref={formRef} onSubmit={handleForm}>
            <div>
              <label htmlFor="SignInEmail"></label>
              <TextInput
                ref={addInputs}
                id="SignInEmail"
                name="email"
                type="email"
                placeholder="Votre email ..."
                required
              />
            </div>

            <div>
              <label htmlFor="PwdEmail"></label>
              <TextInput
                ref={addInputs}
                id="PwdEmail"
                name="pwd"
                type="password"
                placeholder="Votre mot de passe ..."
                required
              />
            </div>
            <p>{validation}</p>

            <SuivantBtn>
              <SuivantText>Suivant</SuivantText>
            </SuivantBtn>
          </form>
          <FooterSignIn>
            <FooterBtn>
              <Link style={{ textDecoration: 1 }} to="/inscription">
                <FooterText>Créer un compte</FooterText>{' '}
              </Link>
            </FooterBtn>
            <FooterBtn>
              {' '}
              <FooterText>Mot de passe oublié ?</FooterText>
            </FooterBtn>
          </FooterSignIn>
        </div>
      </ConnexionContainer>
    </div>
  )
}

export default HomeSignIn
