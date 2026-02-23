document.addEventListener("DOMContentLoaded", async () => {

    if (localStorage.getItem("role") !== "admin") {
        window.location.href = "../auth/login-admin.html";
    }

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "../index.html";
    });

    const container = document.getElementById("userContainer");

    const response = await apiRequest("/admin/users", "GET");

    const users = response.data;

    let table = `
        <table class="admin-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
    `;

    users.forEach(u => {
        table += `
            <tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
            </tr>
        `;
    });

    table += "</tbody></table>";
    container.innerHTML = table;

});
