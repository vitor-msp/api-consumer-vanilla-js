import { ENTITIES_AND_MAIN_FIELDS } from "./constants.js";

const processIndex = () => {
  const divRoot = document.getElementById("root");
  ENTITIES_AND_MAIN_FIELDS.forEach(({ entity }) => {
    const div = document.createElement("div");
    const anchor = document.createElement("a");
    const span = document.createElement("span");
    div.appendChild(anchor);
    anchor.appendChild(span);
    div.classList =
      "w-25 m-2 border border-secondary-subtle rounded custom-hover";
    div.style = "min-height: 100px";
    anchor.href = `/list.html?entity=${entity}`;
    anchor.classList =
      "link-primary d-flex justify-content-center align-items-center h-100 w-100";
    span.innerText = entity;
    divRoot.appendChild(div);
  });
};

const main = () => {
  try {
    processIndex();
  } catch (error) {
    alert("Error");
  }
};

document.addEventListener("load", main());
