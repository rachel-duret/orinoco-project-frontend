'use strict';
//desplay la page comfirmation
let orderData = JSON.parse(localStorage.getItem('orderData'));
let productsData = orderData.products;
let produits ='Teddies: ';
let Couleurs = 'Couleurs: ';
let sum = 0;
if (productsData !==null || !undefined){
    for(let i=0; i<productsData.length; i++){
        sum += productsData[i].price/100;
        produits += productsData[i].name+'-';    
    }
}
let priceTotal = localStorage.getItem('priceteddies');
let main = document.getElementById('main');
let h1 = document.createElement('h1');
let orderId = document.createElement('h2');
let productName = document.createElement('h2');
let productPrice= document.createElement('h2');
let i = document.createElement('i');
let text = document.createElement('p');
h1.innerText= "Merci Vos d'achat!";
orderId.innerText = 'Votre order munber: '+ orderData.orderId
productName.innerText = produits;
productPrice.innerText = 'Total Price: ' + priceTotal;
i.className ="fas fa-euro-sign";
text.innerText = 'Si vous avez des question, contact-nous!'
main.appendChild(h1);
main.appendChild(orderId);
main.appendChild(productName);
main.appendChild(productPrice);
productPrice.appendChild(i);
main.appendChild(text);

