export const BASE_URL = `https://swapi.dev/api/`;

export const ENTITIES_AND_MAIN_FIELDS = [
  { entity: "films", mainFields: ["title", "director", "release_date"] },
  { entity: "people", mainFields: ["name", "gender", "birth_year"] },
  { entity: "planets", mainFields: ["name", "climate", "terrain"] },
  { entity: "species", mainFields: ["name", "classification", "designation"] },
  { entity: "starships", mainFields: ["name", "model", "manufacturer"] },
  { entity: "vehicles", mainFields: ["name", "model", "manufacturer"] },
];
