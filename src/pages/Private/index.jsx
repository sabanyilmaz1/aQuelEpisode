import { useContext } from 'react'
import { UserContext } from '../../utils/context'
import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'

export default function Private() {
  const { currentUser } = useContext(UserContext)

  if (!currentUser) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
