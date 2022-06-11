'use strict';

const cart = {};
class Item {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.count = 1;
    this.calcSum();
  }

  calcSum() {
    this.sum = this.price * this.count;
  }
}

const cartContentEl = document.querySelector(".cartContent");
const cartCounterEl = document.querySelector(".cartCounter");
const cartSumEl = document.querySelector("tfoot th:last-child");
const tbodyEl = document.querySelector("tbody");

const cartBtnEl = document.querySelector(".cartIconWrap");
cartBtnEl.addEventListener("click", () => {
  cartContentEl.classList.toggle("cartContentHidden");
});

document.querySelector(".featuredItems").addEventListener("click", event => {
  if (!event.target.closest(".addToCartBtn")) {
    return;
  };
  const featItemEl = event.target.closest(".featuredItem");
  const id = +featItemEl.dataset.id;
  const name = featItemEl.dataset.name;
  const price = +featItemEl.dataset.price;
  addToCart(id, name, price);
});

/**
 * Функция добавляет товар в корзину
 * @param {number} id - id товара
 * @param {string} name - название товара
 * @param {number} price - цена товара
 */
function addToCart(id, name, price) {
  if (!cart.hasOwnProperty(id)) {
    cart[id] = new Item(id, name, price);
    drawItem(cart[id]);
  } else {
    cart[id].count++;
    cart[id].calcSum();
    document.querySelector(
      `tr[data-id="${id}"] td[data-type="count"]`).innerText = cart[id].count;
    document.querySelector(
      `tr[data-id="${id}"] td[data-type="sum"]`).innerText = cart[id].sum;
  }

  cartSumEl.innerText = getCartSum();
  cartCounterEl.innerText = getItemCount();
}

/**
 * Функция отрисовывет строку товара в козине
 * @param {object} item - товар
 */
function drawItem(item) {
  tbodyEl.insertAdjacentHTML("beforeend", 
    `<tr data-id="${item.id}">
      <td>${item.name}</td>
      <td data-type="count">${item.count}</td>
      <td>${item.price}</td>
      <td data-type="sum">${item.sum}</td>
    </tr>`
  );
}

/**
 * Функция подсчитывает сумму всех товаров в корзине
 * @return {number} - сумма всех товаров в корзине
 */
function getCartSum() {
  let sum = 0;
  for (const item in cart) {
    sum += cart[item].sum;
  }
  return sum;
}

/**
 * Функция подсчитывает количество всех товаров в корзине
 * @return {number} - количество всех товаров в корзине
 */
function getItemCount() {
  let count = 0;
  for (const item in cart) {
    count += cart[item].count;
  }
  return count;
}