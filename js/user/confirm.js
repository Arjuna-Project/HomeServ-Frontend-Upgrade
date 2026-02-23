document.addEventListener("DOMContentLoaded", () => {

  const bookingId = localStorage.getItem("bookingId");
  const serviceName = localStorage.getItem("bookingServiceName");
  const finalPrice = localStorage.getItem("bookingFinalPrice");
  const bookingDate = localStorage.getItem("bookingDate");
  const bookingTime = localStorage.getItem("bookingTime");
  const bookingType = localStorage.getItem("bookingType");

  if (!bookingId) {
    alert("Booking ID missing");
    window.location.href = "services.html";
    return;
  }

  document.getElementById("bookingId").innerText = "HS" + bookingId;
  document.getElementById("serviceName").innerText = serviceName;
  document.getElementById("amount").innerText =  + finalPrice;

  if (bookingType === "immediate") {
    document.getElementById("dateTime").innerText =
      "Emergency Service (Immediate)";
  } else {
    document.getElementById("dateTime").innerText =
      bookingDate + " at " + bookingTime;
  }

});
