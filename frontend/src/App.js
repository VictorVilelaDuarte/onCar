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
  FormDiv,
  Input,
  InputRow,
  InputText,
  Switch,
} from "./styles";

function App() {
  const [veiculos, setVeiculos] = useState([]);
  const [selectedVeiculo, setSelectedVeiculo] = useState({});
  const [veiculoToEdit, setVeiculoToEdit] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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
    console.log(veiculos);
  }, [showEdit, showDelete]);

  function deleteVeiculo() {
    api
      .delete(`/veiculo/${veiculoToEdit.id}`)
      .then((res) => {
        setVeiculos();
        toast.info(res.data.message);
        setShowDelete(!showDelete);
      })
      .catch((err) => {
        setShowDelete(!showDelete);
        console.log(err);
      });
  }

  function getVeiculo(id, type) {
    api
      .get(`/veiculo/${id}`)
      .then((res) => {
        setVeiculoToEdit(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    if (type === "edit") {
      setShowEdit(!showEdit);
    } else {
      setShowDelete(!showDelete);
    }
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
              {veiculos &&
                veiculos.map((item) => (
                  <tr>
                    <ListItem>
                      <ItemData onClick={() => setSelectedVeiculo(item)}>
                        <CarBrand>{item.marca}</CarBrand>
                        <CarName>{item.veiculo}</CarName>
                        <CarYear>{item.ano}</CarYear>
                      </ItemData>
                      <ItemEdit>
                        <FaEdit
                          size={25}
                          onClick={() => getVeiculo(item.id, "edit")}
                        />
                      </ItemEdit>
                      <ItemDelete>
                        <FaTrashAlt
                          size={22}
                          color="#f00"
                          onClick={() => getVeiculo(item.id, "delete")}
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
          <Modal.Title>{veiculoToEdit.veiculo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja detelar esse veículo?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteVeiculo()}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEdit} onHide={() => setShowEdit(!showEdit)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {veiculoToEdit ? veiculoToEdit.veiculo : "Novo veículo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormDiv>
            <Input placeholder="Veículo" />
            <InputRow>
              <Input placeholder="Marca" />
              <Input placeholder="Ano" type="number" />
            </InputRow>
            <InputText placeholder="Descrição do veículo" rows={5} />
            <Switch type="switch" id="custom-switch" label="Veículo vendido" />
          </FormDiv>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Salvar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
