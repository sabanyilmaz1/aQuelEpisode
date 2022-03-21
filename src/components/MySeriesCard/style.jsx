import styled from 'styled-components'

export const SeriesContainer = styled.div`
  width: 250px;
  height: 480px;
  background: #758bfd;
  border-radius: 25px;
  margin-left: 40px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`
export const PictureSeries = styled.img`
  width: 200px;
  height: 300px;
  max-width: 100%;
  image-rendering: auto;
  margin-top: 15px;
  margin-left: 25px;
  border-radius: 15px;
  border: 5px solid #f1f2f6;
`

export const InfoSerieContainer = styled.div`
  width: 322px;
  height: 38px;
  margin-top: 1px;
  margin-left: 0px;
`
export const SeriesTitle = styled.h2`
  font-family: 'Bebas Neue';
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 43px;
  text-align: center;
  color: #f1f2f6;
`

export const SeriesTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
`

export const SeriesItems = styled.div`
  display: flex;
  flex-direction: column;
`
export const SeriesInfo = styled.span`
  width: 328px;
  height: 28px;
  font-family: Bebas Neue;
  font-size: 19px;
  color: #000000;
`
export const SeriesInfoContainer = styled.div`
  margin-top: 1px;
  margin-left: 15%;
`
export const ProgressionText = styled.span`
  width: 328px;
  height: 28px;
  font-family: Bebas Neue;
  font-size: 20px;
  color: #f1f2f6;
`
export const ProgressionContainer = styled.div`
  margin-top: 1px;
  margin-left: 10%;
`

export const DeleteText = styled.span`
  font-family: 'Montserrat';
  font-weight: 900;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`
export const DeleteBtn = styled.button`
  background: #ff8600;
  border-radius: 20px;
  margin-left: 80px;
  margin-top: 10px;
  margin-right: 20px;
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
