// Script JS de postage de Touit
const responsesMostLike = document.querySelector('#responses-most-like');
const responsesField = document.querySelector('#responses');
const touitForm = document.querySelector('#touit-form');

// Comments dans un modal
const myModal = new bootstrap.Modal(document.querySelector("#comment-modal"));
const commentsZone = document.querySelector('#comments-zone');

// Initialisation de la liste des influenceurs
let influencersList = [];


// Initialisation du timestamp
let ts = 0;


// Mots les plus recherchés
trendingWords(addWord);

// Récupération des 10 top influenceurs du moment
getInfluencer();

// Recevoir les touits ( Avec des supers fonctions callbacks )
mostlikeTouit(getInfluencer);
receiveTouits(addTouit);


// Actualisations
setInterval(() => {
    console.log('Actualisation touits');
    getInfluencer();
    receiveTouits(addTouit);
}, 2000);
setInterval(() => {
    console.log('Actualisation mots')
    trendingWords(addWord);
    mostlikeTouit(getInfluencer);
}, 60000);          
                


// Pour faire Mumuse 🥳
/*
setInterval(() => {
    likePost(2547);
}, 270);

/*
setInterval(() => {
    postTouit('CallMeMaybe', 'callbacklover callbacklover callbacklover callbacklover callbacklover callbacklover callbacklover callbacklover callbacklover callbacklover callbacklover callbacklover callbacklover callbacklover callbacklover callbacklover callbacklover');
}, 10000);*/




// Postage d'un Touit
touitForm.addEventListener('submit', e => {

    // Blocage de l'action du form html
    e.preventDefault();

    // Récupération du pseudo et du touit
    // .trim() enleve les espaces
    const pseudo = document.querySelector("#pseudo").value.trim();
    const touitMessage = document.querySelector("#touit-message").value.trim();
    console.log(pseudo);
    console.log(touitMessage);

    // Verif si un champ est vide
    if (pseudo.length > 3 &&  pseudo.length <= 16 && touitMessage.length > 3 &&  touitMessage.length <= 256) {

        // Post touit
        postTouit(pseudo, touitMessage);

        // Récupération des nouveaux touits
        receiveTouits();
        
        // Reset du formulaire
        touitForm.reset();

    }
    
});




// Fonction Add Touit
function addTouit({id, ip, name, message, ts, comments_count, likes}, field, top) {

    // Gestion du timestamp
    let date = new Date(ts);       
    // Transformation en date clair et lisible
    let dateTouit = "Le " +
                    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
                    "/"+(date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1) +
    
                    "/"+date.getFullYear()+
                    " à " +
                    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
                    "h"+(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
                    // +"min"//+(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());


    // Créa de la card
    const card = document.createElement('article');
    card.id = id;
    card.setAttribute("class", "card mb-4 touit");

    // Check si influenceur
    if (influencersList.includes(name)) {
        card.setAttribute("class", "card mb-4 touit influenceur-bg");
    } else {
        card.setAttribute("class", "card mb-4 touit");
    }

    
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
                spanAvatar.id = ip;
                cardColPseudo.appendChild(spanAvatar); 


                    // Créa de l'avatar ( i ) font awesome
                    const avatarFA =  document.createElement('i');
                    avatarFA.setAttribute("class", "far far fa-fw fa-frog");
                    spanAvatar.appendChild(avatarFA); 


                // Créa du p "Pseudo"
                const pseudoP =  document.createElement('p');
                pseudoP.setAttribute("class", "pseudo");
                pseudoP.textContent = name;
                cardColPseudo.appendChild(pseudoP); 

                // Créa du span "Suppression"
                const spanBadge =  document.createElement('span');
                spanBadge.setAttribute("class", "ms-auto react-icon");
                cardColPseudo.appendChild(spanBadge);
                    
                    // Si top liké, badge
                    if (top) {
                        const badge =  document.createElement('i');
                        badge.setAttribute("class", "far fa-fw fa-medal");
                        spanBadge.appendChild(badge);
                    } 


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


        // Créa de la row "Réactions"
        const cardRowReaction =  document.createElement('div');
        cardRowReaction.setAttribute("class", "row");
        cardBody.appendChild(cardRowReaction); // ajout au card-body
 
            // Créa de la col "Réactions"
            const cardColReaction =  document.createElement('div');
            cardColReaction.setAttribute("class", "col d-flex");
            cardRowReaction.appendChild(cardColReaction);
 
                // Créa de la box des raction
                const boxReaction =  document.createElement('div');
                boxReaction.setAttribute("class", "box-reaction bg-light");
                cardColReaction.appendChild(boxReaction); 

                    // Comment Box icon
                    const commentBoxIcon =  document.createElement('span');
                    commentBoxIcon.setAttribute("class", "mx-2 react-icon comment-icon");
                    commentBoxIcon.setAttribute("data-touit-id", id);
                    boxReaction.appendChild(commentBoxIcon);

                        // Comment Span Box icon
                        const commentSpan =  document.createElement('span');
                        commentBoxIcon.appendChild(commentSpan);

                        //
                        const commentIcon =  document.createElement('i');
                        // Ajout des commentaires
                        if (comments_count > 0) {
                            // Nombre de commentaires
                            commentSpan.textContent = comments_count;
                            // Coeur plein
                            commentIcon.setAttribute("class", "fas fa-fw fa-comment");
                            // Ajout class couleur de la box
                            commentBoxIcon.classList.add("comment-color-icon");
                        } else {
                            commentIcon.setAttribute("class", "far fa-fw fa-comment");
                        }
                       
                        commentBoxIcon.appendChild(commentIcon);


                        // Event listener sur bouton comment
                        commentBoxIcon.addEventListener('click', () => {

                            let touitId = commentBoxIcon.getAttribute('data-touit-id');
    
                            console.log('Click on comment btn');
    
                            // Chargment des commentaires de ce touit
                            commentsZone.textContent = "";          // Vide
                            loadComments(touitId);
    
                            // Ajout de l'id du post dans un champ hidden du formulaire pour commenter
                            document.querySelector('#comment-post-id').value = touitId;
    
                            // affichage de la fentre modal
                            myModal.show();
                             
                        })


                    // Retouit Box icon
                    const retouitBoxIcon =  document.createElement('span');
                    retouitBoxIcon.setAttribute("class", "mx-2 react-icon retouit-icon");
                    boxReaction.appendChild(retouitBoxIcon);

                        //
                        const retouitIcon =  document.createElement('i');
                        retouitIcon.setAttribute("class", "far fa-fw fa-retweet");
                        retouitBoxIcon.appendChild(retouitIcon);


                    // Love / Like Box icon
                    const loveBoxIcon =  document.createElement('span');
                    loveBoxIcon.setAttribute("class", "mx-2 react-icon love-icon");
                    loveBoxIcon.setAttribute("data-touit-id", id);
                    boxReaction.appendChild(loveBoxIcon);

                        // Comment Span Like
                        const likeSpan =  document.createElement('span');
                        loveBoxIcon.appendChild(likeSpan);

                        //
                        const loveIcon =  document.createElement('i');
                        // Ajout des likes
                        if (likes > 0) {
                            // Nombre de likes
                            likeSpan.textContent = likes;
                            // Coeur plein
                            loveIcon.setAttribute("class", "fas fa-fw fa-heart love-color-icon");
                            // Ajout class couleur de la box
                            loveBoxIcon.classList.add("love-color-icon");
                        } else {
                            loveIcon.setAttribute("class", "far fa-fw fa-heart");
                        }
                        loveBoxIcon.appendChild(loveIcon);

                        // Event listener 
                        loveBoxIcon.addEventListener('click', () => {

                            console.log('Click on like btn');
        
                            // Envoi du like
                            likePost(loveBoxIcon.getAttribute('data-touit-id'));
                                
                        })


                        // Love / Like Box icon
                        const dislikeBoxIcon =  document.createElement('span');
                        dislikeBoxIcon.setAttribute("class", "mx-2 react-icon love-icon");
                        dislikeBoxIcon.setAttribute("data-touit-id", id);
                        boxReaction.appendChild(dislikeBoxIcon);

                            // Comment Span Like
                            const dislikeSpan =  document.createElement('span');
                            dislikeBoxIcon.appendChild(dislikeSpan);

                            //
                            const dislikeIcon =  document.createElement('i');
                            // Ajout des likes
                            if (likes < 0) {
                                // Nombre de likes
                                dislikeSpan.textContent = likes;
                                // Coeur plein
                                dislikeIcon.setAttribute("class", "fas fa-fw fa-heart-broken love-color-icon");
                                // Ajout class couleur de la box
                                dislikeBoxIcon.classList.add("love-color-icon");
                            } else {
                                dislikeIcon.setAttribute("class", "far fa-fw fa-heart-broken");
                            }
                            dislikeBoxIcon.appendChild(dislikeIcon);

                            // Event listener 
                            dislikeBoxIcon.addEventListener('click', () => {

                                console.log('Click on like btn');
            
                                // Envoi du dislike
                                dislikePost(dislikeBoxIcon.getAttribute('data-touit-id'), dislikeBoxIcon);
                                    
                            })

                    // Share Box icon
                    const shareBoxIcon = document.createElement('span');
                    shareBoxIcon.setAttribute("class", "mx-2 react-icon share-icon");
                    boxReaction.appendChild(shareBoxIcon);

                        //
                        const shareIcon = document.createElement('i');
                        shareIcon.setAttribute("class", "far fa-fw fa-share");
                        shareBoxIcon.appendChild(shareIcon);          

    // Maj au survol
    card.addEventListener('mouseenter', () => {
        getOneTouit(id, commentSpan, touitTs, likeSpan, dislikeSpan);
    })
          
    // Ajout au Dom
    field.appendChild(card);

}



// Recevoir tous les touits
function receiveTouits(func) {

    // Requete affichage des données
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://touiteur.cefim-formation.org/list', true);

    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) { 
                // Je récupère la réponse        
                let response = JSON.parse(xhr.responseText)
                // console.log(response.messages)

                // Méthode itérative DYNAMIQUE et EFFICACE !
                response.messages.forEach( touit => {

                    if (touit.ts > ts) {

                        // J'ajoute mon touit
                        func(
                            touit,                  // Objet destructuré ! #trucdeouf
                            responsesField,         // field d'ajout
                            false                   // Is it a most-like ?
                        );
                        
                        // Maj du ts
                        ts = touit.ts;
                    }
                });

            } else {
                alert("Il y a une erreur ! Et l'erreur est humaine...");
            }
        }
    });

    // Envoi de la requête
    xhr.send();

}



// XML Version 
function postTouit (name, message) {
    
    // Requete d'envoi des données
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://touiteur.cefim-formation.org/send', true);

    xhr.addEventListener("readystatechange", () => {

        if (xhr.readyState === 4) {

            if (xhr.status === 200) { 

                const response = JSON.parse(request.responseText)
                
                // Si succès
                if (response.hasOwnProperty("success")) {
                    alert('Votre touit a été envoyé');

                // Si error
                } else if (response.hasOwnProperty("error")) {
                    alert('Erreur ' + response.error);
                
                // Si inconnu
                } else {
                    alert("Une erreur inconnue s'est produite !");
                }

                console.log('Test ok');

            } else {
                alert("Il y a une erreur ! Et l'erreur est humaine...");
            }
        }
    });

    // Pour voir le résultat dans la console - Pas sur que ça serve vraiment...
    xhr.onload = () => {
        let ourData = JSON.parse(xhr.responseText);
        console.log(ourData);
    }

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    let touitUrl = `name=${name}&message=${message}`;
    // console.log(touitUrl);

    // Envoi de la requête
    xhr.send(touitUrl);

}
