import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PageWrapper = styled.div`
  height: 100vh;
  width: 100%;
`
export const WelcomeStyle = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: -0.095em;
  color: #27187e;
`

export const WelcomeWrapper = styled.div`
  margin-top: 50px;
  margin-left: 50px;
`
export const DetailWrapper = styled.div`
  width: 1100px;
  height: 500px;
  margin-left: 50px;
  margin-top: 40px;
  background: #758bfd;
  border-radius: 20px;
  padding: 20px;
`

export const DetailStyle = styled.span`
  margin: 20px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 46px;
  letter-spacing: -0.005em;
  color: #f1f2f6;
`
export const StyledLink = styled(Link)`
  font-family: Montserrat;
  font-weight: bold;
  color: #e0b943d3;
  text-decoration: none;
`
