import styled from 'styled-components'

export const PageContainer = styled.div`
  margin: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
export const RechercheInput = styled.input`
  margin-top: 30px;
  width: 400px;
  height: 40px;
  border: 3px solid #27187e;
`
export const Container = styled.div`
  display: flex;
  justify-content: center;
`

export const GlobalDiv = styled.div`
  z-index: 1;
 // height: ${({ numberSeries }) => (numberSeries > 0 ? '100%' : '100vh')};
 min-height: calc(100vh - 100px);
`
