document.addEventListener("DOMContentLoaded", function () {
  const categoryToggle = document.getElementById("categoryDropdown");
  const dropdownMenu = document.getElementById("categoryMenu");

  if (categoryToggle && dropdownMenu) {
    categoryToggle.addEventListener("click", function (event) {
      event.preventDefault();
      dropdownMenu.classList.toggle("show-dropdown");
    });

    document.addEventListener("click", function (event) {
      if (!categoryToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove("show-dropdown");
      }
    });
  }
});

