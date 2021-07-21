// Likes 
function likePost(touitId) {

    const likeXhr = new XMLHttpRequest();

    likeXhr.open('PUT', 'http://touiteur.cefim-formation.org/likes/send', true);

    likeXhr.addEventListener("readystatechange", function() {

        if (likeXhr.readyState === 4) {

            if (likeXhr.status === 200) { 

                console.log('Like a touit');

                // Je récupère la réponse        
                let response = JSON.parse(likeXhr.responseText);
                console.log(response);

            } else {
                alert("Il y a une erreur ! Et l'erreur est humaine...");
            }
        }
    });

    likeXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    // Envoi de la requête
    likeXhr.send(`message_id=${touitId}`);

}


function dislikePost(touitId) {

    const likeXhr = new XMLHttpRequest();

    likeXhr.open('DELETE', 'http://touiteur.cefim-formation.org/likes/remove', true);

    likeXhr.addEventListener("readystatechange", function() {

        if (likeXhr.readyState === 4) {

            if (likeXhr.status === 200) { 

                console.log('Dislike a touit');

                // Je récupère la réponse        
                let response = JSON.parse(likeXhr.responseText);
                console.log(response);

                if (response.hasOwnProperty("success")) {

                    console.log('Dislike a touit');

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

    likeXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    // Envoi de la requête
    likeXhr.send(`message_id=${touitId}`);

}