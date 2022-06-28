import './style.css'
import './reset.css'
import './index.css'

let state = {
  storeItem: [
    { id: 1, name: "beetroot", price: 0.35, quantity: 0 },
    { id: 2, name: "carrot", price: 0.25, quantity: 0 },
    { id: 3, name: "apple", price: 0.45, quantity: 0 },
    { id: 4, name: "apricot", price: 0.35, quantity: 0 },
    { id: 5, name: "avocado", price: 0.45, quantity: 0 },
    { id: 6, name: "bananas", price: 0.35, quantity: 0 },
    { id: 7, name: "bell-pepper", price: 0.45, quantity: 0 },
    { id: 8, name: "berry", price: 0.35, quantity: 0 },
    { id: 9, name: "blueberry", price: 0.45, quantity: 0 },
    { id: 10, name: "eggplant", price: 0.35, quantity: 0 },
  ],
};
let storeItemList = document.querySelector(".store--item-list");
let shoppingCartList = document.querySelector(".cart--item-list");
let shoppingPrice = document.querySelector(".total-number");
let shoppingItemQuantity = document.querySelector(".quantity-text");

function rederStoreItem() {
  for (let i = 0; i < state.storeItem.length; i++) {
    let listItem = document.createElement("li");
    let iconItem = document.createElement("div");
    iconItem.className = "store--item-icon";
    let imgageItem = document.createElement("img");
    imgageItem.src =
      "./assets/icons/" +
      `${state.storeItem[i].id}`.padStart(3, "0") +
      `-${state.storeItem[i].name}.svg`;
    imgageItem.alt = state.storeItem[i].name;
    iconItem.append(imgageItem);
    let buttonItem = document.createElement("button");
    buttonItem.textContent = "Add to cart";
    let clickedButtonItem=false
    buttonItem.addEventListener("click", function () {
      if(!clickedButtonItem){
      state.storeItem[i].quantity += 1;
      renderShoppingItem(i);
      totalPrice();
      }
     clickedButtonItem=true
       
    });
    listItem.append(iconItem, buttonItem);
    storeItemList.append(listItem);
  }
}

function renderShoppingItem(j) {
  let total = 0;
  let shoppingCartItem = document.createElement("li");
  let itemImage = document.createElement("img");
  itemImage.className = "cart--item-icon";
  itemImage.src =
    "./assets/icons/" +
    `${state.storeItem[j].id}`.padStart(3, "0") +
    `-${state.storeItem[j].name}.svg`;

  itemImage.alt = state.storeItem[j].name;
  shoppingCartItem.append(itemImage);
  let itemName = document.createElement("p");
  itemName.textContent = state.storeItem[j].name;
  shoppingCartItem.append(itemName);
  let decreaseItemQuantity = document.createElement("button");
  decreaseItemQuantity.className = "quantity-btn remove-btn center";
  decreaseItemQuantity.textContent = "-";
  decreaseItemQuantity.addEventListener("click", function () {
    itemQuantity.textContent = parseInt(itemQuantity.textContent) - 1;
    if (itemQuantity.textContent === "0") shoppingCartItem.remove();
    state.storeItem[j].quantity = parseInt(itemQuantity.textContent);
    let itemPrice = state.storeItem[j].price * state.storeItem[j].quantity;
    total -= itemPrice;
    shoppingPrice.textContent = total.toFixed(2);
    totalPrice();
  });
  shoppingCartItem.append(decreaseItemQuantity);
  let itemQuantity = document.createElement("span");
  itemQuantity.className = "quantity-text center";
  itemQuantity.textContent = "1";
  shoppingCartItem.append(itemQuantity);
  let increaseItemQuantity = document.createElement("button");
  increaseItemQuantity.className = "quantity-btn add-btn center";
  increaseItemQuantity.textContent = "+";
  increaseItemQuantity.addEventListener("click", function () {
    itemQuantity.textContent = parseInt(itemQuantity.textContent) + 1;
    state.storeItem[j].quantity = parseInt(itemQuantity.textContent);
    totalPrice();
  });
  shoppingCartItem.append(increaseItemQuantity);
  shoppingCartList.append(shoppingCartItem);
}

function totalPrice() {
  let total = 0;

  for (let i = 0; i < state.storeItem.length; i++) {
    total += state.storeItem[i].price * state.storeItem[i].quantity;
  }

  shoppingPrice.textContent = total.toFixed(2);
}

function render() {
  rederStoreItem();
}
render();
