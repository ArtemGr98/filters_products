import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  background: deepskyblue;
  z-index: 1000;
  width: 100%;
  height: 50px;
`
export const HeaderProfileBlock = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
`