document.querySelectorAll(".copy-text").forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault();

    // Создаем временный текстовый элемент
    const tempInput = document.createElement("input");
    tempInput.value = element.getAttribute("data-copy");
    document.body.appendChild(tempInput);

    // Выбираем и копируем текст
    tempInput.select();
    document.execCommand("copy");

    // Удаляем временный элемент
    document.body.removeChild(tempInput);

    alert("Текст скопирован!");
  });
});
