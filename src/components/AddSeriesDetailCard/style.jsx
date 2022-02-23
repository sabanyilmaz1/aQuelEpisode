import styled from 'styled-components'

export const CardContainer = styled.div`
  min-width: 88vw;
  max-width: 88vw;
  min-height: 80vh;
  max-height: 80vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #758bfd;
  border-radius: 20px;
  z-index: 1000;
  outline: 140px solid rgba(240, 240, 240, 0.05);
`
export const CloseBtn = styled.button`
  background: transparent;
  border: none !important;
`
export const CloseDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const PictureSeries = styled.img`
  min-width: 20vw;
  max-width: 20vw;
  max-height: 50vh;
  min-height: 50vh;
  max-width: 100%;
  image-rendering: auto;
  margin-top: 0px;
  border-radius: 15px;
  width: 219px;
  height: 326px;
  border: 5px solid #f1f2f6;
`
export const Element = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
export const OverviewSeries = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  margin: 20px;
  line-height: 29px;
  letter-spacing: -0.005em;
  color: #f1f2f6;
`
export const OverviewDiv = styled.div`
  width: 100px;
  height: 100px;
`
