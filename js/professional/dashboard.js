document.addEventListener("DOMContentLoaded", async () => {

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "professional") {
        window.location.href = "../auth/login-professional.html";
        return;
    }

    try {

        const bookings = await apiRequest("/bookings/professional", "GET");
        console.log(bookings); // debug

        let pending = 0;
        let accepted = 0;
        let completed = 0;

        bookings.forEach(b => {
            if (b.status === "pending") {
                pending++;
            } else if (b.status === "accepted") {
                accepted++;
            } else if (b.status === "completed") {
                completed++;
            }
        });

        document.getElementById("pendingCount").innerText = pending;
        document.getElementById("acceptedCount").innerText = accepted;
        document.getElementById("completedCount").innerText = completed;

    } catch (error) {
        console.log("Error loading dashboard stats");
    }

});
