async function seConnecter(email, password) {
  // Création de la charge utile au format JSON
  const chargeUtile = {
    email: email,
    password: password,
  };

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chargeUtile),
  });

  // j'attends la réponse
  const token = await response.json();

  console.log(token);

  // condition de redirection
  if (token.userId && token.token) {
    console.log("redirection vers la page d'accueil");

    // je stocke mon token
    window.localStorage.setItem("userId", token.userId);
    window.localStorage.setItem("token", token.token);

    // je renvoi vers la page d'accueil
    window.location.assign("http://127.0.0.1:5500/FrontEnd/index.html");
  } else {
    console.log("erreur");

    // je préviens l'utilisateur
    alert("La combinaison est fausse");
  }
}

function ajoutListenerEnvoyerFormulaire() {
  // je selectionne le fomulaire
  const formulaireLogin = document.querySelector(".formulaire-login");

  // j'ajouter un add event listener
  formulaireLogin.addEventListener("submit", function (event) {
    // j'arrête la redirection automatique
    event.preventDefault();

    // je récupère les valeurs
    const email = event.target.querySelector("[name=email]").value;
    const password = event.target.querySelector("[name=password]").value;

    console.log(email);
    console.log(password);

    // je me connecte avec l'email et le password du formulaire
    seConnecter(email, password);
  });
}

function jeSuisConnecte() {
  const userId = window.localStorage.getItem("userId");
  const token = window.localStorage.getItem("token");

  console.log(userId, token);
}

// ajout de l'addeventlistener
ajoutListenerEnvoyerFormulaire();
jeSuisConnecte();
