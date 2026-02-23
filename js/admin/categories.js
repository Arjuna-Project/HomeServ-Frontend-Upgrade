document.addEventListener("DOMContentLoaded", async () => {

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "admin") {
        window.location.href = "../auth/login-admin.html";
    }

    const container = document.getElementById("categoryContainer");
    const form = document.getElementById("categoryForm");

    // LOGOUT
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "../index.html";
    });

    // LOAD CATEGORIES
    async function loadCategories() {
        const categories = await apiRequest("/admin/categories", "GET");

        if (categories.length === 0) {
            container.innerHTML = "<p>No categories found.</p>";
            return;
        }

        let table = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        categories.forEach(cat => {
            table += `
                <tr>
                    <td>${cat.name}</td>
                    <td>
                        <button class="btn-primary delete-btn" data-id="${cat.id}">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

        table += `</tbody></table>`;
        container.innerHTML = table;

        // DELETE BUTTON
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const id = e.target.getAttribute("data-id");

                await apiRequest(`/admin/categories/${id}`, "DELETE");
                loadCategories();
            });
        });
    }

    loadCategories();

    // ADD CATEGORY
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("categoryName").value;

        await apiRequest("/admin/categories", "POST", { name });

        form.reset();
        loadCategories();
    });

});
