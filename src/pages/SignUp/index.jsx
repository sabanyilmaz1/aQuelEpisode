import React, { useState } from 'react'

//Logo
import logo from '../../assets/logoHome.svg'

//Style
import { LogoWrapper } from './style'
import { InscriptionSpan } from './style'
import { InscriptionBloc } from './style'
import { TextInput } from './style'
import { SuivantBtn } from './style'
import { SuivantSpan } from './style'

function SignUp() {
  // Afficher un message d'alerte en cas de problème de saisi
  const [validation, setValidation] = useState('')
  return (
    <div>
      <LogoWrapper>
        <img src={logo} alt="Logo" />
      </LogoWrapper>

      <InscriptionBloc>
        <InscriptionSpan>Inscription</InscriptionSpan>

        <div>
          <form>
            <div>
              <label htmlFor="SignUpEmail"></label>
              <TextInput
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
                id="PwdEmail2"
                name="pwd2"
                type="password"
                placeholder="Confirmer votre mot de passe ..."
                required
              />
            </div>
            <p>{validation}</p>

            <SuivantBtn>
              <SuivantSpan>Suivant</SuivantSpan>
            </SuivantBtn>
          </form>
        </div>
      </InscriptionBloc>
    </div>
  )
}

export default SignUp
