import { BASE_URL, ENTITIES_AND_MAIN_FIELDS } from "./constants.js";

const addTitle = (entity) => {
  const h1 = document.getElementById("title");
  h1.innerText = entity.charAt(0).toUpperCase() + entity.slice(1);
};

const getEntityFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);
  if (!searchParams.has("entity")) throw new Error();
  const entity = searchParams.get("entity");
  return entity;
};

const fetchApi = async (entity) => {
  const response = await (await fetch(`${BASE_URL}${entity}`)).json();
  return response.results;
};

const getMainFieldsFromEntity = (entity) => {
  const entityMainFields = ENTITIES_AND_MAIN_FIELDS.find(
    (item) => item.entity.localeCompare(entity) === 0
  );
  if (!entityMainFields) throw new Error();
  return entityMainFields.mainFields;
};

const createTableHeaderRow = (headerFields) => {
  const tableRow = document.createElement("tr");
  tableRow.appendChild(document.createElement("th"));
  headerFields.forEach((field) => {
    const tableHeader = document.createElement("th");
    tableHeader.innerText = field.replaceAll("_", " ");
    tableRow.appendChild(tableHeader);
  });
  return tableRow;
};

const populateTable = (table, fields, data, entity) => {
  data.forEach((item, index) => {
    const tableRow = document.createElement("tr");
    const tableDataLink = document.createElement("td");
    const anchor = document.createElement("a");
    anchor.innerText = "details";
    anchor.href = `/details.html?entity=${entity}&id=${index + 1}`;
    tableDataLink.appendChild(anchor);
    tableRow.appendChild(tableDataLink);
    fields.forEach((field) => {
      const tableData = document.createElement("td");
      tableData.innerText = item[field];
      tableRow.appendChild(tableData);
    });
    table.appendChild(tableRow);
  });
};

const processList = async () => {
  const divRoot = document.getElementById("root");
  divRoot.innerHTML = '<p class="display-6">Loading...</p>';
  const entity = getEntityFromUrl();
  addTitle(entity);
  const results = await fetchApi(entity);
  const table = document.createElement("table");
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  table.classList = "table table-hover";
  const mainFields = getMainFieldsFromEntity(entity);
  const tableHeaderRow = createTableHeaderRow(mainFields);
  tableHead.appendChild(tableHeaderRow);
  populateTable(tableBody, mainFields, results, entity);
  divRoot.innerHTML = "";
  divRoot.appendChild(table);
};

const main = async () => {
  try {
    await processList();
  } catch (error) {
    alert("Error");
  }
};

document.addEventListener("load", main());
