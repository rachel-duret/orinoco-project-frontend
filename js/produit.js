'use strict';
let panierArray = new Array
//recuperer data dans localStorage
let getPanierList = () => {
    if (JSON.parse(localStorage.getItem("panierLists")) !== null) {
        panierArray = JSON.parse(localStorage.getItem('panierLists'));
        let navpanier = document.getElementById('navPanier');
        let span = document.createElement('span');
        span.innerText = panierArray.length;
        navpanier.appendChild(span);
      } 
}
getPanierList();
// recuperer id dans la page produit.html
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//send request pour demande produit information qui correspondre la page de produit
let url =fetch('https://orinoco-project-api.herokuapp.com/api/teddies'+id);
url.then((data) => {
    return data.json();  
})
// create a page produit
.then((dataArray) => { 
            // create elements
            let box = document.getElementById('teddy');
            let div = document.createElement('div');
            let img = document.createElement('img');
            let name = document.createElement('h2');
            let description = document.createElement('p');
            let price = document.createElement('p');
            let i = document.createElement('i');
            let selectColor = document.createElement('select');
            let selectQte = document.createElement('select');
            let btn = document.createElement('button');
            // donner des value à des elements
            img.src = dataArray.imageUrl;
            name.innerText = dataArray.name;
            description.innerText = dataArray.description;
            price.innerText = dataArray.price/100 ;
            i.className =" fas fa-euro-sign";
            selectQte.name = 'number';
            btn.innerText = 'Ajouter aux panier';
            btn.id = 'addBtn' ;
            // append elements child à des parents element qui correspondre
            box.appendChild(div);
            div.appendChild(img);
            div.appendChild(name);
            div.appendChild(description); 
            div.appendChild(price);      
            price.appendChild(i);
            div.appendChild(selectColor);
            div.appendChild(selectQte);
            div.appendChild(btn);
            //create options pour couleurs
            for(let i =0; i<dataArray.colors.length; i++){
                let option = document.createElement('option');
                option.innerText =dataArray.colors[i];
                selectColor.appendChild(option);
            }
            // create options pour produits quantité
            for(let i =1; i<10; i++){
                let option = document.createElement('option');
                option.innerText =i;
                selectQte.appendChild(option);
            }

             //add event listener add products to localstorage       
            const addGoodBtn = document.getElementById('addBtn');
            addGoodBtn.addEventListener('click', () => {
            // create un object pour localstorage
                let PanierList = {
                    "img": img.src,
                    "name":name.innerText,
                    "color":selectColor.value,
                    "price":price.innerText*selectQte.value,
                    "id": id,
                    "quantité":selectQte.value
                }           
                panierArray.push(PanierList)
                localStorage.setItem('panierLists', JSON.stringify(panierArray));    
                location.reload();            
            })         
                     
})
