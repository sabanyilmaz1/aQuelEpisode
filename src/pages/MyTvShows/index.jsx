import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../utils/context'

import { getAllSerieByUser } from '../../database/Database'

//Components
import SerieInList from '../../components/SeriesInList'

//Style
import { TitlePage } from './style'

export default function MyTvShows() {
  const { currentUser } = useContext(UserContext)
  const idUserConnected = currentUser.uid
  const [series, setSeries] = useState([])

  useEffect(() => {
    getSeries()
  }, [])

  const getSeries = async () => {
    const data = await getAllSerieByUser(idUserConnected)
    setSeries(data.docs.map((doc) => ({ ...doc.data() })))
  }

  console.log(series)

  return (
    <div>
      <TitlePage>Mes Séries</TitlePage>
      <div>
        <SerieInList />
        <SerieInList />
        <SerieInList />
        <SerieInList />
      </div>
    </div>
  )
}
