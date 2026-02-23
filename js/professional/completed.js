document.addEventListener("DOMContentLoaded", async () => {

    if (localStorage.getItem("role") !== "professional") {
        window.location.href = "../auth/login-professional.html";
        return;
    }

    const container = document.getElementById("completedContainer");

    try {

        const bookings = await apiRequest("/bookings/professional", "GET");

        const jobs = bookings.filter(b => b.status === "completed");

        if (jobs.length === 0) {
            container.innerHTML = "<p>No completed jobs yet.</p>";
            return;
        }

        jobs.forEach(job => {

            const div = document.createElement("div");
            div.classList.add("booking-card");

            div.innerHTML = `
                <h3>${job.service_name || "Service"}</h3>
                <p><strong>User:</strong> ${job.user_name || "-"}</p>
                <p><strong>Date:</strong> ${job.date}</p>
                <p><strong>Status:</strong> Completed</p>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        container.innerHTML = "<p>Error loading completed jobs.</p>";
    }

});
