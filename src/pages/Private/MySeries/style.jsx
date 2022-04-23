import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const TitlePage = styled.h1`
  width: 424px;
  height: 118px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: bold;
  font-size: 55px;
  line-height: 88px;
  letter-spacing: -0.05em;
  color: #27187e;
  margin-left: 70px;
  margin-top: 20px;
`
export const PageDiv = styled.div`
  height: ${({ numberSeries }) => (numberSeries > 0 ? '100%' : '100vh')};
  width: 100%;
  display: flex;
  flex-direction: column;
`


export const SeriesDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const NoSeriesStyle = styled.div`
  height: 118px;
  font-family: 'Bebas Neue';
  font-size: 30px;
  color: #27187e;
  margin-left: 70px;
  margin-top: 10px;
`

export const StyledLink = styled(Link)`
  font-family: 'Bebas Neue';
  font-weight: bold;
  color: #e0b943d3;
  text-decoration: none;
`
