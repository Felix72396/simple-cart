const itemContainer = document.getElementById("item-container");
const totalText = document.getElementById("total");

const cart = document.getElementById("cart-img");

let items = [
    {
        source: "../img/apple.png",
        name: "Apple",
        price: 1.3
    },
    {
        source: "../img/lemon.png",
        name: "Lemon",
        price: 0.4
    },
    {
        source: "../img/pear.png",
        name: "Pear",
        price: 1.5
    },
    {
        source: "../img/strawberry.png",
        name: "Strawberry",
        price: 0.8
    }
];

items.forEach((item) => {
    itemContainer.innerHTML += 
    `
    <div class="item flex-container">
       <section class="flex-container">
        <div class="img-item">
            <img src="${item.source}" alt="${item.name} image">
        </div>
        
        <div class="info-item">
            <div class="name-item">
            <b>${item.name}</b>
            </div>
            <div class="price-item">
                <small>$${item.price}</small>
            </div>
            <div class="remove-item">
                <button class="btn-remove">remove</button>
            </div>
        </div>
       </section>
       <section class="number-item">
        <input type="number" min="0" value="0">
       </section>
    </div>
    `;
});

let btnRemoveList = document.getElementsByClassName("btn-remove");
let itemList = document.getElementsByClassName("item");
let inputNumberList = document.querySelectorAll("input[type='number']");
inputNumberList = [...inputNumberList];
btnRemoveList = [...btnRemoveList];

btnRemoveList.forEach((btnRemove) => {
    btnRemove.addEventListener("click", () => {
        let index = btnRemoveList.indexOf(btnRemove);
        removeItem(btnRemove, index);
    });
});

function removeItem(btn, index)
{
    btn.parentNode.parentNode.parentNode.parentNode.remove();
    items.splice(index, 1);
    
    updateArrays();
    assignTotal();
 
}

function updateArrays()
{
    inputNumberList = document.querySelectorAll("input[type='number']");
    inputNumberList = [...inputNumberList];

    btnRemoveList = document.getElementsByClassName("btn-remove");
    btnRemoveList = [...btnRemoveList];
}

function assignTotal()
{
    let total = 0;

    let amount = inputNumberList.reduce((totalAmount, input) => {
        return totalAmount + parseInt(input.value);
    }, 0);

    cart.setAttribute("data-count", amount);

    inputNumberList.forEach((input, index) => {
        total += parseInt(input.value) * items[index].price;
    });

    total = total.toFixed(2);

    totalText.textContent = `$${total}`;
    
}

function resetAll()
{
    totalText.textContent = `$0`;
    cart.setAttribute("data-count", "0");
    
    inputNumberList.map(input => {
        input.value = 0;
    });

    assignTotal();
}

inputNumberList.forEach(inputNumber => {
   
    inputNumber.addEventListener("change", () => {
        assignTotal();   
    });
});

const btnClearCart = document.getElementById("clear-cart");

btnClearCart.addEventListener("click", () => {
    resetAll();
});





