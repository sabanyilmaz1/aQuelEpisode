import styled from 'styled-components'

export const SeriesContainer = styled.div`
  width: 1350px;
  height: 250px;
  background: #758bfd;
  border-radius: 25px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 40px;
`
export const PictureSeries = styled.img`
  width: 200px;
  height: 200px;
  max-width: 100%;
  image-rendering: auto;
  margin: 20px;
  border-radius: 15px;
  border: 5px solid #f1f2f6;
`

export const InfoSerieContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const SeriesTitle = styled.h2`
  font-family: Bebas Neue;
  font-size: 46px;
  line-height: 43px;
  color: #f1f2f6;
  margin-top: 20px;
`
export const SeriesItems = styled.div`
  display: flex;
`
export const SeriesInfo = styled.span`
  width: 328px;
  height: 28px;
  font-family: Bebas Neue;
  font-size: 20px;
  color: #000000;
  margin-top: 10px;
`
export const ProgressionText = styled.span`
  width: 328px;
  height: 28px;
  font-family: Bebas Neue;
  font-size: 20px;
  color: #000000;
`
export const ProgressionContainer = styled.div`
  flex-direction: column;
  margin-top: 20px;
  margin-left: 400px;
`
export const ProgressionBar = styled.progress`
  width: 300px;
  height: 40px;
`
