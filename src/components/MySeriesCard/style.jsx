import styled from 'styled-components'

export const SeriesContainer = styled.div`
  width: 280px;
  height: 550px;
  background: #758bfd;
  border-radius: 25px;
  margin-left: 70px;
  margin-bottom: 50px;
  margin-right: 70px;
`

export const ItemsCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PictureSeries = styled.img`
  width: 240px;
  height: 320px;
  max-width: 100%;
  image-rendering: auto;
  margin-top: 15px;
  border-radius: 15px;
  border: 5px solid #f1f2f6;
`

export const InfoSerieContainer = styled.div`
  width: 322px;
  height: 38px;
  //margin-top: 1px;
`
export const SeriesTitle = styled.h2`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 110%;
  line-height: 25px;
  text-align: center;
  color: #f1f2f6;
`

export const SeriesTitleContainer = styled.div`
  margin-top: 20px;
`

export const SeriesInfo = styled.span`
  width: 328px;
  height: 28px;
  font-family: 'Montserrat';
  font-size: 15px;
  color: #000000;
  font-weight: 700;
`
export const SeriesInfoContainer = styled.div`
  margin-top: 10px;
`
export const ProgressionText = styled.span`
  width: 328px;
  height: 28px;
  font-family: Bebas Neue;
  font-size: 20px;
  color: #f1f2f6;
`
export const ProgressionContainer = styled.div`
  width: 150%;
  height: 20%;
  margin-left: 15px;
  margin-top: 10px;
`

export const DeleteText = styled.span`
  font-family: 'Montserrat';
  font-weight: 1000;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`
export const DeleteBtn = styled.button`
  background: #ff8600;
  border-radius: 20px;
`
export const DeleteDiv = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: end;
  margin-right: 17px;
`

export const TitleBtn = styled.button`
  background: transparent;
  //border: none !important;
  border: 5px solid #ff8600;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: rgba(255, 134, 0, 0.5);
  }
  &:active {
    transform: scale(1.03) translateX(-10%);
  }
`
