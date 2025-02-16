const init = () => {
   const upcomingMassage = document.querySelector("#upcoming-massage");
   const storedUpcomingMassage = localStorage.getItem("upcomingMassage");
   if (storedUpcomingMassage) {
      upcomingMassage.innerHTML = storedUpcomingMassage;
   } else {
      upcomingMassage.innerHTML = "None";
   }
}

window.onload = init;