import {
  FooterContainer,
  Repository,
  Credits,
  GitHub,
  LinkStyle,
} from './style'

function Footer() {
  return (
    <FooterContainer>
      <Credits>Made by Yilmaz Saban</Credits>
      <Repository>
        <GitHub to="//github.com/sabanyilmaz1/aQuelEpisode" target="_blank">
          <LinkStyle>Check the project's GitHub</LinkStyle>
        </GitHub>
      </Repository>
    </FooterContainer>
  )
}

export default Footer
