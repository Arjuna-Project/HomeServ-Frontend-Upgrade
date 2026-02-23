document.addEventListener("DOMContentLoaded", async () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || role !== "admin") {
    window.location.href = "../auth/login-admin.html";
  }

  const container = document.getElementById("professionalContainer");

  // LOGOUT
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../index.html";
  });

  try {
    const response = await apiRequest("/admin/professionals", "GET");
    const professionals = response.data;

    if (professionals.length === 0) {
      container.innerHTML = "<p>No professionals found.</p>";
      return;
    }

    let table = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Category</th>
                        <th>Experience</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

    professionals.forEach((pro) => {
      table += `
        <tr>
            <td>${pro.name}</td>
            <td>${pro.email}</td>
            <td>${pro.category || "Not Assigned"}</td>
            <td>${pro.experience || 0} yrs</td>
            <td>
                <button class="btn-delete" data-id="${pro.id}">
                    Delete
                </button>
            </td>
        </tr>
    `;
    });

    table += `</tbody></table>`;
    container.innerHTML = table;

    // DELETE BUTTON
    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const proId = e.target.getAttribute("data-id");

        const confirmDelete = confirm(
          "Are you sure you want to delete this professional?",
        );
        if (!confirmDelete) return;

        try {
          await apiRequest(`/admin/professionals/${proId}`, "DELETE");
          location.reload();
        } catch (error) {
          alert("Failed to delete professional");
        }
      });
    });
  } catch (error) {
    container.innerHTML = "<p>Error loading professionals.</p>";
  }
});
