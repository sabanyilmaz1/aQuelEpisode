import React, { useState, useRef, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

//Context
import { UserContext } from '../../utils/Usercontext'

//Logo
import logo from '../../assets/logoHome.svg'

//Style
import { LogoWrapper } from './style'
import { InscriptionSpan } from './style'
import { InscriptionBloc } from './style'
import { TextInput } from './style'
import { SuivantBtn } from './style'
import { SuivantSpan } from './style'
import { ValidationSpan } from './style'

function SignUp() {
  // Afficher un message d'alerte en cas de problème de saisi
  const [validation, setValidation] = useState('')

  // Partie Serveur qui gere l'inscription
  // à Firebase et redirige vers la page d'accueil en mode connecté
  const navigate = useNavigate()
  const { signUpFirebase, HideHeader } = useContext(UserContext)

  HideHeader('nonConnecté')

  const inputs = useRef([])
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el)
    }
  }
  const formRef = useRef()
  const handleForm = async (e) => {
    e.preventDefault()

    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation('6 caractères minimum')
      return
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation('Les deux mots de passes ne correspodent pas')
      return
    }

    try {
      await signUpFirebase(inputs.current[0].value, inputs.current[1].value)
      formRef.current.reset()
      setValidation('')
      //console.log(cred)
      navigate('/private/private-home')
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setValidation('Email invalide')
      }

      if (err.code === 'auth/email-already-in-use') {
        setValidation('Email deja utilisé')
      }
    }
  }

  return (
    <div>
      <LogoWrapper>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </LogoWrapper>

      <InscriptionBloc>
        <InscriptionSpan>Inscription</InscriptionSpan>

        <div>
          <form ref={formRef} onSubmit={handleForm}>
            <div>
              <label htmlFor="SignUpEmail"></label>
              <TextInput
                ref={addInputs}
                id="SignUpEmail"
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

            <div>
              <label htmlFor="PwdEmail2"></label>
              <TextInput
                ref={addInputs}
                id="PwdEmail2"
                name="pwd2"
                type="password"
                placeholder="Confirmer votre mot de passe ..."
                required
              />
            </div>
            <ValidationSpan className="text-danger">
              {validation}
            </ValidationSpan>
            <div>
              <SuivantBtn>
                <SuivantSpan>Suivant</SuivantSpan>
              </SuivantBtn>
            </div>
          </form>
        </div>
      </InscriptionBloc>
    </div>
  )
}

export default SignUp
