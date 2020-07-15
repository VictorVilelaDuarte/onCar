import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  height: 60px;
  border-bottom-color: #ccc;
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

export const Name = styled.div`
  color: #586496;
  font-size: 35px;
  width: fit-content;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 50px;
  padding-right: 50px;
  border-right-color: #ccc;
  border-right-style: solid;
  border-right-width: 1px;
`;

export const InputSearch = styled.input`
  margin-top: 20px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-left: 15px;
`;
