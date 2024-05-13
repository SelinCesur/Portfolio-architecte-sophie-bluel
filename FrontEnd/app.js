// code pour la modale
let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let previouslyFocusedElement = null;

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  modal.style.display = null;
  focusables[0].focus();

  console.log(modal);

  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");

  modal.addEventListener("click", closeModal);

  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);

  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  console.log(modal);

  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();
  window.setTimeout(function () {
    modal.style.display = "none";
    modal = null;
  }, 500);

  console.log(modal);

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);

  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);

  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);

  // remettre à zéro les vue dans la modale
  document.querySelector("#vue-1").style = "display:block";
  document.querySelector("#vue-2").style = "display:none";
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.lengt - 1;
  }
  focusables[index].focus();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key === "Tab" && modal !== null) {
    this.focusInModal(e);
  }
});

// code pour les boutons ajouter et valider dans les modales
const boutonModal = function (e) {
  e.preventDefault();

  sectionSuivante = document.querySelector(e.target.getAttribute("href"));

  sectionSuivante.style = "display:block";

  if (e.target.getAttribute("href") === "#vue-2") {
    document.querySelector("#vue-1").style = "display:none";
  }
};

document.querySelectorAll(".bouton-modal").forEach((a) => {
  a.addEventListener("click", boutonModal);
});

// code qui vérifie si je suis bien connecté
function jeSuisConnecte() {
  const userId = window.localStorage.getItem("userId");
  const token = window.localStorage.getItem("token");

  // si j'ai bien userId et le token c'est que je suis bien connecté, sinon non
  console.log(userId, token);
  if (userId && token) {
    // afficher les boutons de navigation
    document.getElementById("logout").style = "display:block";
    document.getElementById("login").style = "display:none";

    // afficher le mode edition et le bouton de modification
    document.getElementById("mode-edition").style = "display:block";
    document.getElementById("boutton-modifier").style = "display:block";
  } else {
    // afficher les boutons de navigation
    document.getElementById("logout").style = "display:none";
    document.getElementById("login").style = "display:block";

    // masquer le mode edition et le bouton de modification
    document.getElementById("mode-edition").style = "display:none";
    document.getElementById("boutton-modifier").style = "display:none";
  }
}

// je vérifie si je suis connecté
jeSuisConnecte();

// formulaire d'ajout de photo
document.querySelector(".ajout-photo").addEventListener("click", function (e) {
  e.preventDefault();

  document.getElementById("imageFile").click();
});

// on charge la photo dans la balise image
// commentaire de la maquette https://developer.mozilla.org/fr/docs/Web/API/FileReader/readAsDataURL
document.getElementById("imageFile").addEventListener("change", function (e) {
  const file = e.target.files[0];
  console.log(file);

  if (file.size > 4194304) {
    alert("L'image est trop lourd, il doit être inférieur à 4mo max");
  } else {
    const preview = document.createElement("img");
    preview.className = "ajout-photo-image";

    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // on convertit l'image en une chaîne de caractères base64
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);

      // supprime les éléments dans ajout-photo
      document.querySelector(".ajout-photo").innerHTML = "";

      // ensuite je remplace par l'image
      document.querySelector(".ajout-photo").appendChild(preview);
    }
  }
});

// je vérifie si le formulaire est valide et je change la couleur du bouton
document
  .getElementById("formulaire-ajout-photo")
  .addEventListener("change", function (e) {
    e.preventDefault();

    if (document.getElementById("formulaire-ajout-photo").checkValidity()) {
      document.querySelector(".bouton-modal-formulaire").className =
        "bouton-modal-formulaire valider";
    } else {
      document.querySelector(".bouton-modal-formulaire").className =
        "bouton-modal-formulaire";
    }
  });

// je me déconnecte
document.getElementById("logout").addEventListener("click", function (e) {
  // j'efface tout dans le local storage
  localStorage.clear();
  // je vérifie si je suis connecté ou déconnecté
  jeSuisConnecte();
});
