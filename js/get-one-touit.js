// Récupérer un seul touit par son id

function getOneTouit(touitId, comments, ts, like, dislike) {

    console.log('Refresh one');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) { 

                const response = JSON.parse(xhr.responseText)
                
                // Si succès
                if (response.hasOwnProperty("success")) {

                    // Récupération de la partie objet
                    let message = response.data;

                    console.log('Maj du touit');
                    console.log(message);
                    
                    // ts.textContent = message.ts;

                    // Mise à jour des comments
                    if (message.comments_count > 0) {
                        comments.textContent = message.comments_count;
                    }

                    // Mise à jour des likes et dislikes
                    if (message.likes > 0) {
                        like.textContent = message.likes;
                        dislike.textContent = "";

                    } else if (message.likes < 0) {
                        dislike.textContent = message.likes;
                        like.textContent = "";
                    } else {
                        like.textContent = "";
                        dislike.textContent = "";
                    }
                       
                // Si error
                } else if (response.hasOwnProperty("error")) {
                    console.log('Erreur ' + response.error);
                
                // Si inconnu
                } else {
                    alert("Une erreur inconnue s'est produite !");
                }
            } 
        }
    });

    xhr.open('GET', 'http://touiteur.cefim-formation.org/get?id=' + touitId);

    // Envoi de la requête
    xhr.send();

}

