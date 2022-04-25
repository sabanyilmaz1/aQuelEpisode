import { useContext } from 'react'
import { UserContext } from '../../utils/Usercontext'
import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'

export default function Private() {
  const { currentUser } = useContext(UserContext)

  //Sortir de la route privé si l'utilisateur n'est pas connecté
  if (!currentUser) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
