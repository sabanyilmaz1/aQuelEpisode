import styled from 'styled-components'

export const NavContainer = styled.nav`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  background-color: #758bfd;
`
export const TextLink = styled.span`
  font-family: Montserrat;
  font-weight: bold;
  color: #f1f2f6;
  text-decoration: none;
`
export const HomeLogo = styled.img`
  height: 40px;
`
