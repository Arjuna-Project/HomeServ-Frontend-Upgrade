document.addEventListener("DOMContentLoaded", async () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || role !== "user") {
    window.location.href = "../auth/login-user.html";
  }

  const container = document.getElementById("servicesContainer");

  // LOGOUT
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../index.html";
  });

  try {
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get("category");

    const services = await apiRequest("/services", "GET");

    let filteredServices = services;

    if (categoryId) {
      filteredServices = services.filter((s) => s.category_id == categoryId);
    }

    if (filteredServices.length === 0) {
      container.innerHTML = "<p>No services available in this category.</p>";
      return;
    }

    filteredServices.forEach((service) => {
      const card = document.createElement("div");
      card.classList.add("category-card");

      card.innerHTML = `
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <p><strong>₹${service.price}</strong></p>
            <button class="btn-primary book-btn" data-id="${service.id}">
                Book Service
            </button>
        `;

      container.appendChild(card);
    });

    // BOOK BUTTON
    document.querySelectorAll(".book-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const serviceId = e.target.getAttribute("data-id");

        localStorage.setItem("selectedService", serviceId);
        window.location.href = "booking.html";
      });
    });
  } catch (error) {
    container.innerHTML = "<p>Failed to load services.</p>";
  }
});
