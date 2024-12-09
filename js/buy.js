document.addEventListener("DOMContentLoaded", () => {
  // Обновляем количество товаров в корзине при загрузке страницы
  updateCartCount();

  // Обработчик для кнопки добавления в корзину
  document.querySelector(".buy")?.addEventListener("click", () => {
    // Получаем данные товара
    const productName = document.querySelector(".left_logo_item h3").innerText;
    const weight = document.querySelector(".checkbox.active").innerText;
    const price = document.querySelector(".price").innerText.split(" ")[0];

    // Получаем первое изображение из галереи
    const firstImage = document.querySelector(".image-gallery .thumbnails img");
    const image = firstImage ? firstImage.src : ""; // Берем ссылку на первое изображение

    // Получаем уникальный код товара
    const productCode = document
      .querySelector(".left_text_articul p")
      .innerText.replace("Код товара: ", "")
      .trim();

    const productKey = `${productCode}_${productName}_${weight}`; // Уникальный ключ для товара

    // Получаем текущие данные из localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    // Если товар уже есть в корзине, увеличиваем его количество
    if (cart[productKey]) {
      cart[productKey].quantity += 1;
    } else {
      // Если товара нет, добавляем новый объект
      cart[productKey] = {
        name: productName,
        weight: weight,
        price: parseFloat(price),
        image: image,
        quantity: 1,
      };
    }

    // Сохраняем обновленные данные в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Обновляем количество товаров в корзине
    updateCartCount();

    // Отображение уведомления
    showNotification(`${productName} (${weight}) добавлен в корзину!`);
  });
});

// Функция для обновления количества товаров в корзине
function updateCartCount() {
  // Получаем данные из localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  // Считаем общее количество товаров
  let totalCount = 0;
  for (let key in cart) {
    totalCount += cart[key].quantity;
  }

  // Обновляем отображение количества товаров в корзине
  document.querySelectorAll(".cart_count").forEach((cartCountElement) => {
    cartCountElement.innerText = totalCount;
  });
}

// Функция для показа уведомления
function showNotification(message) {
  // Создаем элемент уведомления
  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.innerText = message;

  // Добавляем уведомление на страницу
  document.body.appendChild(notification);

  // Удаляем уведомление через 3 секунды
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Стили для уведомления
const style = document.createElement("style");
style.innerText = `
  .cart-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    z-index: 1000;
    opacity: 0;
    animation: fadeInOut 3s forwards;
  }

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(10px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(10px); }
  }
`;
document.head.appendChild(style);
