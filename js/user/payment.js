document.addEventListener("DOMContentLoaded", async () => {
  const serviceId = localStorage.getItem("selectedService");
  const bookingType = localStorage.getItem("bookingType");
  const bookingDate = localStorage.getItem("bookingDate");
  const bookingTime = localStorage.getItem("bookingTime");

  const paymentMethods = document.querySelectorAll(
    'input[name="paymentMethod"]',
  );
  const upiSection = document.getElementById("upiSection");
  const cardSection = document.getElementById("cardSection");
  const confirmBtn = document.getElementById("confirmPaymentBtn");

  if (!serviceId) {
    alert("Service not found");
    window.location.href = "services.html";
    return;
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "../index.html";
    });
  }
  console.log({
    service_id: parseInt(serviceId),
    booking_date:
      bookingType === "immediate"
        ? new Date().toISOString().split("T")[0]
        : bookingDate,
    booking_time:
      bookingType === "immediate"
        ? new Date().toTimeString().slice(0, 5)
        : bookingTime,
  });

  // Toggle payment sections
  paymentMethods.forEach((method) => {
    method.addEventListener("change", () => {
      upiSection.style.display = "none";
      cardSection.style.display = "none";

      if (method.value === "upi") {
        upiSection.style.display = "block";
      }

      if (method.value === "card") {
        cardSection.style.display = "block";
      }
    });
  });

  // Load Service
  let service;

  try {
    service = await apiRequest(`/services/${serviceId}`, "GET");
  } catch (error) {
    alert("Failed to load service details");
    return;
  }

  let finalPrice = service.price;

  if (bookingType === "immediate") {
    finalPrice = Math.round(service.price * 1.3);
    document.getElementById("bookingTypeText").innerText =
      "Emergency Booking (30% premium applied)";
  } else {
    document.getElementById("bookingTypeText").innerText = "Scheduled Booking";
  }

  document.getElementById("serviceName").innerText = service.name;
  document.getElementById("priceText").innerText =
    "Total Price: ₹" + finalPrice;

  // Confirm Booking
  confirmBtn.addEventListener("click", async () => {
    const selectedMethod = document.querySelector(
      'input[name="paymentMethod"]:checked',
    );

    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    // UPI Validation
    if (selectedMethod.value === "upi") {
      const upiId = document.getElementById("upiId").value.trim();
      if (!upiId || !upiId.includes("@")) {
        alert("Please enter a valid UPI ID");
        return;
      }
    }

    // Card Validation
    if (selectedMethod.value === "card") {
      const cardNumber = document.getElementById("cardNumber").value.trim();
      const cvv = document.getElementById("cvv").value.trim();

      if (cardNumber.length < 16) {
        alert("Invalid card number");
        return;
      }

      if (cvv.length !== 3) {
        alert("Invalid CVV");
        return;
      }
    }

    try {
      const response = await apiRequest("/bookings", "POST", {
        service_id: parseInt(serviceId),
        booking_type: bookingType,
        date:
          bookingType === "immediate"
            ? new Date().toISOString().split("T")[0]
            : bookingDate,
        time:
          bookingType === "immediate"
            ? new Date().toTimeString().slice(0, 5)
            : bookingTime,
      });

      if (response.id) {
        // ✅ SAVE BOOKING ID
        localStorage.setItem("bookingId", response.id);

        // also save useful data for confirm page
        localStorage.setItem("bookingServiceName", service.name);
        localStorage.setItem("bookingFinalPrice", finalPrice);

        window.location.href = "confirm.html";
      }
    } catch (error) {
      alert("Booking failed. Please try again.");
    }
  });
});
