document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".booking-card");
  const continueBtn = document.getElementById("continueBtn");

  let selectedType = null;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      selectedType = card.dataset.type;
      localStorage.setItem("bookingType", selectedType);
    });
  });

  continueBtn.addEventListener("click", () => {

    if (!selectedType) {
      alert("Please select a booking type");
      return;
    }

    if (selectedType === "schedule") {
      window.location.href = "date-time.html";
    } else {
      window.location.href = "payment.html";
    }

  });

});
