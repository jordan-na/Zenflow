const setupBookButton = () => {
   const bookBtnMain = document.querySelector("#book-btn-main");
   bookBtnMain.addEventListener("click", () => {
      window.location.href = "./booking.html";
   });
};

const init = () => {
   setupBookButton();
};

window.onload = init;
