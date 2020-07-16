import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyle from "./global";
import api from "./services/api";

import {
  Container,
  Header,
  Name,
  InputSearch,
  MainDiv,
  DetailDiv,
  ListDiv,
  TitleDiv,
  ListItem,
  ItemData,
  ItemEdit,
  ItemDelete,
  CarBrand,
  CarName,
  CarYear,
  BrandYear,
  BrandYearDiv,
  BrandYearText,
  DescriptionDetail,
  TitleDetail,
  BrandYearTitle,
} from "./styles";

function App() {
  const [veiculos, setVeiculos] = useState([]);
  const [selectedVeiculo, setSelectedVeiculo] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    api
      .get("/veiculo")
      .then((res) => {
        setVeiculos([]);
        res.data.data.map((item) => {
          setVeiculos((prevVeiculos) => [...prevVeiculos, item]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  function deleteVeiculo() {
    api
      .delete(`/veiculo/${selectedVeiculo.id}`)
      .then((res) => {
        toast.info(res.data.message);
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });

    setShowDelete(!showDelete);
  }

  return (
    <Container>
      <ToastContainer />
      <GlobalStyle />
      <Header>
        <Name>Victor</Name>
      </Header>
      <InputSearch placeholder="Buscar Veículo" />
      <MainDiv>
        <ListDiv>
          <TitleDiv>Lista de veículos</TitleDiv>
          <Table bordered hover striped>
            <tbody>
              {veiculos.map((item) => (
                <tr onClick={() => setSelectedVeiculo(item)}>
                  <ListItem>
                    <ItemData>
                      <CarBrand>{item.marca}</CarBrand>
                      <CarName>{item.veiculo}</CarName>
                      <CarYear>{item.ano}</CarYear>
                    </ItemData>
                    <ItemEdit>
                      <FaEdit size={25} />
                    </ItemEdit>
                    <ItemDelete>
                      <FaTrashAlt
                        size={22}
                        color="#f00"
                        onClick={() => setShowDelete(!showDelete)}
                      />
                    </ItemDelete>
                  </ListItem>
                </tr>
              ))}
            </tbody>
          </Table>
        </ListDiv>
        <DetailDiv>
          <TitleDiv>Detalhes do veículo</TitleDiv>
          {selectedVeiculo.veiculo ? (
            <>
              <TitleDetail>{selectedVeiculo.veiculo}</TitleDetail>
              <BrandYearDiv>
                <BrandYearDiv>
                  <BrandYear>
                    <BrandYearTitle>MARCA</BrandYearTitle>
                    <BrandYearText>{selectedVeiculo.marca}</BrandYearText>
                  </BrandYear>
                </BrandYearDiv>
                <BrandYearDiv>
                  <BrandYear>
                    <BrandYearTitle>ANO</BrandYearTitle>
                    <BrandYearText>{selectedVeiculo.ano}</BrandYearText>
                  </BrandYear>
                </BrandYearDiv>
              </BrandYearDiv>
              <DescriptionDetail>{selectedVeiculo.descricao}</DescriptionDetail>
            </>
          ) : (
            <></>
          )}
        </DetailDiv>
      </MainDiv>
      <Modal show={showDelete} onHide={() => setShowDelete(!showDelete)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedVeiculo.veiculo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja detelar esse veículo?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteVeiculo()}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
