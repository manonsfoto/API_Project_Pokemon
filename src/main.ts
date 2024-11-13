import "./style.css";
import {
  IPokeAPI,
  IPokemon,
  IPokemonPokemon,
  IPokemonType,
} from "./interface/IPokeAPI";

// ^=============================================================================

const inputText = document.querySelector("#inputText") as HTMLInputElement;
const buttons = document.querySelectorAll(
  "button"
) as NodeListOf<HTMLButtonElement>;
const cardsWrapper = document.querySelector("#cardsWrapper") as HTMLDivElement;

// ^=============================================================================

const BASE_URL = "https://pokeapi.co/api/v2/";

// ^=============================================================================

const fetchPokemons = async (buttonValue: string) => {
  cardsWrapper.innerHTML = "";
  let pokemonURL = `${BASE_URL}${buttonValue}`;

  const response = await fetch(pokemonURL);
  const data: IPokemonType = await response.json();
  const pokemonArr: IPokemonPokemon[] = data.pokemon;

  pokemonArr.forEach((singlePokemon: IPokemonPokemon) => {
    renderCards(singlePokemon);
  });
};
// ^=============================================================================
buttons?.forEach((button: HTMLButtonElement) => {
  button?.addEventListener("click", () => {
    const buttonValue = button.value;
    console.log(buttonValue);
    fetchPokemons(buttonValue);
  });
});
// ^=============================================================================
function renderCards(singlePokemon: IPokemonPokemon) {
  const cardDiv = document.createElement("div") as HTMLDivElement;
  const cardImg = document.createElement("img") as HTMLImageElement;
  const cardId = document.createElement("p") as HTMLParagraphElement;
  const cardName = document.createElement("p") as HTMLParagraphElement;
  // *=============================================================
  const id = singlePokemon.pokemon.url
    .replace("https://pokeapi.co/api/v2/pokemon/", "")
    .replace("/", "");
  cardImg.setAttribute(
    "src",
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  );
  cardId.textContent = id;
  cardName.textContent = singlePokemon.pokemon.name;
  // *=============================================================
  cardDiv.append(cardImg, cardId, cardName);
  cardsWrapper.appendChild(cardDiv);
}
// ^=============================================================================
inputText.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    const textValue = inputText.value.trim().toLowerCase();
    console.log(textValue);
    fetchPokemonArr(textValue);
  }
});

const fetchPokemonArr = async (textValue: string) => {
  const allPokemonURL = `${BASE_URL}pokemon?limit=100&offset=0`;
  const response = await fetch(allPokemonURL);
  const data: IPokeAPI = await response.json();
  const allPokemonArr: IPokemon[] = data.results;
  console.log(allPokemonArr);
  const filteredPokemonArr: IPokemon[] = allPokemonArr.filter(
    (singlePokemon: IPokemon) => {
      singlePokemon.name === textValue;
    }
  );
  console.log(filteredPokemonArr);
};
