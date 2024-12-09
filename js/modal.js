document.addEventListener("DOMContentLoaded", () => {
  const cartModal = document.getElementById("cart-modal");
  const cartIcons = document.querySelectorAll(".cart_icon");
  const closeModal = document.getElementById("close-modal");
  const cartItemsContainer = document.querySelector(".cart_items");

  // Открыть модальное окно
  cartIcons.forEach((cartIcon) => {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      const cartModal = document.getElementById("cart-modal"); // Ваше общее модальное окно
      updateCartDisplay(); // Обновить содержимое корзины
      cartModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // Закрыть модальное окно
  closeModal.addEventListener("click", () => {
    cartModal.style.display = "none";
    document.body.style.overflow = "";
  });

  // Закрыть модальное окно при клике вне его
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // Обновить отображение корзины
  // Обновить отображение корзины
  function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    cartItemsContainer.innerHTML = ""; // Очистить содержимое перед обновлением
    const cartItemsArray = Object.entries(cart);
    let total = 0; // Переменная для итоговой суммы

    if (cartItemsArray.length === 0) {
      cartItemsContainer.innerHTML =
        "<p class='erase_cart'>Ваша корзина пуста</p>";
      document.getElementById("cart-total").innerText = "0 ₽";
      return;
    }

    cartItemsArray.forEach(([key, item]) => {
      total += item.price * item.quantity; // Считаем итоговую стоимость

      const cartItem = document.createElement("div");
      cartItem.className = "cart_item";
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart_item_image">
        <div class="cart_item_details">
          <h3 class='item_details_name'>${item.name}</h3>
          <p class='item_details_weigth'>${item.weight}</p>
          <div class="cart_item_quantity">
            <button class="quantity_decrease" data-key="${key}">-</button>
            <span class="quantity_count">${item.quantity}</span>
            <button class="quantity_increase" data-key="${key}">+</button>
          </div>
        </div>
        <div class="cart_item_price">
          <p class='item_price_p'>${(item.price * item.quantity).toFixed(
            2
          )} ₽</p>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    // Обновляем итоговую сумму
    document.getElementById("cart-total").innerText = `${total.toFixed(2)} ₽`;

    attachQuantityHandlers(); // Подключаем обработчики изменения количества
  }

  // Обработчики для кнопок изменения количества
  // Обработчики для кнопок изменения количества
  function attachQuantityHandlers() {
    document.querySelectorAll(".quantity_decrease").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        if (cart[key]) {
          // Уменьшаем количество или удаляем товар, если оно станет 0
          cart[key].quantity -= 1;
          if (cart[key].quantity <= 0) {
            delete cart[key];
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartDisplay(); // Обновляем корзину
          updateCartCount(); // Обновляем счетчик товаров
        }
      });
    });

    document.querySelectorAll(".quantity_increase").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        if (cart[key]) {
          cart[key].quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartDisplay(); // Обновляем корзину
        }
      });
    });
  }

  // Изменение количества товара
  function updateItemQuantity(key, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (cart[key]) {
      cart[key].quantity += change;

      // Удаляем товар, если количество меньше 1
      if (cart[key].quantity < 1) {
        delete cart[key];
      }

      // Обновляем localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay(); // Обновляем отображение корзины
      updateCartCount(); // Обновляем счетчик товаров
    }
  }
  // Получаем кнопку оформления заказа
  const checkoutButton = document.querySelector(".checkout_button");

  // Проверяем, существует ли кнопка, и добавляем обработчик
  if (checkoutButton) {
    checkoutButton.addEventListener("click", handleCheckout);
  }
});

// Функция для обработки оформления заказа
function handleCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (Object.keys(cart).length === 0) {
    alert("Ваша корзина пуста! Добавьте товары перед оформлением заказа.");
    return;
  }

  // Очищаем корзину в localStorage
  localStorage.removeItem("cart");

  // Выводим сообщение о завершении заказа (необязательно)
  alert("Ваш заказ успешно оформлен!");

  // Обновляем страницу
  location.reload();
}
