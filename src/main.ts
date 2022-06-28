import "./style.css";
import "./reset.css";
import "./index.css";

type StoreItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type state = {
  storeItem: StoreItem[];
};

let state: state = {
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
let storeItemList =
  document.querySelector<HTMLUListElement>(".store--item-list");
let shoppingCartList =
  document.querySelector<HTMLUListElement>(".cart--item-list");
let shoppingPrice = document.querySelector<HTMLUListElement>(".total-number");

function imgageSrcItem(item: StoreItem) {
  return (
    "./assets/icons/" + `${item.id}`.padStart(3, "0") + `-${item.name}.svg`
  );
}

function decreaseQuantity(item: StoreItem) {
  item.quantity--;
}

function increaseQuantity(item: StoreItem) {
  item.quantity++;
}

function shoppingItem() {
  return state.storeItem.filter((item) => item.quantity > 0);
}

function rederStoreItem() {
  if (storeItemList) storeItemList.textContent = "";

  for (let item of state.storeItem) {
    let listItem = document.createElement("li");
    let iconItem = document.createElement("div");
    iconItem.className = "store--item-icon";

    let imgageItem = document.createElement("img");
    imgageItem.src = imgageSrcItem(item);
    imgageItem.alt = item.name;

    iconItem.append(imgageItem);

    let buttonItem = document.createElement("button");
    buttonItem.textContent = "Add to cart";
    buttonItem.addEventListener("click", function () {
      increaseQuantity(item);
      render();
    });

    listItem.append(iconItem, buttonItem);
    if (storeItemList) storeItemList.append(listItem);
  }
}

function renderShoppingItem() {
  if (shoppingCartList) shoppingCartList.textContent = "";

  for (let item of shoppingItem()) {
    let shoppingCartItem = document.createElement("li");

    let itemImage = document.createElement("img");
    itemImage.className = "cart--item-icon";
    itemImage.src = imgageSrcItem(item);
    itemImage.alt = item.name;

    let itemName = document.createElement("p");
    itemName.textContent = item.name;

    let decreaseItemQuantity = document.createElement("button");
    decreaseItemQuantity.className = "quantity-btn remove-btn center";
    decreaseItemQuantity.textContent = "-";
    decreaseItemQuantity.addEventListener("click", function () {
      decreaseQuantity(item);
      render();
    });

    let itemQuantity = document.createElement("span");
    itemQuantity.className = "quantity-text center";
    itemQuantity.textContent = String(item.quantity);

    let increaseItemQuantity = document.createElement("button");
    increaseItemQuantity.className = "quantity-btn add-btn center";
    increaseItemQuantity.textContent = "+";
    increaseItemQuantity.addEventListener("click", function () {
      increaseQuantity(item);
      render();
    });

    shoppingCartItem.append(
      itemImage,
      itemName,
      decreaseItemQuantity,
      itemQuantity,
      increaseItemQuantity
    );
    if (shoppingCartList) shoppingCartList.append(shoppingCartItem);
  }
}

function totalPrice() {
  let total = 0;
  for (let item of shoppingItem()) {
    let itemtotal = item.price * item.quantity;
    total += itemtotal;
  }
  shoppingPrice.textContent = total.toFixed(2);
}
function render() {
  rederStoreItem();
  renderShoppingItem();
  totalPrice();
}
render();
