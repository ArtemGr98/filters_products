import styled from "styled-components";

export const FilterBlock = styled.form`
  position: fixed;
  text-align: start;
  top: 50px;
  left: ${({isShow}) => isShow ? '0px' : '-500px'};
  padding: 20px;
  background: whitesmoke;
  box-shadow: 14px 10px 13px -6px #bdbdbd;
  transition: all 1.5s;
`
export const Close = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  padding: 5px 10px;
`
export const ShowFilter = styled.button`
  position: fixed;
  left: 0;
  top: 50px;
  z-index: 1000;
`