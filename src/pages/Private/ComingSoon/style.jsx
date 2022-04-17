import styled from 'styled-components'

export const TitlePage = styled.h1`
  width: 424px;
  height: 118px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 55px;
  line-height: 88px;
  letter-spacing: -0.05em;
  color: #27187e;
  margin-left: 70px;
  margin-top: 20px;
`

export const AllEpisodes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const PageContainer = styled.div`
  height: ${({ numberEpisodes }) => (numberEpisodes > 0 ? '100%' : '100vh')};
`
export const NoEpisodeStyle = styled.div`
  height: 118px;
  font-family: 'Bebas Neue';
  font-size: 30px;
  color: #27187e;
  margin-left: 70px;
  margin-top: 10px;
`
