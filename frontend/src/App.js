import React, { useState, useEffect } from "react";
import {} from "react-bootstrap";

import { Container, Header, Name, InputSearch } from "./styles";

function App() {
  return (
    <Container>
      <Header>
        <Name>Victor</Name>
      </Header>
      <InputSearch placeholder="Buscar Veículo" />
    </Container>
  );
}

export default App;
