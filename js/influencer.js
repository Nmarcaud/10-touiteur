
function getInfluencer() {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://touiteur.cefim-formation.org/influencers?count=10', true);

    xhr.addEventListener('readystatechange', () => {

        if (xhr.readyState === 4) {

            if (xhr.status === 200) { 

                const response = JSON.parse(xhr.responseText);
                
                influencersList = Object.keys(response.influencers);

            } else {
                alert("Il y a une erreur ! Et l'erreur est humaine...");
            }
        }
    })

    // Envoi de la requête
    xhr.send();
}

