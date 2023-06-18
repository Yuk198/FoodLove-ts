// Modal
let modal = document.getElementById("myModal");
let btn = document.getElementById("cart");
let close = document.getElementsByClassName("close")[0];
let close_footer = document.getElementsByClassName("close-footer")[0];
let order = document.getElementsByClassName("order")[0];

// delete cart
let remove_cart = document.getElementsByClassName("btn-danger");
for (let i = 0; i < remove_cart.length; i++) {
  let button = remove_cart[i]
  button.addEventListener("click", function () {
    let button_remove = event.target
    button_remove.parentElement.parentElement.remove()
  })
}

// update cart 
function updatecart() {
  let cart_item = document.getElementsByClassName("cart-items")[0];
  let cart_rows = cart_item.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cart_rows.length; i++) {
    let cart_row = cart_rows[i]
    let item_id = document.getElementsByClassName("cart-id-title");
    let item_name = document.getElementsByClassName("cart-item-title");
    let price_item = cart_row.getElementsByClassName("cart-price ")[0]
    let quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
    let price = parseFloat(price_item.innerText)// transform string into number to calc total.
    let quantity = quantity_item.value // get value from input tag
    total = total + (price * quantity)
  }
  document.getElementsByClassName("cart-total-price")[0].innerText = total + 'VNĐ';
  document.getElementById("carttotalprice").value = total.toString();
}

// change quantity
let quantity_input = document.getElementsByClassName("cart-quantity-input");
for (let i = 0; i < quantity_input.length; i++) {
  let input = quantity_input[i];
  input.addEventListener("change", function (event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}

// add to cart
let add_cart = document.getElementsByClassName("btn-cart");
for (let i = 0; i < add_cart.length; i++) {
  let add = add_cart[i];
  add.addEventListener("click", function (event) {

    let button = event.target;
    let product = button.parentElement.parentElement;
    let id = product.getElementsByClassName("id-product-h5")[0].innerText
    let title = product.getElementsByClassName("name-product-h5")[0].innerText
    let price = product.getElementsByClassName("price")[0].innerText
    addItemToCart(id, title, price)
    modal.style.display = "block";
    
    updatecart()
  })
}

function addItemToCart(id, title, price) {
  let cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  let cartItems = document.getElementsByClassName('cart-items')[0]
  let cart_title = cartItems.getElementsByClassName('cart-item-title')
  for (let i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText == title) {
      alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
      return
    }
  }

  let cartRowContents = `
  <div class="cart-id cart-column">
      <span class="cart-id-title" name="cartid">${id}</span>
      <input type="hidden" name="cartid" value=${id}>
  </div>
  <div class="cart-item cart-column">
      <span class="cart-item-title" name="carttitle">${title}</span>
  </div>
  <span class="cart-price cart-column" name="carttitle">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" name="cartquantity" type="number" value="1">
      <button class="btn btn-danger" type="button">Xóa</button>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
    let button_remove = event.target
    button_remove.parentElement.parentElement.remove()
    updatecart()
  })
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}

/* Modal click*/
btn.onclick = function () {
  modal.style.display = "block";
}
close.onclick = function () {
  modal.style.display = "none";
}
close_footer.onclick = function () {
  modal.style.display = "none";
}
order.onclick = function () {
  if (document.getElementsByClassName("cart-total-price")[0].innerHTML == '0VNĐ'){
    alert("Giỏ hàng trống!");
  }
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}