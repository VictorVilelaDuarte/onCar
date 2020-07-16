import React, { useState, useEffect } from "react";
import {} from "react-bootstrap";

import {
  Container,
  Header,
  Name,
  InputSearch,
  MainDiv,
  DetailDiv,
  ListDiv,
} from "./styles";

function App() {
  return (
    <Container>
      <Header>
        <Name>Victor</Name>
      </Header>
      <InputSearch placeholder="Buscar Veículo" />
      <MainDiv>
        <ListDiv></ListDiv>
        <DetailDiv></DetailDiv>
      </MainDiv>
    </Container>
  );
}

export default App;
