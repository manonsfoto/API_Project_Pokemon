import "./style.css";
import {
  IPokeAPI,
  IPokemon,
  IPokemonPokemon,
  IPokemonType,
} from "./interface/IPokeAPI";

// ^==========================================================

const inputText = document.querySelector("#inputText") as HTMLInputElement;
const buttons = document.querySelectorAll(
  "button"
) as NodeListOf<HTMLButtonElement>;
const cardsWrapper = document.querySelector("#cardsWrapper") as HTMLDivElement;

// ^==========================================================

const BASE_URL = "https://pokeapi.co/api/v2/";

// ^==========================================================

const fetchPokemons = async (buttonValue: string) => {
  cardsWrapper.innerHTML = "";
  let pokemonURL = `${BASE_URL}${buttonValue}`;

  const response = await fetch(pokemonURL);
  const data: IPokemonType = await response.json();
  const pokemonArr: IPokemonPokemon[] = data.pokemon;

  pokemonArr.forEach((singlePokemon: IPokemonPokemon) => {
    renderCards(singlePokemon.pokemon, true);
  });
};

const fetchDefaultPokemons = async () => {
  const allPokemonURL = `${BASE_URL}pokemon?limit=50&offset=0`;

  const response = await fetch(allPokemonURL);
  const data: IPokeAPI = await response.json();
  const pokemonArr: IPokemon[] = data.results;

  pokemonArr.forEach((singlePokemon: IPokemon) => {
    renderCards(singlePokemon, true);
  });
};
fetchDefaultPokemons();

const fetchPokemonArr = async (textValue: string) => {
  cardsWrapper.innerHTML = "";
  const allPokemonURL = `${BASE_URL}pokemon?limit=1000&offset=0`;
  const response = await fetch(allPokemonURL);
  const data: IPokeAPI = await response.json();
  const allPokemonArr: IPokemon[] = data.results;

  const filteredPokemonArr: IPokemon[] = allPokemonArr.filter(
    (singlePokemon: IPokemon) => {
      return singlePokemon.name.includes(textValue);
    }
  );

  if (filteredPokemonArr.length > 1) {
    filteredPokemonArr.forEach((pokemon: IPokemon) => {
      renderCards(pokemon, true);
    });
  } else {
    renderCards(filteredPokemonArr[0], false);
  }
};
// ^==========================================================

buttons?.forEach((button: HTMLButtonElement) => {
  button?.addEventListener("click", () => {
    const buttonValue = button.value;

    fetchPokemons(buttonValue);
  });
});

inputText.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    const textValue = inputText.value.trim().toLowerCase();

    fetchPokemonArr(textValue);
  }
});

inputText.addEventListener("input", () => {
  const textValue = inputText.value.trim().toLowerCase();
  if (textValue.length > 2) {
    fetchPokemonArr(textValue);
  }
});

// ^==========================================================

async function renderCards(pokemon: IPokemon, styleType: boolean) {
  const cardDiv = document.createElement("div") as HTMLDivElement;
  const cardImg = document.createElement("img") as HTMLImageElement;
  const cardId = document.createElement("p") as HTMLParagraphElement;
  const cardName = document.createElement("p") as HTMLParagraphElement;
  const cardType = document.createElement("div") as HTMLDivElement;
  const singleCardType = document.createElement("p") as HTMLParagraphElement;
  // ========================================================

  const response = await fetch(pokemon.url);
  const data = await response.json();
  const pokemonType = data.types.map((obj: any) => obj.type.name);

  const id = pokemon.url
    .replace("https://pokeapi.co/api/v2/pokemon/", "")
    .replace("/", "");
  cardImg.setAttribute(
    "src",
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  );
  cardId.textContent = "#" + id.padStart(3, "0");
  cardName.textContent = pokemon.name;
  singleCardType.innerHTML = pokemonType.join("<br>");
  cardType.appendChild(singleCardType);
  // ========================================================
  cardDiv.classList.add("flex", styleType ? "cardDiv" : "pokedex");
  cardId.classList.add("cardId");
  cardName.classList.add("cardName");
  singleCardType.classList.add("singleCardType");
  cardType.classList.add("cardType");
  // ========================================================

  cardDiv.append(cardImg, cardId, cardName, cardType);
  cardsWrapper.appendChild(cardDiv);
}
