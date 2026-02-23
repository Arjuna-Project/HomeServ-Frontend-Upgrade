document.addEventListener("DOMContentLoaded", async () => {
  const categoryMap = {
    1: "Plumbing",
    2: "Electrical",
    3: "Carpentry",
    4: "Cleaning",
    5: "AC Repair",
    6: "Painting",
    7: "Appliance Repair",
    8: "Pest Control",
    9: "Salon at Home",
    10: "Car Wash",
  };
  if (localStorage.getItem("role") !== "professional") {
    window.location.href = "../auth/login-professional.html";
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../index.html";
  });

  const profile = await apiRequest("/users/me", "GET");

  document.getElementById("proName").innerText = profile.name;
  document.getElementById("proEmail").innerText = profile.email;
  document.getElementById("proCategory").innerText =
    categoryMap[profile.category_id] || "Not Assigned";
  document.getElementById("proExperience").innerText =
    profile.experience + " yrs";
  console.log(profile);
});
