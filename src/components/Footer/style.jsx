import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const FooterContainer = styled.footer`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  background: #758bfd;
  border-top: 4px solid #000000;
`

export const Repository = styled.div`
  font-family: 'Montserrat';
`

export const Credits = styled.div`
  font-family: 'Montserrat';
`
export const GitHub = styled(Link)`
  font-family: 'Montserrat';
`

export const LinkStyle = styled.span`
  color: white;
`
