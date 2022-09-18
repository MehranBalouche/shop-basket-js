// start
let $ = document;
function _log(value) {
  console.log(value);
}
function _table(value) {
  console.table(value);
}
let allProducts = [
  { id: 1, title: 'Album 1', price: 5, img: 'Images/Album 1.png', count: 1 },
  { id: 2, title: 'Album 2', price: 15, img: 'Images/Album 2.png', count: 1 },
  { id: 3, title: 'Album 3', price: 20, img: 'Images/Album 3.png', count: 1 },
  { id: 4, title: 'Album 4', price: 100, img: 'Images/Album 4.png', count: 1 },
  { id: 5, title: 'Coffee', price: 5, img: 'Images/Cofee.png', count: 1 },
  { id: 6, title: 'Shirt', price: 50, img: 'Images/Shirt.png', count: 1 },
];

let userBasket = [];

const shopItemsContainer = $.querySelector('.shop-items');
const bastekProductsContainer = $.querySelector('.cart-items');
const removeAllProductsBtn = $.querySelector('#remove-all-products');
const cartTotalPriceElem = $.querySelector('.cart-total-price');

let listProductsFragment = $.createDocumentFragment();
let baskekProductsFragment = $.createDocumentFragment();

allProducts.forEach(function (product) {
  shopItems.insertAdjacentHTML(
    'beforeend',
    '<div class="shop-item"><span class="shop-item-title">' +
      product.title +
      '</span><img class="shop-item-image" src="' +
      product.img +
      ' "><div class="shop-item-details"><span class="shop-item-price">' +
      product.price +
      '</span><button class="btn btn-primary shop-item-button" onclick="addProductToBasketArray('+ product.id +')">ADD TO CART</button></div></div>'
  );

  listProductsFragment.appendChild(shopItems);

  shopItemsContainer.appendChild(listProductsFragment)
});


function addProductToBasketArray(productId) {
  let mainProduct = allProducts.find(function (product) {
    return product.id === productId;
  });
  let checkBasket = userBasket.some(function (item) {
    return item == mainProduct;
  });

  if (checkBasket) {
    mainProduct.count += 1;
    calcTotalPrice(userBasket);
    basketProductsGenerator(userBasket);
  } else {
    userBasket.push(mainProduct);
    basketProductsGenerator(userBasket);
    calcTotalPrice(userBasket);
  }
}

function basketProductsGenerator(userBasketArray) {
  bastekProductsContainer.innerHTML = '';

  userBasketArray.forEach(function (product) {
    
    bastekProducts.insertAdjacentHTML('beforeend', '<div class="cart-row"><div class="cart-item cart-column"><img src="'+ product.img +'" width="100" height="100" class="cart-item-image"><span class="cart-item-title">' + product.title + '</span></div><span class="cart-price cart-column">$' + product.price + '</span><div class="cart-quantity cart-column"><input class="cart-quantity-input" type="number" onchange="updateProductCount('+ product.id, basketProductInput.value +')"><button class="btn btn-danger" onclick="removeProductFromBasket('+ product.id +')">Remove</button></div></div>')
  });

  baskekProductsFragment.appendChild(bastekProducts);

  bastekProductsContainer.append(baskekProductsFragment);
}

function removeProductFromBasket(productId) {
  userBasket = userBasket.filter(function (product) {
    return product.id !== productId;
  });

  basketProductsGenerator(userBasket);
}

removeAllProductsBtn.addEventListener('click', function () {
  userBasket = [];
  basketProductsGenerator(userBasket);
});

function calcTotalPrice(userBasketArray) {
  let totalPriceValue = 0;

  userBasketArray.forEach(function (product) {
    totalPriceValue += product.count * product.price;
  });

  cartTotalPriceElem.innerHTML = totalPriceValue;
}

function updateProductCount(productId, newCount) {
  console.log('product id: ' + productId + ' new count: ' + newCount);

  userBasket.forEach(function (product) {
    if (product.id === productId) {
      product.count = newCount;
    }
  });
  calcTotalPrice(userBasket);
}
