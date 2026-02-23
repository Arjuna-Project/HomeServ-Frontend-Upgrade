document.addEventListener("DOMContentLoaded", async () => {

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "user") {
        window.location.href = "../auth/login-user.html";
        return;
    }

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "../index.html";
    });

    try {
        const categories = await apiRequest("/categories", "GET");

        const container = document.getElementById("categoryContainer");

        let html = "";

        categories.forEach(cat => {
            html += `
                <div class="category-card">
                    <h3>${cat.name}</h3>
                    <p>Professional services available</p>
                    <a href="services.html?category=${cat.id}" class="btn-primary">
                        View Services
                    </a>
                </div>
            `;
        });

        container.innerHTML = html;

    } catch (error) {
        console.log("Error loading categories");
    }

});
