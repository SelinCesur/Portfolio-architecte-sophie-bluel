const response = await fetch("http://localhost:5678/api/works");

// j'ai changé la constante en variable pour pouvoir modifier la liste en fonction des ajouts et des suppressions
let tousLesProjetArchitecte = await response.json();
const tousButton = document.getElementById("tous");

async function listeProjetArchitecte(projets) {
  console.log("projets", projets);

  for (let i = 0; i < projets.length; i++) {
    //   <figure>
    //     <img src="" alt="" />
    //     <figcaption>Abajour Tahina</figcaption>
    //   </figure>

    const figureElement = document.createElement("figure");

    let img = document.createElement("img");
    img.src = projets[i].imageUrl;
    img.alt = projets[i].title;
    figureElement.appendChild(img);

    let figcaption = document.createElement("figcaption");
    figcaption.innerText = projets[i].title;
    figureElement.appendChild(figcaption);

    document.querySelector(".gallery").appendChild(figureElement);
  }
}

async function listeProjetArchitecteModale(projets) {
  console.log("projets", projets);

  for (let i = 0; i < projets.length; i++) {
    //   <figure>
    //     <img src="" alt="" />
    //     <figcaption>Abajour Tahina</figcaption>
    //   </figure>

    const figureElement = document.createElement("figure");

    // image projet
    let img = document.createElement("img");
    img.src = projets[i].imageUrl;
    img.alt = projets[i].title;
    figureElement.appendChild(img);

    // figcaption projet
    let figcaption = document.createElement("figcaption");
    figcaption.innerText = projets[i].title;
    figureElement.appendChild(figcaption);

    // bouton supprimer et image poubelle
    let boutonPoubelle = document.createElement("button");
    boutonPoubelle.className = "bouton-poubelle";
    let imgPoubelle = document.createElement("img");
    imgPoubelle.src = "./assets/images/trash-can-solid.svg";
    imgPoubelle.alt = "bouton-poubelle";
    boutonPoubelle.appendChild(imgPoubelle);
    figureElement.appendChild(boutonPoubelle);

    document.querySelector(".gallery-modal").appendChild(figureElement);

    boutonPoubelle.addEventListener("click", function (event) {
      event.preventDefault();
      supprimerUnProjet(projets[i].id);
    });
  }
}

// Afficher la fonction
listeProjetArchitecte(tousLesProjetArchitecte);
// Ajouter dans la modale
listeProjetArchitecteModale(tousLesProjetArchitecte);

async function listeCategorie() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  console.log("category", categories);

  for (let i = 0; i < categories.length; i++) {
    /* <button id="" class="button-filtre" type="button">Tous</button> */
    let button = document.createElement("button");
    button.id = categories[i].id;
    button.className = "button-filtre";
    button.type = "button";
    button.innerText = categories[i].name;

    // <option value="tous">Tous</option>
    let option = document.createElement("option");
    option.value = categories[i].id;
    option.innerText = categories[i].name;

    // ajout des catégorie boutton
    document.querySelector(".liste-filtre").appendChild(button);

    // ajout des catégories dans le formulaire ( modale)
    document.getElementById("categorie").appendChild(option);

    // ajouter addEventListener
    button.addEventListener("click", () => {
      const listeFiltrer = tousLesProjetArchitecte.filter(function (projet) {
        return projet.categoryId === categories[i].id;
      });

      // vider la liste
      document.querySelector(".gallery").innerHTML = "";

      // ajouter à la liste
      listeProjetArchitecte(listeFiltrer);

      console.log(listeFiltrer);
    });
  }
}

// Afficher la fonction
listeCategorie();

// boutton filtré "Tous"
tousButton.addEventListener("click", () => {
  // vider la liste
  document.querySelector(".gallery").innerHTML = "";

  // ajouter à la liste
  listeProjetArchitecte(tousLesProjetArchitecte);
});

// code pour supprimer un projet
function supprimerUnProjet(projetId) {
  console.log("je supprime l'image", projetId);

  console.log(localStorage.getItem("token"));

  fetch("http://localhost:5678/api/works/" + projetId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((resultat) => {
    console.log(resultat);
    // si le status est un 204 = réussie
    if (resultat.status === 204) {
      // j'enlève le projet supprimer
      tousLesProjetArchitecte = tousLesProjetArchitecte.filter(function (
        projet
      ) {
        return projet.id !== projetId;
      });

      console.log(tousLesProjetArchitecte);

      // je relance l'affichage
      // vider la liste dans gallery
      document.querySelector(".gallery").innerHTML = "";

      // vider la liste dans gallery-modal
      document.querySelector(".gallery-modal").innerHTML = "";

      // Afficher la fonction
      listeProjetArchitecte(tousLesProjetArchitecte);
      // Ajouter dans la modale
      listeProjetArchitecteModale(tousLesProjetArchitecte);
    }
  });
}

async function ajouterUnNouveauProjet(image, titre, categorie) {
  // je mets la formulaire au format FormData
  const formData = new FormData();
  formData.append("image", image, image.name);
  formData.append("title", titre);
  formData.append("category", categorie);

  const response = await fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  });

  let monNouveauProjet = await response.json();

  console.log(monNouveauProjet);

  if (monNouveauProjet !== null) {
    // j'ajoute mon nouveau projet dans la liste de tous les projets
    tousLesProjetArchitecte.push(monNouveauProjet);

    // je relance l'affichage
    // vider la liste dans gallery
    document.querySelector(".gallery").innerHTML = "";

    // vider la liste dans gallery-modal
    document.querySelector(".gallery-modal").innerHTML = "";

    // Afficher la fonction
    listeProjetArchitecte(tousLesProjetArchitecte);
    // Ajouter dans la modale
    listeProjetArchitecteModale(tousLesProjetArchitecte);

    // je ferme la modale
    document.querySelector(".js-modal-close").click();
  }
}

// je submit mon formulaire
document
  .getElementById("formulaire-ajout-photo")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // je vérifie que le formulaire est valider
    if (document.getElementById("formulaire-ajout-photo").checkValidity()) {
      const image = e.target[1].files[0];
      const titre = e.target[2].value;
      const categorie = e.target[3].value;

      ajouterUnNouveauProjet(image, titre, categorie);
    }
  });
