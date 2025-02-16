const massageType = document.querySelector(".massage-type-form-group p span");
const massageMapping = {
   "Swedish Massage": "swedish",
   "Deep Tissue Massage": "deepTissue",
   "Sports Massage": "sports",
   "Hot Stone Massage": "hotStone",
};
const massageTypeImg = document.querySelector("#massage-type-img");
const massageImgMapping = {
   "Swedish Massage": "./assets/swedish_massage.jpg",
   "Deep Tissue Massage": "./assets/deep_tissue_massage.jpg",
   "Sports Massage": "./assets/sports_massage.jpg",
   "Hot Stone Massage": "./assets/hot_stone_massage.jpg",
};
const massageCostMapping = {
   "Swedish Massage": 90,
   "Deep Tissue Massage": 100,
   "Sports Massage": 110,
   "Hot Stone Massage": 110,
};

const selectMassageType = (massageType) => {
   document.querySelectorAll(".btn-check").forEach((radio) => {
      radio.checked = false;
   });

   const selectedRadio = document.getElementById(massageMapping[massageType]);
   if (selectedRadio) {
      selectedRadio.checked = true;
   }
   localStorage.setItem("massageCost", massageCostMapping[massageType]);
   document.querySelector(".book-form-group p span").textContent = `$${massageCostMapping[massageType]}`;
};

const selectMassageImg = (massageType) => {
   massageTypeImg.src = massageImgMapping[massageType];
};

const setupMassageTypeButtons = () => {
   const massageButtons = document.querySelectorAll(".btn-group.massage-options .btn");
   massageButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
         console.log("click");
         const selectedMassageType = btn.textContent + " Massage";
         massageType.textContent = selectedMassageType;
         localStorage.setItem("massageType", selectedMassageType);
         selectMassageType(selectedMassageType);
         selectMassageImg(selectedMassageType);
      });
   });
};

const setupDatePicker = () => {
   const dateLabel = document.querySelector(".date-form-group p span");
   let tomorrow = new Date();
   tomorrow.setDate(tomorrow.getDate() + 1);
   tomorrow.setHours(17, 0, 0, 0);
   const formattedDateInterval = formatDateTimeInterval(tomorrow);
   dateLabel.textContent = formattedDateInterval;
   localStorage.setItem("date-interval", formattedDateInterval);
   flatpickr("#datetime-picker", {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      minDate: "today",
      time_24hr: false,
      defaultDate: tomorrow,
      onChange: function (selectedDates, dateStr) {
         if (selectedDates.length > 0) {
            const formattedDateInterval = formatDateTimeInterval(selectedDates[0]);
            dateLabel.textContent = formattedDateInterval;
            localStorage.setItem("date-interval", formattedDateInterval);
         }
      },
   });
};

const formatDateTimeInterval = (date) => {
   const options = { month: "short", day: "numeric", year: "numeric" };
   let formattedDate = date.toLocaleDateString("en-US", options);

   let startHour = date.getHours();
   let startMinutes = date.getMinutes();

   let displayStartHour = startHour % 12 || 12;
   startMinutes = startMinutes.toString().padStart(2, "0");

   let endHour = startHour + 1;
   let ampmEnd = endHour >= 12 ? "pm" : "am";
   let displayEndHour = endHour % 12 || 12;

   let suffix = getOrdinalSuffix(date.getDate());

   return `${formattedDate.replace(
      /\d+/,
      date.getDate() + suffix
   )}, ${displayStartHour}:${startMinutes}-${displayEndHour}:${startMinutes} ${ampmEnd}`;
};

const getOrdinalSuffix = (day) => {
   if (day > 3 && day < 21) return "th";
   switch (day % 10) {
      case 1:
         return "st";
      case 2:
         return "nd";
      case 3:
         return "rd";
      default:
         return "th";
   }
};

const setupFormSubmit = () => {
   const form = document.querySelector(".book-form");
   form.addEventListener("submit", (event) => {
      event.preventDefault();
      localStorage.setItem("clear", true);
      window.location.href = "./confirmation.html";
   });
}

const init = () => {
   window.onscroll = () => {
      localStorage.setItem("clear", true);
   };
   let clear = localStorage.getItem("clear");
   if (clear === "true" || !clear) {
      localStorage.removeItem("clear");
      localStorage.removeItem("date-interval");
      localStorage.removeItem("massageType");
      localStorage.removeItem("massageCost");
   }
   let selectedMassageType = localStorage.getItem("massageType");
   if (!selectedMassageType) {
      localStorage.setItem("massageType", "Swedish Massage");
      selectedMassageType = "Swedish Massage";
      localStorage.setItem("massageCost", massageCostMapping[selectedMassageType]);
   }
   massageType.textContent = selectedMassageType;
   selectMassageType(selectedMassageType);
   selectMassageImg(selectedMassageType);
   setupMassageTypeButtons();
   setupDatePicker();
   setupFormSubmit();
};

window.onload = init;
