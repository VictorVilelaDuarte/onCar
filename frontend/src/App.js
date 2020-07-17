import React, { useState, useEffect, useRef } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "@unform/web";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyle from "./global";
import api from "./services/api";
import Input from "./components/Input";
import TextArea from "./components/TextArea";
import Switch from "./components/Switch";

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
  InputRow,
} from "./styles";

function App() {
  const formRef = useRef(null);
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

    setVeiculoToEdit({});
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

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        veiculo: Yup.string().required("O nome do veículo é obrigatório"),
        marca: Yup.string().required("A marca do veículo é obrigatória"),
        descricao: Yup.string().required(
          "A descricao do veículo é obrigatória"
        ),
        ano: Yup.string().required("O ano do veículo é obrigatória"),
        vendido: Yup.bool(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const json = {
        veiculo: data.veiculo,
        marca: data.marca,
        ano: data.ano,
        descricao: data.descricao,
        vendido: data.vendido ? "1" : "0",
      };

      if (veiculoToEdit.veiculo) {
        api
          .put(`/veiculo/${veiculoToEdit.id}`, json)
          .then((res) => {
            toast.info(res.data.message);
            setShowEdit(!showEdit);
          })
          .catch((err) => {
            toast.error(err.data.message);
            setShowEdit(!showEdit);
          });
      } else {
        api
          .post("/veiculo", json)
          .then((res) => {
            toast.info(res.data.message);
            setShowEdit(!showEdit);
          })
          .catch((err) => {
            toast.error(err.data.message);
          });
      }
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
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
      <Button
        type="submit"
        onClick={() => setShowEdit(!showEdit)}
        variant="primary"
      >
        Novo Veículo
      </Button>
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
      <Modal size="lg" show={showEdit} onHide={() => setShowEdit(!showEdit)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {veiculoToEdit.veiculo ? veiculoToEdit.veiculo : "Novo veículo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            ref={formRef}
            initialData={veiculoToEdit}
            onSubmit={handleSubmit}
          >
            <FormDiv>
              {console.log(veiculoToEdit)}
              <Input placeholder="Veículo" name="veiculo" />
              <InputRow>
                <Input placeholder="Marca" name="marca" />
                <Input placeholder="Ano" type="number" name="ano" />
              </InputRow>
              <TextArea
                placeholder="Descrição do veículo"
                rows={8}
                name="descricao"
              />
              <Switch
                name="vendido"
                type="switch"
                id="custom-switch"
                label="Veículo vendido"
              />
            </FormDiv>
            <Button style={{ marginTop: 30 }} type="submit" variant="primary">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
