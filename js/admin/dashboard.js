document.addEventListener("DOMContentLoaded", async () => {

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "admin") {
        window.location.href = "../auth/login-admin.html";
    }

    // LOGOUT
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "../index.html";
    });

    try {
        const stats = await apiRequest("/admin/stats", "GET");

        document.getElementById("userCount").innerText = stats.total_users;
        document.getElementById("professionalCount").innerText = stats.total_professionals;
        document.getElementById("bookingCount").innerText = stats.total_bookings;

    } catch (error) {
        console.log("Error loading admin stats");
    }

});
