document.addEventListener("DOMContentLoaded", () => {

    const bookingId = localStorage.getItem("complaintBooking");

    document.getElementById("complaintForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const issue = document.getElementById("issue").value;

        await apiRequest("/complaints", "POST", {
            booking_id: bookingId,
            issue
        });

        localStorage.removeItem("complaintBooking");
        alert("Complaint submitted!");
        window.location.href = "my-bookings.html";
    });

});
