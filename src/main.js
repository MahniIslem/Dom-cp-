let shop = document.getElementById('shop');



let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateshop =()=>{
    return (shop.innerHTML= shopitemdata.map((x)=>{
        let {id,name,desc,price,img} = x
        let search = basket.find((x)=> x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
        <img src=${img} alt="" width="220">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                    ${search.item === undefined? 0: search.item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
            <div>
            <i onclick="colorchange(${id})" id="heart" class="bi bi-heart-fill"></i>
            </div>
        </div>
       </div>`
    }).join(""));
};
generateshop();

let increment = (id) => {
    let selecteditem = id;
    let search = basket.find((x)=> x.id === selecteditem.id);
    if (search === undefined){
        basket.push({
            id: selecteditem.id,
            item: 1,
        })
    }else {
        search.item += 1;
    }
     update(selecteditem.id);
     localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selecteditem = id;
    let search = basket.find((x)=> x.id === selecteditem.id);
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selecteditem.id);
    basket = basket.filter((x)=>x.item !== 0);
   localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find ((x)=> x.id === id);
    document.getElementById(id).innerHTML = search.item; 
    calculation();
};

let calculation =()=>{
    let carticon = document.getElementById("cartamount");
    carticon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
};
calculation();
