import styled from 'styled-components'

export const EpisodeWrap = styled.div`
  width: 1300px;
  height: 250px;
  background: #758bfd;
  border-radius: 25px;
  display: flex;
  margin-bottom: 50px;
`

export const PhotoContainer = styled.div``

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`
export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 250px;
  margin-top: 50px;
  height: 100px;
`

export const PictureStyle = styled.img`
  width: 150px;
  height: 200px;
  margin: 20px;
  border-radius: 20px;
  border: 5px solid #f1f2f6;
`

export const FirstInfoContainer = styled.div`
  width: 500px;
`

export const FirstInfo = styled.span`
  height: 49px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: px;
  color: #f1f2f6;
`
export const SecondInfo = styled.span`
  height: 20px;
  font-family: 'Montserrat';
  //font-family: 'Bebas Neue';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #e0ba43;
`
export const SecondContainer = styled.div`
  margin-top: 20px;
`
export const CountStyle = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 45px;
  line-height: 58px;
  color: #e0ba43;
`

export const DateStyle = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 32px;
  color: #e0ba43;
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
