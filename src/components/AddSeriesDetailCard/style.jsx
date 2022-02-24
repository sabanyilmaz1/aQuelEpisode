import styled from 'styled-components'

export const CardContainer = styled.div`
  min-width: 58vw;
  max-width: 88vw;
  min-height: 50vh;
  max-height: 80vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #758bfd;
  border-radius: 20px;
  z-index: 1000;
  outline: 140px solid rgba(240, 240, 240, 0.05);
  display: flex;
  justify-content: space-between;
`
export const CloseBtn = styled.button`
  background: transparent;
  border: none !important;
`
export const CloseDiv = styled.div``

export const PictureSeries = styled.img`
  min-width: 10vw;
  max-width: 10vw;
  max-height: 30vh;
  min-height: 30vh;
  max-width: 100%;
  border-radius: 15px;
  border: 5px solid #f1f2f6;
`
export const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  margin-left: 30px;
`
export const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-right: 30px;
  flex: 2;
  margin-top: 30px;
`
export const TitleSerie = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 900;
  font-size: 34px;
  line-height: 41px;
  letter-spacing: -0.095em;
  color: #f1f2f6;
  margin-top: 10px;
`

export const GenreSerie = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 900;
  font-size: 15px;
  line-height: 41px;
  letter-spacing: -0.095em;
  color: #010100;
`

export const OverviewTitle = styled.h2`
  font-family: 'Bebas Neue', sans-serif;
  font-style: normal;
  font-weight: 900;
  line-height: 41px;
  color: #010100;
  margin-left: 20px;
`

export const InformationTitle = styled.h2`
  font-family: 'Bebas Neue', sans-serif;
  font-style: normal;
  font-weight: 900;
  line-height: 41px;
  color: #010100;
  margin-left: 20px;
  margin-top: 20px;
`

export const OverviewSeries = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  margin: 20px;
  line-height: 29px;
  letter-spacing: -0.005em;
  color: #f1f2f6;
`
export const OverviewDiv = styled.div``

export const InfoText = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 29px;
  color: #f1f2f6;
`
