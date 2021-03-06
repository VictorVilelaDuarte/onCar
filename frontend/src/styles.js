import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  padding-right: 5px;
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

export const SearchDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
  margin-top: 20px;
`;

export const SearchDivFields = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 40px;
`;

export const CategorySearch = styled.select`
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-left: 5px;
  height: 100%;
  width: 260px;
`;

export const InputSearch = styled.input`
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-left: 15px;
  height: 100%;
  width: 260px;
`;

export const FormDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const InputRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MainDiv = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  background: #e5e5e5;
  padding: 10px;
`;

export const ListDiv = styled.div`
  width: 59%;
  height: 570px;
  background: #fff;
  padding: 10px;
  overflow-y: scroll;
`;

export const DetailDiv = styled.div`
  width: 40%;
  height: 570px;
  background: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const TitleDiv = styled.div`
  font-weight: bold;
  font-size: 15px;
  width: 100%;
  border-bottom-color: #ccc;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding-bottom: 3px;
  margin-bottom: 10px;
`;

export const ListItem = styled.td`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ItemData = styled.div`
  width: 80%;
  display: flex;
  height: 65px;
  flex-direction: column;
  justify-content: space-around;
`;

export const ItemEdit = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemDelete = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CarName = styled.text`
  color: #586496;
  font-weight: bold;
  font-size: 16px;
`;

export const CarBrand = styled.text`
  font-size: 15px;
  font-weight: bold;
`;

export const CarYear = styled.text`
  font-size: 13px;
`;

export const TitleDetail = styled.div`
  color: #586496;
  font-weight: bold;
  font-size: 20px;
`;

export const BrandYearDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: space-between;
`;

export const BrandYear = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BrandYearTitle = styled.div`
  color: #a7a7a7;
  font-size: 13px;
`;

export const BrandYearText = styled.div`
  font-size: 15px;
`;

export const DescriptionDetail = styled.div`
  margin-top: 25px;
  font-size: 15px;
`;
