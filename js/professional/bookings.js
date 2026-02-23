document.addEventListener("DOMContentLoaded", async () => {

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "professional") {
        window.location.href = "../auth/login-professional.html";
    }

    const container = document.getElementById("bookingContainer");

    // LOGOUT
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "../index.html";
    });

    try {
        const bookings = await apiRequest("/bookings/professional", "GET");

        if (bookings.length === 0) {
            container.innerHTML = "<p>No bookings available.</p>";
            return;
        }

        bookings.forEach(booking => {

            const card = document.createElement("div");
            card.classList.add("booking-card");

            card.innerHTML = `
                <h3>${booking.service_name}</h3>
                <p><strong>Customer:</strong> ${booking.user_name}</p>
                <p><strong>Date:</strong> ${booking.date}</p>
                <p><strong>Time:</strong> ${booking.time}</p>
                <p><strong>Status:</strong> ${booking.status}</p>

                <div class="action-buttons">
                    ${booking.status === "pending" ? 
                        `<button class="btn-primary accept-btn btn-view" data-id="${booking.id}">Accept</button>` : ""
                    }

                    ${booking.status === "accepted" ? 
                        `<button class="btn-primary complete-btn btn-view" data-id="${booking.id}">Mark Completed</button>` : ""
                    }
                </div>
            `;

            container.appendChild(card);
        });

        // ACCEPT BOOKING
        document.querySelectorAll(".accept-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const bookingId = e.target.getAttribute("data-id");
                await apiRequest(`/bookings/${bookingId}/accept`, "PUT");
                location.reload();
            });
        });

        // COMPLETE BOOKING
        document.querySelectorAll(".complete-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const bookingId = e.target.getAttribute("data-id");
                await apiRequest(`/bookings/${bookingId}/complete`, "PUT");
                location.reload();
            });
        });

    } catch (error) {
        container.innerHTML = "<p>Error loading bookings.</p>";
    }

});
