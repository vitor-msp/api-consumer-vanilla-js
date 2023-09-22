import { BASE_URL } from "./constants.js";

const getEntityAndIdFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);
  if (!searchParams.has("entity") || !searchParams.has("id")) throw new Error();
  const entity = searchParams.get("entity");
  const id = searchParams.get("id");
  return { entity, id };
};

const fetchApi = async (entity, id) => {
  const response = await (await fetch(`${BASE_URL}${entity}/${id}`)).json();
  return response;
};

const isUrl = (value) => {
  const urlPattern =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  return urlPattern.test(value);
};

const processValue = (value) => {
  if (typeof value === "string" && isUrl(value)) {
    const anchor = document.createElement("a");
    anchor.href = value;
    anchor.innerText = value;
    return anchor;
  }
  if (typeof value === "object" && isUrl(value[0])) {
    const unorderedList = document.createElement("ul");
    unorderedList.style = "list-style-type: circle";
    value.forEach((item) => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = item;
      anchor.target = "_blank";
      anchor.innerText = item;
      listItem.appendChild(anchor);
      unorderedList.appendChild(listItem);
    });
    return unorderedList;
  }
  const span = document.createElement("span");
  span.innerHTML = value;
  return span;
};

const addKeyValueInPage = (key, value, divContent) => {
  const strong = document.createElement("strong");
  strong.innerHTML = `${key.replaceAll("_", " ")}: `;
  const valueHtml = processValue(value);
  const divKeyValue = document.createElement("div");
  divKeyValue.appendChild(strong);
  divKeyValue.appendChild(valueHtml);
  divKeyValue.classList = "custom-hover p-2 border border-light rounded";
  divContent.appendChild(divKeyValue);
};

const processDetails = async () => {
  const divRoot = document.getElementById("root");
  divRoot.innerHTML = '<p class="display-6">Loading...</p>';
  const { entity, id } = getEntityAndIdFromUrl();
  const result = await fetchApi(entity, id);
  const divContent = document.createElement("div");
  divContent.classList = "w-75";
  Object.entries(result).forEach(([key, value]) =>
    addKeyValueInPage(key, value, divContent)
  );
  divRoot.innerHTML = "";
  divRoot.appendChild(divContent);
};

const main = async () => {
  try {
    await processDetails();
  } catch (error) {
    alert("Error");
  }
};

document.addEventListener("load", main());
