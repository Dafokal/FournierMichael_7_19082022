import styled from 'styled-components'
import colors from '../../utils/style/colors'

const ErrorWrapper = styled.div`
  margin: 3em 1em;
  display: flex;
  flex-direction: column;
  row-gap: 3em;
  align-items: center;
`

const ErrorTitle = styled.h1`
  text-align: center;
  color: ${colors.primary};
`

const ErrorSubtitle = styled.h2`
  font-weight: bold;
  color: ${colors.tertiary};
`

function Error() {
  return (
    <ErrorWrapper>
      <ErrorTitle>
        Oups...<br /><br />Error 404
      </ErrorTitle>
      <ErrorSubtitle>
        Il semblerait que la page que vous cherchez n’existe pas
      </ErrorSubtitle>
    </ErrorWrapper>
  )
}

export default Error
