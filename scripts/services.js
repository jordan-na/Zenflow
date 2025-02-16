const setupBookNowButtons = () => {
   const bookBtns = document.querySelectorAll(".book-btn");
   const massageTypes = ["Swedish Massage", "Deep Tissue Massage", "Sports Massage", "Hot Stone Massage"];
   bookBtns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
         window.location.href = "./booking.html";
         localStorage.setItem("massageType", massageTypes[i]);
         localStorage.setItem("clear", false);
      });
   });
}

const init = () => {
   setupBookNowButtons();
}

window.onload = init;
