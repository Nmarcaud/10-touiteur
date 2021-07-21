// Gestion des commentaires 
const commentForm = document.querySelector('#comment-form');
const commentTouitId = document.querySelector('#comment-post-id');
const commentName = document.querySelector('#comment-pseudo');
const commentMessage = document.querySelector('#comment-message');


// Listener sur le form comment
commentForm.addEventListener('submit', (e) => {

    e.preventDefault();

    console.log('Touit comment : ' + commentTouitId.value)

    sendComment(commentTouitId.value, commentName.value, commentMessage.value);

})


// Ajouter un comment ( Avec un maginfique objet destructuré )
function addComment({comment, name, ts}) {

    // Gestion du timestamp
    let date = new Date(ts)  

    // Transformation en date clair et lisible
    let dateComment = "Le " +
                    date.getDate().toString().padStart(2, "0")+
                    
                    "/"+(date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1) +
    
                    "/"+date.getFullYear()+
                    " à " +
                    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
                    "h"+(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
                    // +"min"//+(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());


    // Créa de la card
    const card = document.createElement('article');
    card.setAttribute("class", "card mb-4 comment w100");

    // Créa du body
    const cardBody =  document.createElement('div');
    cardBody.setAttribute("class", "card-body p-4");
    card.appendChild(cardBody); // ajout à la Card

        // Créa de la row "Avatar et Pseudo"
        const cardRowPseudo =  document.createElement('div');
        cardRowPseudo.setAttribute("class", "row mb-2");
        cardBody.appendChild(cardRowPseudo); // ajout au card-body

            // Créa de la col "Avatar et Pseudo"
            const cardColPseudo =  document.createElement('div');
            cardColPseudo.setAttribute("class", "col d-flex align-items-center");
            cardRowPseudo.appendChild(cardColPseudo); 

                // Créa du span "Avatar"
                const spanAvatar =  document.createElement('span');
                spanAvatar.setAttribute("class", "user-avatar me-3");
                cardColPseudo.appendChild(spanAvatar); 

                    // Créa de l'avatar ( i ) font awesome
                    const avatarFA =  document.createElement('i');
                    avatarFA.setAttribute("class", "far fa-fw fa-bat");
                    spanAvatar.appendChild(avatarFA); 
                
                // Créa du p "Pseudo"
                const pseudoP =  document.createElement('p');
                pseudoP.setAttribute("class", "pseudo");
                pseudoP.textContent = name;
                cardColPseudo.appendChild(pseudoP); 


        // Créa de la row "Comment"
        const cardRowTouit =  document.createElement('div');
        cardRowTouit.setAttribute("class", "row mb-2");
        cardBody.appendChild(cardRowTouit); // ajout au card-body

            // Créa de la col "Comment"
            const cardColTouit =  document.createElement('div');
            cardColTouit.setAttribute("class", "col");
            cardRowTouit.appendChild(cardColTouit);

                // Créa du p "Comment message"
                const touitMessageP =  document.createElement('p');
                touitMessageP.setAttribute("class", "touit-message");
                touitMessageP.textContent = comment;
                cardColTouit.appendChild(touitMessageP); 


        // Créa de la row "Timestamp"
        const cardRowTimestamp =  document.createElement('div');
        cardRowTimestamp.setAttribute("class", "row");
        cardBody.appendChild(cardRowTimestamp); // ajout au card-body
 
            // Créa de la col "Timestamp"
            const cardColTimestamp =  document.createElement('div');
            cardColTimestamp.setAttribute("class", "col");
            cardRowTimestamp.appendChild(cardColTimestamp);
 
                // Créa du p "Timestamp comment"
                const touitTs =  document.createElement('small');
                touitTs.setAttribute("class", "date-touit text-muted");
                touitTs.textContent = dateComment;
                cardColTimestamp.appendChild(touitTs); 

    // Ajout au Dom
    commentsZone.appendChild(card);
}


// Charger les comments
function loadComments(touitId) {

    // Chargement
    commentsZone.textContent = "Loading...";

    // Requete affichage des données
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://touiteur.cefim-formation.org/comments/list?message_id=' + touitId, true);

    xhr.addEventListener('readystatechange', () => {

        if (xhr.readyState === 4) {

            if (xhr.status === 200) { 

                // Reset du chargement
                commentsZone.textContent = "";

                // Je récupère la réponse        
                let response = JSON.parse(xhr.responseText);
                // console.log(response)

                // Super efficace et super dynamique ! #tropbeautiful 😍😍😍😍 Encore plus dynamique !
                response.comments.forEach(addComment);

            } else {
                alert("Il y a une erreur ! Et l'erreur est humaine...");
            }

        }
    });
    

    // Envoi de la requête
    xhr.send();
    
} 


// Envoi du commentaire 
function sendComment (touitId, pseudo, message) {
 
    const commentXhr = new XMLHttpRequest();

    commentXhr.addEventListener("readystatechange", function() {

        if (commentXhr.readyState === 4) {

            if (commentXhr.status === 200) { 

                console.log('Send a comment');

                // Je récupère la réponse        
                let response = JSON.parse(commentXhr.responseText)
                console.log(response)

                // Reset du form
                commentForm.reset();
                // Et hide du modal
                myModal.hide();

            }
        }
    });

    commentXhr.open('POST', 'http://touiteur.cefim-formation.org/comments/send');

    commentXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    // Envoi de la requête
    commentXhr.send(`message_id=${touitId}&name=${pseudo}&comment=${message}`);
}