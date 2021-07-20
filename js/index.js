'use strict';
// desplay teddies
let url = fetch('https://orinoco-project-api.herokuapp.com/api/teddies');//send request demander data de produit
url.then((data) => {
    return data.json();  
})
.then((dataArray) => {
    //utiliser les information de dataArray pour desplay teddies index.html. 
    let displayTeddies = ( src, title, price,href) => {
        //créate elements
        let box = document.getElementById('teddies');
        let div = document.createElement('div');
        let img = document.createElement('img');
        let h2 = document.createElement('h2');
        let p = document.createElement('p');
        let i = document.createElement('i');
        let a = document.createElement('a');
        // donner values à elements
        div.className = "teddy";
        img.src = src;
        h2.innerText = title;
        p.innerText = price/100 ;
        i.className ="fas fa-euro-sign";
        a.innerText = 'Voir plus' ;
        a.href = href;
        // append elements child à des parents element qui correspondre
        box.appendChild(div);
        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);      
        p.appendChild(i);
        p.appendChild(a);                          
    }
    //recuperer chaque information de produit et applle la fonction.
    for(let i in dataArray){
        displayTeddies( dataArray[i].imageUrl, dataArray[i].name, dataArray[i].price, 'produit.html?id='+dataArray[i]._id);
    }
})
.catch((error) => {
    alert('error');
    
});

//afficher  panier quantité dans navbar de la page accuile.
let panierLists = JSON.parse(localStorage.getItem('panierLists'));
if (panierLists !==null){
    const navpanier = document.getElementById('navPanier');
    const span = document.createElement('span');
    span.innerText = panierLists.length;
    navpanier.appendChild(span);
}