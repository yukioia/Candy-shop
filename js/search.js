//
products = [
  {
    name: "Жвачка",
    image: "https://icursedg0d.github.io/damn/assets/catalog/bubbelgum.png",
    link: "https://icursedg0d.github.io/damn/html/catalog/first_candy.html",
  },
  {
    name: "Мармелад",
    image: "https://icursedg0d.github.io/damn/assets/catalog/marmelad.png",
    link: "https://icursedg0d.github.io/damn/html/catalog/second_candy.html",
  },
  {
    name: "Моти",
    image: "https://icursedg0d.github.io/damn/assets/catalog/pirog.png",
    link: "https://icursedg0d.github.io/damn/html/catalog/third_candy.html",
  },
  {
    name: "Зефир",
    image: "https://icursedg0d.github.io/damn/assets/catalog/zephir.png",
    link: "https://icursedg0d.github.io/damn/html/catalog/fourth_candy.html",
  },
  {
    name: "Маршмеллоу",
    image: "https://icursedg0d.github.io/damn/assets/catalog/heart_zephire.png",
    link: "https://icursedg0d.github.io/damn/html/catalog/five_candy.html",
  },
  {
    name: "Печенье",
    image: "https://icursedg0d.github.io/damn/assets/catalog/pechenie.png",
    link: "https://icursedg0d.github.io/damn/html/catalog/six_candy.html",
  },
  {
    name: "Леденцы",
    image: "https://icursedg0d.github.io/damn/assets/catalog/sosat.png",
    link: "https://icursedg0d.github.io/damn/html/catalog/seven_candy.html",
  },
  {
    name: "Шоколад",
    image: "https://icursedg0d.github.io/damn/assets/catalog/chocolate.png",
    link: "https://icursedg0d.github.io/damn/html/catalog/eigth_candy.html",
  },
];
//   products = [
//     {
//       name: "Жвачка",
//       image: "../../assets/catalog/bubbelgum.png",
//       link: "../../html/catalog/first_candy.html",
//     },
//     {
//       name: "Мармелад",
//       image: "../../assets/catalog/marmelad.png",
//       link: "../../html/catalog/second_candy.html",
//     },
//     {
//       name: "Моти",
//       image: "../../assets/catalog/pirog.png",
//       link: "../../html/catalog/third_candy.html",
//     },
//     {
//       name: "Зефир",
//       image: "../../assets/catalog/zephir.png",
//       link: "../../html/catalog/fourth_candy.html",
//     },
//     {
//       name: "Маршмеллоу",
//       image: "../../assets/catalog/heart_zephire.png",
//       link: "../../html/catalog/five_candy.html",
//     },
//     {
//       name: "Печенье",
//       image: "../../assets/catalog/pechenie.png",
//       link: "../../html/catalog/six_candy.html",
//     },
//     {
//       name: "Леденцы",
//       image: "../../assets/catalog/sosat.png",
//       link: "../../html/catalog/seven_candy.html",
//     },
//     {
//       name: "Шоколад",
//       image: "../../assets/catalog/chocolate.png",
//       link: "../../html/catalog/eigth_candy.html",
//     },
//   ];

// Получаем элемент поиска
const searchInput = document.getElementById("searchInput");

// Функция для создания карточки товара
function createProductCard(product) {
  const newCard = document.createElement("a");
  newCard.style.textDecoration = "none"; // Убирает подчеркивание
  newCard.style.color = "inherit"; // Убирает цвет по умолчанию (будет наследоваться)
  newCard.style.cursor = "pointer"; // Убирает стандартный курсор pointer
  newCard.href = product.link;
  newCard.classList.add("card_search");

  newCard.innerHTML = `
    <div class="text_card_search">${product.name}</div>
    <div class="image_card_search">
      <img src="${product.image}" alt="${product.name} " />
    </div>
  `;
  return newCard;
}

// Функция для создания блока результатов поиска
function createSearchResultsContainer() {
  const searchResults = document.createElement("div");
  searchResults.id = "searchResults";
  searchResults.classList.add("search-results");
  document.querySelector(".search").appendChild(searchResults); // Добавляем блок результатов под контейнер поиска
  return searchResults;
}

// Получаем или создаем блок для отображения результатов
let searchResults = document.getElementById("searchResults");
if (!searchResults) {
  searchResults = createSearchResultsContainer();
}

// Функция для поиска и отображения результатов
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase(); // получаем текст поиска

  // Очищаем результаты предыдущего поиска
  searchResults.innerHTML = "";

  if (searchTerm.trim() === "") {
    searchResults.style.display = "none"; // скрываем блок, если поле пустое
    return;
  }

  let found = false;

  // Перебираем все продукты и ищем совпадения
  products.forEach((product) => {
    if (product.name.toLowerCase().includes(searchTerm)) {
      found = true;

      // Создаем карточку продукта и добавляем в результаты
      const productCard = createProductCard(product);
      searchResults.appendChild(productCard);
    }
  });

  // Если совпадений нет, скрываем блок результатов
  if (!found) {
    searchResults.style.display = "none";
  } else {
    searchResults.style.display = "block"; // Показываем блок с результатами
  }
});
