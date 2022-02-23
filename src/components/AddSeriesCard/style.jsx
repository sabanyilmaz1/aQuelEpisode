import styled from 'styled-components'

export const SerieContainer = styled.div`
  background: #758bfd;
  border-radius: 20px;
  width: 279px;
  height: 451px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const PictureSerie = styled.img`
  width: 400px;
  height: 400px;
  max-width: 100%;
  image-rendering: auto;
  margin-top: 1px;
  border-radius: 15px;
  width: 219px;
  height: 326px;
  border: 5px solid #f1f2f6;
`

export const SerieTitle = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  letter-spacing: -0.095em;
  color: #f1f2f6;
  margin-top: 10px;
  text-align: center;
  line-height: 1.5em;
`

export const AddBtn = styled.button`
  background: #ff8600;
  border-radius: 20px;
  width: 200px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: rgba(255, 134, 0, 0.5);
  }
  &:active {
    transform: scale(1.03) translateX(-10%);
  }
`

export const AddText = styled.span`
  font-family: Bebas Neue;
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  text-align: center;
`
export const TitleBtn = styled.button`
  background: transparent;
  border: none !important;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: rgba(255, 134, 0, 0.5);
  }
  &:active {
    transform: scale(1.03) translateX(-10%);
  }
`
export const PageContainer = styled.div`
  z-index: 1;
`
