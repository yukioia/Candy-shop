document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".left_select_item");
  const checkboxes = container.querySelectorAll(".checkbox");
  const priceElement = document.querySelector(".left_price_item .price");

  const prices = [500, 1000, 1500];

  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("click", () => {
      checkboxes.forEach((cb) => cb.classList.remove("active"));
      checkbox.classList.add("active");
      priceElement.innerHTML = `${prices[index]} <span>Руб.</span>`;
    });
  });
});
