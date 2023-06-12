// Modal
const modal = document.getElementById('myModal')
const btn = document.getElementById('cart')
const close = document.getElementsByClassName('close')[0]
const close_footer = document.getElementsByClassName('close-footer')[0]
const order = document.getElementsByClassName('order')[0]

// deconste cart
const remove_cart = document.getElementsByClassName('btn-danger')
for (const i = 0; i < remove_cart.length; i++) {
  const button = remove_cart[i]
  button.addEventListener('click', function () {
    const button_remove = event.target
    button_remove.parentElement.parentElement.remove()
  })
}

// update cart
function updatecart() {
  const cart_item = document.getElementsByClassName('cart-items')[0]
  const cart_rows = cart_item.getElementsByClassName('cart-row')
  const total = 0
  for (const i = 0; i < cart_rows.length; i++) {
    const cart_row = cart_rows[i]
    const price_item = cart_row.getElementsByClassName('cart-price ')[0]
    const quantity_item = cart_row.getElementsByClassName('cart-quantity-input')[0]
    const price = parseFloat(price_item.innerText) // transform string into number to calc total.
    const quantity = quantity_item.value // get value from input tag
    total = total + price * quantity
  }
  document.getElementsByClassName('cart-total-price')[0].innerText = total + 'VNĐ'
}

// change quantity
const quantity_input = document.getElementsByClassName('cart-quantity-input')
for (const i = 0; i < quantity_input.length; i++) {
  const input = quantity_input[i]
  input.addEventListener('change', function (event) {
    const input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
    }
    updatecart()
  })
}

// add to cart
const add_cart = document.getElementsByClassName('btn-cart')
for (const i = 0; i < add_cart.length; i++) {
  const add = add_cart[i]
  add.addEventListener('click', function (event) {
    const button = event.target
    const product = button.parentElement.parentElement
    const title = product.getElementsByClassName('name-product-h5')[0].innerText
    const price = product.getElementsByClassName('price')[0].innerText
    addItemToCart(title, price)
    modal.style.display = 'block'

    updatecart()
  })
}

function addItemToCart(title, price) {
  const cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  const cartItems = document.getElementsByClassName('cart-items')[0]
  const cart_title = cartItems.getElementsByClassName('cart-item-title')
  for (const i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText == title) {
      alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
      return
    }
  }

  const cartRowContents = `
  <div class="cart-item cart-column">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Xóa</button>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
    const button_remove = event.target
    button_remove.parentElement.parentElement.remove()
    updatecart()
  })
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
    const input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
    }
    updatecart()
  })
}

/* Modal click*/
btn.onclick = function () {
  modal.style.display = 'block'
}
close.onclick = function () {
  modal.style.display = 'none'
}
close_footer.onclick = function () {
  modal.style.display = 'none'
}
order.onclick = function () {
  if (document.getElementsByClassName('cart-total-price')[0].innerHTML == '0VNĐ') {
    alert('Giỏ hàng trống!')
  } else {
    alert('Thanh toán thành công!')
  }
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}
