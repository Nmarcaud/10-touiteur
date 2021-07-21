// Mots les plus utilisés

const trendingList = document.querySelector('#trending-list');

function trendingWords(func) {

    // Pour le refresh 😘
    trendingList.textContent = '';

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) { 

                let response = JSON.parse(xhr.responseText)
                //console.log(response);
                
                /*
                // Création d'une liste des counts
                let counts = [];
                for (let word in response) {
                    counts.push(response[word])

                    // Ex-Affichage non trié
                    if (response[word] > 50) {
                        // Ajout du mot
                        func(word, response[word])
                    }
                    
                }

                // Je récupère le nombre d'occurences dans l'ordre
                let countsTri = counts.sort((a, b) => b - a);
                //console.log('Liste triée : ' + countsTri);

                // Je conserve les 15 premiers
                for(let i = 0 ; i < 20; i++) {
                    // Puis je regarde dans ma liste d'objets le mot associé au n°
                    for (let word in response) {
                        if(response[word] == countsTri[i]) {
                            func(word, response[word]);
                        }
                    }
                }
                */

                // Tri d'un tableau, transformé en liste avec Object.entrie
                let trendingListDeLaTriche = Object.entries(response).sort((a,b) => b[1]- a[1]);
                // Que les 64 premiers
                trendingListDeLaTriche.slice(0, 64).forEach(word => {
                    func(word[0], word[1]);
                });
               
                

            } else {
                alert("Il y a une erreur ! Et l'erreur est humaine...");
            }
        }
    });

    xhr.open('GET', 'http://touiteur.cefim-formation.org/trending', true);

    // Envoi de la requête
    xhr.send();
 
}

function addWord(word, number) {

    const spanText = document.createElement('li');
    spanText.textContent = word;
    spanText.className = "most-used position-relative";

    const spanTextBadge = document.createElement('span');
    spanTextBadge.textContent = number;
    spanTextBadge.className = "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger";

    spanText.appendChild(spanTextBadge);
    trendingList.appendChild(spanText);

}
