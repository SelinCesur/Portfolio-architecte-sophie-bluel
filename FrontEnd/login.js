async function seConnecter(email, password) {
  // Création de la charge utile au format JSON
  const chargeUtile = {
    email: JSON.stringify(email),
    password: JSON.stringify(password),
  };

  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "applicattion/json" },
    body: chargeUtile,
  })
    .then(function () {
      console.log("redirection vers la page d'accueil");
    })
    .catch(function (error) {
      console.log("afficher" + error);
    });
}

function ajoutListenerEnvoyerFormulaire() {
  const formulaireLogin = document.querySelector(".formulaire-login");

  formulaireLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = event.target.querySelector("[name=email]").value;
    const password = event.target.querySelector("[name=password]").value;

    console.log(email);
    console.log(password);

    seConnecter(email, password);
  });
}

ajoutListenerEnvoyerFormulaire();
