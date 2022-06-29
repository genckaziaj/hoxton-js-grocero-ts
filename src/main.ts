import "./reset.css";
import "./style.css";

type StoreItem = {
  id: number;
  name: string;
  price: number;
  stock: number;
  inCart: number;
};

type State = {
  storeItems: StoreItem[];
};

let state: State = {
  storeItems: [
    {
      id: 1,
      name: "beetroot",
      price: 0.45,
      stock: 10,
      inCart: 0,
    },
    {
      id: 2,
      name: "carrot",
      price: 0.15,
      stock: 2,
      inCart: 0,
    },
    {
      id: 3,
      name: "apple",
      price: 0.25,
      stock: 3,
      inCart: 0,
    },
    {
      id: 4,
      name: "apricot",
      price: 0.55,
      stock: 4,
      inCart: 0,
    },
    {
      id: 5,
      name: "avocado",
      price: 0.85,
      stock: 1,
      inCart: 0,
    },
    {
      id: 6,
      name: "bananas",
      price: 0.25,
      stock: 8,
      inCart: 0,
    },
    {
      id: 7,
      name: "bell-pepper",
      price: 0.35,
      stock: 4,
      inCart: 0,
    },
    {
      id: 8,
      name: "berry",
      price: 0.25,
      stock: 3,
      inCart: 0,
    },
    {
      id: 9,
      name: "blueberry",
      price: 0.5,
      stock: 9,
      inCart: 0,
    },
    {
      id: 10,
      name: "eggplant",
      price: 0.45,
      stock: 1,
      inCart: 0,
    },
  ],
};

// input: item
// action: generates a path for this item's image
// output: the path
function getItemImagePath(item: StoreItem) {
  let id = String(item.id).padStart(3, "0");
  return `assets/icons/${id}-${item.name}.svg`;
}

// input: nothing
// action: get the items that are in the cart
// output: the cart items
function getCartItems() {
  return state.storeItems.filter((item) => item.inCart > 0);
}

// output: the current total
function getTotal() {
  return state.storeItems.map((item) => item.price * item.inCart);
}

function increaseQuantity(item: StoreItem) {
  if (item.stock === 0) return;

  item.inCart++;
  item.stock--;
}

function decreaseQuantity(item: StoreItem) {
  if (item.inCart > 0) {
    item.inCart--;
    item.stock++;
  }
}

function renderStoreItems() {
  let storeUl = document.querySelector(".store--item-list");
  storeUl!.textContent = "";

  for (let item of state.storeItems) {
    let storeItemEl = document.createElement("li");

    let iconDiv = document.createElement("div");
    iconDiv.className = ".store--item-icon";

    let iconImg = document.createElement("img");
    iconImg.src = getItemImagePath(item);

    let addBtn = document.createElement("button");
    addBtn.textContent = `Add to cart (${item.stock})`;
    addBtn.addEventListener("click", function () {
      increaseQuantity(item);
      render();
    });

    iconDiv.append(iconImg);
    storeItemEl.append(iconDiv, addBtn);
    storeUl!.append(storeItemEl);
  }
}

function renderCartItems() {
  let cartUl = document.querySelector(".cart--item-list");
  cartUl!.textContent = "";

  let cartItems = getCartItems();

  for (let item of cartItems) {
    let cartLi = document.createElement("li");

    let itemImg = document.createElement("img");
    itemImg.className = "cart--item-icon";
    itemImg.src = getItemImagePath(item);
    itemImg.alt = item.name;

    let itemNameP = document.createElement("p");
    itemNameP.textContent = item.name;

    let removeBtn = document.createElement("button");
    removeBtn.className = "quantity-btn remove-btn center";
    removeBtn.textContent = "-";
    removeBtn.addEventListener("click", function () {
      decreaseQuantity(item);
      render();
    });

    let quantitySpan = document.createElement("span");
    quantitySpan.className = "quantity-text center";
    quantitySpan.textContent = String(item.inCart);

    let addBtn = document.createElement("button");
    addBtn.className = "quantity-btn add-btn center";
    addBtn.textContent = "+";
    addBtn.addEventListener("click", function () {
      increaseQuantity(item);
      render();
    });

    cartLi.append(itemImg, itemNameP, removeBtn, quantitySpan, addBtn);
    cartUl!.append(cartLi);
  }
}

function renderTotal() {
  let totalPriceSpan = document.querySelector(".total-number");
  totalPriceSpan!.textContent = "";

  let prices = getTotal();
  let sum = 0;

  for (let price of prices) {
    sum += price;
  }

  totalPriceSpan!.textContent = `£${sum.toFixed(2)}`;
}

function render() {
  renderStoreItems();
  renderCartItems();
  renderTotal();
}

render();
