document.addEventListener("DOMContentLoaded", async () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || role !== "user") {
    window.location.href = "../auth/login-user.html";
  }

  const container = document.getElementById("bookingContainer");

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../index.html";
  });

  try {
    const bookings = await apiRequest("/bookings/my", "GET");

    if (bookings.length === 0) {
      container.innerHTML = "<p>No bookings found.</p>";
      return;
    }

    bookings.forEach((booking) => {
      const card = document.createElement("div");
      card.classList.add("category-card");

      const today = new Date();
      const bookingDate = new Date(booking.date);

      today.setHours(0, 0, 0, 0);
      bookingDate.setHours(0, 0, 0, 0);

      const diffTime = bookingDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let waitingText;

      if (booking.status === "completed") {
        waitingText = "Completed";
      } else if (diffDays > 0) {
        waitingText = diffDays + " day(s) remaining";
      } else if (diffDays === 0) {
        waitingText = "Today";
      } else {
        waitingText = "Pending";
      }

      card.innerHTML = `
        <h3>${booking.service_name}</h3>
        <p><strong>Booking ID:</strong> ${booking.id}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><strong>Status:</strong> 
            <span class="status ${booking.status}">
                ${booking.status}
            </span>
        </p>
        <p><strong>Waiting time:</strong> ${waitingText}</p>
        <div style="margin-top:15px;">
          ${
            booking.status === "completed"
              ? `<button class="btn-primary review-btn" data-id="${booking.id}">
                  Write Review
                </button>`
              : ""
          }
          <button class="btn-primary complaint-btn" data-id="${booking.id}">
            Raise Complaint
          </button>
        </div>
      `;

      container.appendChild(card);

      card.querySelectorAll(".review-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          localStorage.setItem("reviewBooking", id);
          window.location.href = "review.html";
        });
      });

      card.querySelectorAll(".complaint-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          localStorage.setItem("complaintBooking", id);
          window.location.href = "complaint.html";
        });
      });
    });
  } catch (error) {
    container.innerHTML = "<p>Failed to load bookings.</p>";
  }
});
