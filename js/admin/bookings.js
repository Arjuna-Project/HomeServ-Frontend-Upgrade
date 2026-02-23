document.addEventListener("DOMContentLoaded", async () => {

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "admin") {
        window.location.href = "../auth/login-admin.html";
    }

    const container = document.getElementById("bookingContainer");

    // LOGOUT
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "../index.html";
    });

    try {
        const response = await apiRequest("/admin/bookings", "GET");
        const bookings = response.data;

        if (bookings.length === 0) {
            container.innerHTML = "<p>No bookings found.</p>";
            return;
        }

        let table = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Professional</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
        `;

        bookings.forEach(b => {
            table += `
                <tr>
                    <td>${b.user_name}</td>
                    <td>${b.professional_name || "Not Assigned"}</td>
                    <td>${b.service_name}</td>
                    <td>${b.date}</td>
                    <td>${b.time}</td>
                    <td>${b.status}</td>
                </tr>
            `;
        });

        table += `</tbody></table>`;
        container.innerHTML = table;

    } catch (error) {
        container.innerHTML = "<p>Error loading bookings.</p>";
    }

});
