document.addEventListener("DOMContentLoaded", () => {

    const bookingId = localStorage.getItem("reviewBooking");

    document.getElementById("reviewForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const rating = document.getElementById("rating").value;
        const comment = document.getElementById("comment").value;

        await apiRequest("/reviews", "POST", {
            booking_id: bookingId,
            rating,
            comment
        });

        localStorage.removeItem("reviewBooking");
        alert("Review submitted!");
        window.location.href = "my-bookings.html";
    });

});
