document.addEventListener("DOMContentLoaded", async () => {

    if (localStorage.getItem("role") !== "user") {
        window.location.href = "../auth/login-user.html";
        return;
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "../index.html";
        });
    }

    try {
        const profile = await apiRequest("/users/me", "GET");

        if (document.getElementById("userId")) {
            document.getElementById("userId").innerText = profile.id || "-";
        }

        if (document.getElementById("userName")) {
            document.getElementById("userName").innerText = profile.name || "-";
        }

        if (document.getElementById("userEmail")) {
            document.getElementById("userEmail").innerText = profile.email || "-";
        }

        if (document.getElementById("userPhone")) {
            document.getElementById("userPhone").innerText = profile.phone || "-";
        }
    } catch (error) {
        console.error("Failed to load profile:", error);
        alert("Unable to load profile. Please login again.");
        localStorage.clear();
        window.location.href = "../auth/login-user.html";
    }

});
