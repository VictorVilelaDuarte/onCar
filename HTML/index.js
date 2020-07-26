const API = "http://192.168.15.16:3333";
var toDelete = "";

document.addEventListener("DOMContentLoaded", () => {
  getAllVehicles();
});

function getAllVehicles() {
  axios.get(`${API}/veiculo`).then((res) => {
    let vehicleList = document.getElementById("vehicleList");
    vehicleList.innerHTML = "";
    res.data.data.map((item) => {
      vehicleList.innerHTML += `
      <tr>
        <td class="listItem" onclick="getVehicle(${item.id})">
          <div class="itemData">
            <p class="carBrand">${item.marca}</p>
            <p class="carName">${item.veiculo}</p>
            <p class="carYear">${item.ano}</p>
          </div>
          <div class="itemEdit">
            <i class="fa fa-pencil-square-o" style="#c8c8c8" aria-hidden="true"></i>
          </div>
          <div class="itemDelete">
            <i class="fa fa-trash" style="color: #f00" onclick="setToDelete(${item.id})" data-toggle="modal" data-target="#deleteModal" aria-hidden="true"></i>
          </div>
        </td>
      </tr>
    `;
    });
  });
}

function getVehicle(id) {
  axios.get(`${API}/veiculo/${id}`).then((res) => {
    let detailDiv = document.getElementById("detailDiv");
    res.data.data.map((item) => {
      detailDiv.innerHTML = `
      <div class="titleDiv">Detalhes do veículo</div>
      <div class="titleDetail">${item.veiculo}</div>
      <div class="brandYearDiv">
        <div class="brandYearDiv">
          <div class="brandYear">
            <div class="brandYearTtile">MARCA</div>
            <div class="brandYearText">${item.marca}</div>
          </div>
        </div>
        <div class="brandYearDiv">
          <div class="brandYear">
            <div class="brandYeatTitle">ANO</div>
            <div class="brandYearText">${item.ano}</div>
          </div>
        </div>
      </div>
      <div class="descriptionDetail">${item.descricao}</div>
    `;
    });
  });
}

function getVeiculosWithFilter() {
  let select = document.getElementById("filter");
  let filter = select.options[select.selectedIndex].value;
  let filterStr = document.getElementById("filterStr").value;

  axios
    .get(`${API}/veiculoSearch?key=${filter}&value=${filterStr}`)
    .then((res) => {
      let vehicleList = document.getElementById("vehicleList");
      vehicleList.innerHTML = "";
      res.data.data.map((item) => {
        vehicleList.innerHTML += `
      <tr>
        <td class="listItem" onclick="getVehicle(${item.id})">
          <div class="itemData">
            <p class="carBrand">${item.marca}</p>
            <p class="carName">${item.veiculo}</p>
            <p class="carYear">${item.ano}</p>
          </div>
          <div class="itemEdit">
            <i class="fa fa-pencil-square-o" style="#c8c8c8" aria-hidden="true"></i>
          </div>
          <div class="itemDelete">
            <i class="fa fa-trash"  style="color: #f00" aria-hidden="true"></i>
          </div>
        </td>
      </tr>
    `;
      });
    });
}

function setToDelete(id) {
  toDelete = id;
}

function deteleVehicle() {
  axios
    .delete(`${API}/veiculo/${toDelete}`)
    .then((res) => {
      getAllVehicles();
    })
    .catch((err) => {
      getAllVehicles();
    });
}

function saveVehicle() {
  let veiculo = document.getElementById("veiculo").value;
  let marca = document.getElementById("marca").value;
  let ano = document.getElementById("ano").value;
  let descricao = document.getElementById("descricao").value;

  let json = {
    veiculo,
    marca,
    ano,
    descricao,
    vendido: 0,
  };

  axios
    .post(`${API}/veiculo`, json)
    .then((res) => {
      getAllVehicles();
    })
    .catch((err) => {
      getAllVehicles();
    });
}
