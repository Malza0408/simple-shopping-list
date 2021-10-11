const form = document.querySelector('#input-form');
const foodInput = document.querySelector('.food');
const priceInput = document.querySelector('.price');
const list = document.querySelector('#list');
const ul = list.querySelector('.items');
const itemsPrice = ul.querySelector('.items__price');
const totalPrice = itemsPrice.querySelector('.totalPrice');

let price = 0
calcPrice(0);

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function calcPrice(inputPrice) {
  price = price + Number(inputPrice);
  totalPrice.innerText = `${price.toLocaleString("ko-KR")}원`;
}

function loadList(e) {
  e.preventDefault();
  const foodVal = foodInput.value;
  const priceVal = priceInput.value;
  const id = uuidv4();

  calcPrice(priceVal);
  price = Number(price);

  // 엘리멘트 만들기
  const itemContainer = document.createElement('li');
  itemContainer.setAttribute('class', 'item__container');
  itemContainer.setAttribute('data-id', id);
  itemContainer.setAttribute('data-price', priceVal);
  itemContainer.innerHTML = `
  <div class="item">
    <span class="item__name">${foodVal}:</span>
    <span class="item__price"">${priceVal}원</span>
    <button class="item__delete">
      <i class="fas fa-trash-alt" data-id=${id}></i>
    </button>
  </div>
  <div class="item__divide"></div>
  `;
  ul.insertBefore(itemContainer, itemsPrice);

  // 자동으로 스크롤링하기
  itemContainer.scrollIntoView({
    block: 'center'
  })

  e.target.reset();
  foodInput.focus();
}

form.addEventListener('submit', loadList)

ul.addEventListener('click', event => {
  const id = event.target.dataset.id;
  if (id) {
    const deleteNode = document.querySelector(`.item__container[data-id="${id}"]`);
    const minusPrice = deleteNode.dataset.price;
    console.log(minusPrice)
    calcPrice(-minusPrice);
    deleteNode.remove();
  }
})