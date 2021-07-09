// Script JS de postage de Touit

const responsesField = document.querySelector('#responses');
const touitForm = document.querySelector('#touit-form');



// Postage d'un Post
touitForm.addEventListener('submit', e => {

    // Blocage de l'action du form html
    e.preventDefault();

    // Récupération du pseudo et du touit
    // .trim() enleve les espaces
    const pseudo = document.querySelector("#pseudo").value.trim();
    const touitMessage = document.querySelector("#touit-message").value.trim();
    // console.log(pseudo);
    // console.log(touitMessage);

    // Verif si un champ est vide
    if (pseudo !== "" && touitMessage !== "") {

        // Création du timestamp en secondes
        let tsSeconds = new Date()/1000

        // Ajout du 
        addTouit(pseudo, touitMessage, tsSeconds);

        // Reset du formulaire
        touitForm.reset();
    }
    

    
    

});

// Fonction Add Touit
function addTouit(name, message, ts, comments, likes) {

    console.log(message);

    // Gestion du timestamp
    let date = new Date(ts*1000)        // * 1000 pour conversion en ms
    // Transformation en date clair et lisible
    let dateTouit = "Le " +
                    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
                    "/"+(date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1) +
    
                    "/"+date.getFullYear()+
                    " à " +
                    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
                    "h"+(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
                    "min"//+(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());


    // Créa de la card
    const card = document.createElement('div');
    card.setAttribute("class", "card mb-4");

    // Créa du body
    const cardBody =  document.createElement('div');
    cardBody.setAttribute("class", "card-body p-5");
    card.appendChild(cardBody); // ajout à la Card

        // Créa de la row "Avatar et Pseudo"
        const cardRowPseudo =  document.createElement('div');
        cardRowPseudo.setAttribute("class", "row mb-3");
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

                // Créa du span "Suppression"
                const crossSuppression =  document.createElement('span');
                crossSuppression.setAttribute("class", "ms-auto react-icon");
                cardColPseudo.appendChild(crossSuppression);

                    // Créa de la croix de suppression ( i ) font awesome
                    const crossFA =  document.createElement('i');
                    crossFA.setAttribute("class", "far fa-fw fa-times");
                    crossSuppression.appendChild(crossFA); 


        // Créa de la row "Touit"
        const cardRowTouit =  document.createElement('div');
        cardRowTouit.setAttribute("class", "row mb-3");
        cardBody.appendChild(cardRowTouit); // ajout au card-body

            // Créa de la col "Touit"
            const cardColTouit =  document.createElement('div');
            cardColTouit.setAttribute("class", "col");
            cardRowTouit.appendChild(cardColTouit);

                // Créa du p "Touit message"
                const touitMessageP =  document.createElement('p');
                touitMessageP.setAttribute("class", "touit-message");
                touitMessageP.textContent = message;
                cardColTouit.appendChild(touitMessageP); 


        // Créa de la row "Timestamp"
        const cardRowTimestamp =  document.createElement('div');
        cardRowTimestamp.setAttribute("class", "row mb-3");
        cardBody.appendChild(cardRowTimestamp); // ajout au card-body
 
            // Créa de la col "Touit"
            const cardColTimestamp =  document.createElement('div');
            cardColTimestamp.setAttribute("class", "col");
            cardRowTimestamp.appendChild(cardColTimestamp);
 
                // Créa du p "Touit message"
                const touitTs =  document.createElement('small');
                touitTs.setAttribute("class", "date-touit text-muted");
                touitTs.textContent = dateTouit;
                cardColTimestamp.appendChild(touitTs); 


        // Créa de la row "Like"
        const cardRowReaction =  document.createElement('div');
        cardRowReaction.setAttribute("class", "row mb-3");
        cardBody.appendChild(cardRowReaction); // ajout au card-body
 
            // Créa de la col "Touit"
            const cardColReaction =  document.createElement('div');
            cardColReaction.setAttribute("class", "col d-flex");
            cardRowReaction.appendChild(cardColReaction);
 
                // Créa de la box des raction
                const boxReaction =  document.createElement('div');
                boxReaction.setAttribute("class", "box-reaction bg-light");
                cardColReaction.appendChild(boxReaction); 

                    // Comment Box icon
                    const commentBoxIcon =  document.createElement('span');
                    commentBoxIcon.setAttribute("class", "mx-3 react-icon comment-icon");
                    boxReaction.appendChild(commentBoxIcon);

                        //
                        const commentIcon =  document.createElement('i');
                        // Ajout des commentaires
                        if (comments > 0) {
                            // Nombre de commentaires
                            commentBoxIcon.textContent = comments;
                            // Coeur plein
                            commentIcon.setAttribute("class", "fas fa-fw fa-comment");
                            // Ajout class couleur de la box
                            commentBoxIcon.classList = "comment-color-icon";
                        } else {
                            commentIcon.setAttribute("class", "far fa-fw fa-comment");
                        }
                       
                        commentBoxIcon.appendChild(commentIcon);

                    // Retouit Box icon
                    const retouitBoxIcon =  document.createElement('span');
                    retouitBoxIcon.setAttribute("class", "mx-3 react-icon retouit-icon");
                    boxReaction.appendChild(retouitBoxIcon);

                        //
                        const retouitIcon =  document.createElement('i');
                        retouitIcon.setAttribute("class", "far fa-fw fa-retweet");
                        retouitBoxIcon.appendChild(retouitIcon);

                    // Love / Like Box icon
                    const loveBoxIcon =  document.createElement('span');
                    loveBoxIcon.setAttribute("class", "mx-3 react-icon love-icon");
                    boxReaction.appendChild(loveBoxIcon);

                        //
                        const loveIcon =  document.createElement('i');
                        // Ajout des likes
                        if (likes > 0) {
                            // Nombre de likes
                            loveBoxIcon.textContent = likes;
                            // Coeur plein
                            loveIcon.setAttribute("class", "fas fa-fw fa-heart ove-color-icon");
                            // Ajout class couleur de la box
                            loveBoxIcon.classList = "love-color-icon";
                        } else {
                            loveIcon.setAttribute("class", "far fa-fw fa-heart");
                        }
                        loveBoxIcon.appendChild(loveIcon);


    // Ajout au Dom
    responsesField.appendChild(card);
}




// Requete affichage des données
const receiveAllPost = new XMLHttpRequest();
receiveAllPost.onreadystatechange = function( ) {
    if (receiveAllPost.readyState === 4) {


        // Je récupère la réponse        
        let response = JSON.parse(receiveAllPost.responseText)
        // console.log(response.messages)

        // Je récupère juste les message dans l'objet réponse
        let messages = response.messages

        // Je boucle sur les messages
        for (let i = 0; i < messages.length; i++) {
            // console.log(messages[i])

            // J'ajoute mon touit
            addTouit(messages[i].name,
                messages[i].message,
                messages[i].ts,
                messages[i].comments_count,
                messages[i].likes
                );
        }
    }
};
receiveAllPost.open('GET', 'http://touiteur.cefim-formation.org/list');

// Envoi de la requête
receiveAllPost.send();



// Requete d'envoi des données
const sendPost = new XMLHttpRequest();
sendPost.onreadystatechange = function( ) {
    if (sendPost.readyState === 4) {
        console.log('Post envoyé');
    }
};
sendPost.open('POST', 'http://touiteur.cefim-formation.org/send');

// Envoi de la requête
sendPost.send(
    {
        name: 'test',
        message: 'test'
    }
);