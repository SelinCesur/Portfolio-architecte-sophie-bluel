const response = await fetch("http://localhost:5678/api/works");
const projetArchitecte = await response.json();
console.log(projetArchitecte);

for (let i = 0; i < projetArchitecte.length; i++) {
  //   <figure>
  //     <img src="" alt="" />
  //     <figcaption>Abajour Tahina</figcaption>
  //   </figure>

  const figureElement = document.createElement("figure");

  let img = document.createElement("img");
  img.src = projetArchitecte[i].imageUrl;
  img.alt = projetArchitecte[i].title;
  figureElement.appendChild(img);

  let figcaption = document.createElement("figcaption");
  figcaption.innerText = projetArchitecte[i].title;
  figureElement.appendChild(figcaption);

  document.querySelector(".gallery").appendChild(figureElement);
}

const tousButton = document.getElementById("tous");
const objetsButton = document.getElementById("objets");
const appartementsButton = document.getElementById("appartements");
const hotelRestaurantsButton = document.getElementById("hotels-restaurants");

tousButton.addEventListener("click", () => console.log("click"));
