'use strict';
//recouperer produit data dans localstorage
let panierLists = JSON.parse(localStorage.getItem('panierLists'));
// display la page panier
 let displayPanier = ( src, title, quantité, colors,  price) => {
     // create elements
    let panier = document.getElementById('panier');
    let divBox = document.createElement('div');
    let divImg = document.createElement('div');
    let div = document.createElement('div');
    let img = document.createElement('img');
    let name = document.createElement('h2');
    let color = document.createElement('p');
    let totalQte = document.createElement('p');
    let prix = document.createElement('p');
    let i = document.createElement('i');
    let btnDel = document.createElement('button');
   // donner des value à des elements
    divBox.className = "teddy";
    divImg.className = 'imgBox'
    div.className = 'infoBox';
    img.src = src;
    name.innerText = title;
    color.innerText = colors;
    totalQte.innerText = quantité;
    prix.innerText = price;
    i.className = "fas fa-euro-sign";
    btnDel.className = 'delBtn';
    btnDel.innerText = 'Supprimer';
   // append elements child à des parents element qui correspondre
    panier.appendChild(divBox);
    divBox.appendChild(divImg);
    divImg.appendChild(img);
    divBox.appendChild(div);
    div.appendChild(name);
    div.appendChild(totalQte);
    div.appendChild(color);
    div.appendChild(prix);      
    prix.appendChild(i);
    divBox.appendChild(btnDel);                     
}
for(let i in panierLists){
    displayPanier( panierLists[i].img, panierLists[i].name,panierLists[i].quantité,panierLists[i].color,panierLists[i].price);
}
// afficher panier est vide
if (panierLists==null || panierLists==0){
    let text = document.createElement('h4');
    text.innerText = 'Votre panier est vide!';
    panier.appendChild(text); 
    }      

 let products= new Array;// declarer un tableau pour send à backend
 let sum = 0;
 if (panierLists !==null){
     //afficher quantité panier dans navbar de la page panier
    let navpanier = document.getElementById('navPanier');
    let span = document.createElement('span');
    span.innerText = panierLists.length;
    navpanier.appendChild(span);
    //count panier total prix
    for( let i=0; i<panierLists.length; i++){
        sum += panierLists[i].price; 
        //push panier produits id à tableau
        products.push(panierLists[i].id);
    }
    localStorage.setItem('priceteddies', sum);
 }
// afficher le total le prix dan la page panier
 let totalPrix = document.createElement('h3');
 let i = document.createElement('i');
 i.className = "  fas fa-euro-sign";
 totalPrix.innerText = 'Total Prix:   ' + sum ;
 totalPrix.appendChild(i);
 panier.appendChild(totalPrix);

 //delete goods function
 let deletGood = () => {
    let btns = document.querySelectorAll('.delBtn');
    for(let i=0; i<btns.length; i++){
        btns[i].addEventListener('click', (e) => {
            // delete dom dans la page panier
            let delDiv = btns[i].parentElement;
            let parent = delDiv.parentElement;
            let removed = parent.removeChild(delDiv);
            removed===removed;
             panierLists.splice(i,1);// delete produit data dans localstorage qui corresponds delete produit dans la page
            localStorage.removeItem('panierLists')
            localStorage.setItem('panierLists',JSON.stringify(panierLists));
            location.reload();               
        })
    }  
}
deletGood();

//add eventlistener pour form submit
let submit = document.getElementById('info-client');
submit.addEventListener('submit', (e) => {
    // stop auto submit of the form
    e.preventDefault();
    //create un object contact pour send à backend
    let lastName = document.getElementById('nom');
    let firstName = document.getElementById('prenom');
    let address = document.getElementById('addresse');
    let city = document.getElementById('ville');
    let email = document.getElementById('email');
    let contact = {
        firstName: lastName.value,
        lastName: firstName.value,
        address: address.value,
        city: city.value,
        email: email.value
    } 
    //stop submit sans contact info
    if(lastName.value,firstName.value, address.value, city.value, email.value== ''){
        alert("Votre contact info n'est pas correct!" );
        return false;
    } 
    //stop submit panier vide
    if(panierLists===null || panierLists.length===0){
        alert('Votre panier est vide, choissez vos produits!');
        return false;
    }

    // send request à backend pour demander confirmation 
   let reqUrl = 'https://orinoco-project-api.herokuapp.com/api/teddies/order';
   fetch(reqUrl, {
       method: "POST",
       headers:{
           "Content-Type": "application/json"
        },
       body: JSON.stringify({contact, products})   
   })
   .then((response) => {
       return response.json()
   })
   // recuperer data comfirmation, remove panier produit data dans localstorage, et stock confiemation data dans localstorage
   .then((data) => {
       let panierLists = null;
       localStorage.removeItem('panierLists')
       localStorage.setItem('panierLists',JSON.stringify(panierLists))      
       localStorage.setItem('orderData', JSON.stringify(data));
       //display page comfirmation
       location.href='confirmation.html?'+data.orderId;     
   })
   .catch((err) => {
    alert('error');
   })
})