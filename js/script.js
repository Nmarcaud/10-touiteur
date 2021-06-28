// Script JS de postage de Touit

const responsesField = document.querySelector('#responses');
const touitForm = document.querySelector('#touit-form');



// Postage d'un Post
touitForm.addEventListener('submit', e => {

    // Blocage de l'action du form html
    e.preventDefault();

    // Récupération du pseudo et du touit
    const pseudo = document.querySelector("#pseudo").value;
    const touitMessage = document.querySelector("#touit-message").value;
    // console.log(pseudo);
    // console.log(touitMessage);

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
                pseudoP.textContent = pseudo;
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
                touitMessageP.textContent = touitMessage;
                cardColTouit.appendChild(touitMessageP); 


    // Ajout au Dom
    responsesField.appendChild(card);

});




// Suppression d'un post
