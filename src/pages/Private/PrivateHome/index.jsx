import React, { useContext } from 'react'
import { UserContext } from '../../../utils/context'

export default function PrivateHome() {
  const { currentUser } = useContext(UserContext)

  return (
    <div>
      <h1>Je suis connecté sur le compte - id : {currentUser.uid}! </h1>
    </div>
  )
}
