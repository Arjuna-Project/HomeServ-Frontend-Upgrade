document.addEventListener("DOMContentLoaded", async () => {

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "admin") {
        window.location.href = "../auth/login-admin.html";
    }

    const form = document.getElementById("serviceForm");
    const container = document.getElementById("serviceContainer");
    const categorySelect = document.getElementById("serviceCategory");

    // LOGOUT
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "../index.html";
    });

    // LOAD CATEGORIES INTO DROPDOWN
    async function loadCategories() {
        const categories = await apiRequest("/admin/categories", "GET");

        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.id;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });
    }

    // LOAD SERVICES
    async function loadServices() {
        const services = await apiRequest("/admin/services", "GET");

        if (services.length === 0) {
            container.innerHTML = "<p>No services found.</p>";
            return;
        }

        let table = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        services.forEach(service => {
            table += `
                <tr>
                    <td>${service.name}</td>
                    <td>${service.description}</td>
                    <td>₹${service.price}</td>
                    <td>${service.category_name}</td>
                    <td>
                        <button class="btn-primary delete-btn" data-id="${service.id}">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

        table += `</tbody></table>`;
        container.innerHTML = table;

        // DELETE SERVICE
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const id = e.target.getAttribute("data-id");

                await apiRequest(`/admin/services/${id}`, "DELETE");
                loadServices();
            });
        });
    }

    loadCategories();
    loadServices();

    // ADD SERVICE
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("serviceName").value;
        const description = document.getElementById("serviceDescription").value;
        const price = document.getElementById("servicePrice").value;
        const category_id = document.getElementById("serviceCategory").value;

        await apiRequest("/admin/services", "POST", {
            name,
            description,
            price,
            category_id
        });

        form.reset();
        loadServices();
    });

});
