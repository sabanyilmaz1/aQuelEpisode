import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const NavContainer = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 50px;
  z-index: 12;
  background-color: #758bfd;
`
export const TextLink = styled.div`
  display: flex;
`

export const LogoutLink = styled.span`
  padding: 10px 15px;
  font-family: Montserrat;
  font-weight: bold;
  color: #f1f2f6;
  text-decoration: none;
  font-size: 17px;
  margin-left: 25px;
`

export const StyledLink1 = styled(Link)`
  padding: 10px 15px;
  font-family: Montserrat;
  font-weight: bold;
  color: #f1f2f6;
  text-decoration: none;
  font-size: 17px;
  margin-left: 25px;
  color: ${({ url }) => (url ? '#e0ba43' : 'white')};

  /*
  ${(props) =>
    props.$isFullLink &&
    `color: white; 
    border-radius: 30px; `}
    */
`

export const StyledLink2 = styled(Link)`
  padding: 10px 15px;
  font-family: Montserrat;
  font-weight: bold;
  color: #f1f2f6;
  text-decoration: none;
  font-size: 17px;
  margin-left: 25px;
  color: ${({ url }) => (url ? '#e0ba43' : 'white')};

  /*
  ${(props) =>
    props.$isFullLink &&
    `color: white; 
    border-radius: 30px; `}
    */
`

export const StyledLink3 = styled(Link)`
  padding: 10px 15px;
  font-family: Montserrat;
  font-weight: bold;
  color: #f1f2f6;
  text-decoration: none;
  font-size: 17px;
  margin-left: 25px;
  color: ${({ url }) => (url ? '#e0ba43' : 'white')};

  /*
  ${(props) =>
    props.$isFullLink &&
    `color: white; 
    border-radius: 30px; `}
    */
`

export const StyledLink4 = styled(Link)`
  padding: 10px 15px;
  font-family: Montserrat;
  font-weight: bold;
  color: #f1f2f6;
  text-decoration: none;
  font-size: 17px;
  margin-left: 25px;
  color: ${({ url }) => (url ? '#e0ba43' : 'white')};
`

export const HomeLogo = styled.img`
  height: 65px;
  margin-bottom: 5px;
`
export const LogoutBtn = styled.button`
  background: transparent;
  border: 0px;
`
export const LogoDiv = styled.div``
export const LinkDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
