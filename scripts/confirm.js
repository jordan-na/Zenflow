const init = () => {
   const massageTypeConfirm = document.getElementById("massage-type-confirm");
   const dateConfirm = document.getElementById("date-confirm");
   const addressConfirm = document.getElementById("address-confirm");
   const priceConfirm = document.getElementById("price-confirm");
   massageTypeConfirm.textContent = localStorage.getItem("massageType");
   dateConfirm.textContent = localStorage.getItem("date-interval");
   addressConfirm.textContent = localStorage.getItem("selectedAddress");
   priceConfirm.textContent = "$" + localStorage.getItem("massageCost");

   const confirmButton = document.getElementById("confirm-btn");
   const cancelButton = document.getElementById("cancel-btn");
   confirmButton.addEventListener("click", () => {
      window.location.href = "./profile.html";
      localStorage.setItem("upcomingMassage", localStorage.getItem("massageType"));
   });
   cancelButton.addEventListener("click", () => {
      window.location.href = "./booking.html";
   });
}

window.onload = init;