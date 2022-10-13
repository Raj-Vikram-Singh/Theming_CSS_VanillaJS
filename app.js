const fileUpload = document.getElementById("fileUpload");
const CSVcontent = document.getElementById("CSVcontent");
const tableHeader = document.getElementById("tableHeader");

const CSVToArray = (data, delimiter = ",") =>
  data.split("\n").map((v) => v.split(delimiter));

let OriginalData = [];

// create the individual row view.
function createHeader(rowArray) {
  const individualRow = `<div class = "tableRow"> </div>`;
  rowArray.forEach((item) => {
    tableHeader.insertAdjacentHTML("beforeend", createCell(item));
  });
}

function createRow(rowArray, index) {
  const individualRow = `<div class = "tableRow" id = ${index}> </div>`;
  CSVcontent.insertAdjacentHTML("beforeend", individualRow);
  const rowContainer = document.getElementById(index);
  rowArray.forEach((item) => {
    rowContainer.insertAdjacentHTML("beforeend", createCell(item));
  });
}

function createCell(cellValue) {
  return `<div class = "cell">${cellValue}</div>`;
}

/* Render View */

function renderView(viewArray) {
  viewArray.forEach((item, index) => createRow(item, index));
}

fileUpload.onchange = function () {
  let reader = new FileReader();
  reader.onload = function (e) {
    CSVDataArray = CSVToArray(e.target.result);
    OriginalData = CSVDataArray.slice(1);
    createHeader(CSVDataArray[0]);
    renderView(OriginalData);
  };
  reader.readAsText(fileUpload.files[0]);
};

const refreshView = () => {
  CSVcontent.innerHTML = "";
};
const searchTable = (value) => {
  if (!OriginalData.length) {
    return;
  } else if (!value) {
    refreshView();
    renderView(OriginalData);
  } else {
    const SearchedData = OriginalData.filter((arr) => arr.includes(value));
    refreshView();
    renderView(SearchedData);
  }
};

const toggleTheme = function () {
  document.body.classList.toggle("dark_mode");
};
