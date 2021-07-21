
function mostlikeTouit(getInfluencer){

    // Récupération des 10 top influenceurs du moment
    getInfluencer();

    // Reset du champ
    responsesMostLike.textContent = "";

    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://touiteur.cefim-formation.org/likes/top?count=3', true);

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response);

                // Méthode itérative DYNAMIQUE et EFFICACE !
                response.top.forEach( touit => {

                    // J'ajoute mon touit
                    addTouit(
                        touit,                  // Objet destructuré ! #trucdeouf
                        responsesMostLike,      // field d'ajout
                        true                    // Is it a most-like ?
                    );
        
                });

            } else {
                alert("Il y a une erreur ! Et l'erreur est humaine...");
            }
        }
    })
    
    xhr.send();
}