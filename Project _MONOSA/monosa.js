let main=document.querySelectorAll('main')

window.onscroll = () => {
    main.forEach(main => {
        let top = window.scrollY;
        let offset = main.offsetTop - 150;
        let height = main.offsetHeight;

        if(top >= offset && top < offset + height){
            main.classList.add('show-animate');
        }
        else{
            main.classList.remove('show-animate');
            
        }
      })
}


let carts=document.querySelectorAll('.tocart');

let products=[
    {
        name:"White Shirt",
        tag:"White shirt",
        price:14,
        incart:0
    },
    {
        name:"black shirt",
        tag:"Black shirt",
        price:15,
        incart:0
    },
    {
        name:"red shirt",
        tag:"Grey shirt",
        price:16,
        incart:0
    },
    {
        name:"shirt",
        tag:"Blue shirt",
        price:17,
        incart:0
    },
    {
        name:"shirt",
        tag:"Red shirt",
        price:18,
        incart:0
    },
    {
        name:"shirt",
        tag:"White shirt",
        price:14,
        incart:0
    },
    {
        name:"shirt",
        tag:"Black shirt",
        price:15,
        incart:0
    },
    {
        name:"shirt",
        tag:"Grey shirt",
        price:16,
        incart:0
    },
    {
        name:"shirt",
        tag:"Blue shirt",
        price:17,
        incart:0
    },
    {
        name:"shirt",
        tag:"Red shirt",
        price:18,
        incart:0
    },
    {
        name:"shirt",
        tag:"White shirt",
        price:14,
        incart:0
    },
    {
        name:"shirt",
        tag:"Black shirt",
        price:15,
        incart:0
    },
    {
        name:"shirt",
        tag:"Grey shirt",
        price:16,
        incart:0
    },
    {
        name:"shirt",
        tag:"Blue shirt",
        price:17,
        incart:0
    },
    {
        name:"shirt",
        tag:"Red shirt",
        price:18,
        incart:0
    }
    
];

for(let i=0; i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function cartNumbers(product){
   
    let productNumbers=localStorage.getItem('cartNumbers');
    
    productNumbers=parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
    }
    else{
        localStorage.setItem('cartNumbers',1);
        
    }
    setItems(product);
}
function setItems(product){
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    
    if(cartItems!=null){
      if(cartItems[product.tag]==undefined){
        cartItems={
            ...cartItems,
            [product.tag]: product
        }
      }
     cartItems[product.tag].incart += 1;
    }
    else{
        product.incart=1;
        cartItems={
           [product.tag]: product
       }
    }

    
    
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}
function totalCost(product){
//    console.log("the products price is", product.price);
let cartCost = localStorage.getItem('totalCost');

console.log("My Cart Cost is", cartCost);
console.log(typeof cartCost);;

if(cartCost != null){
    cartCost=parseInt(cartCost);
    localStorage.setItem("totalCost",cartCost+product.price)
}else{
   localStorage.setItem("totalCost",product.price);
}
}
function displayCart(){
let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);
let productContainer = document.querySelector(".products");
let cartCost = localStorage.getItem('totalCost');

console.log(cartItems)
if( cartItems && productContainer){
    productContainer.innerHTML='';
    Object.values(cartItems).map(item =>{
        productContainer.innerHTML += `
        <div class="product">
        <ion-icon name="close-circle-outline"></ion-icon>
           <img src="./imag/${item.tag}.jpg">
           <span>${item.name} M</span>
           </div>
           <div class="price">$${item.price},00</div>
           <div class="quantity">
           <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
           <span>${item.incart}</span>
           <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
           </div>
           <div class="total">
           $${item.incart * item.price},00
           </div>

        `;
    });
         productContainer.innerHTML += `
         <div class="basketTotalContainer">
          <h4 class="basketTotalTitle">
          Basket Total
          </h4>
          <h4 class="basketTotal">
         $${cartCost}.00
          </h4>
         </div>
         `

}
}
displayCart();