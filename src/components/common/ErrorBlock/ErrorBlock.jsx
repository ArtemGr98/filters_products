import styled from "styled-components"
import errorImg from './bad.svg'

const ErrorMessage = styled.div`
  padding: 20px;
  color: red;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: whitesmoke;
  box-shadow: 14px 10px 13px -6px #bdbdbd;
  border-radius: 8px;
  position: absolute;
  z-index: 1001;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  img {
    width: 70px;
    height: 70px;
  }
`

const ErrorBlock = ({error}) => {
    return (
        <ErrorMessage>
            <img src={errorImg} alt="errorImg"/>
            Error!!!: {error}
        </ErrorMessage>
    )
}

export default ErrorBlock