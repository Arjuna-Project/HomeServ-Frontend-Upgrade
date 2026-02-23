document.addEventListener("DOMContentLoaded", () => {

  /* ================= USER LOGIN ================= */

  const userLoginForm = document.getElementById("userLoginForm");

  if (userLoginForm) {
    userLoginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      try {
        const response = await apiRequest("/auth/login-json", "POST", {
          email,
          password,
          role: "user",
        });

        if (response.access_token) {
          localStorage.setItem("token", response.access_token);
          localStorage.setItem("role", "user");
          window.location.href = "../user/dashboard.html";
        } else {
          alert("Invalid credentials");
        }

      } catch (error) {
        console.error("User login error:", error);
        alert("Server error during login");
      }
    });
  }

  /* ================= USER REGISTER ================= */

  const userRegisterForm = document.getElementById("userRegisterForm");

  if (userRegisterForm) {
    userRegisterForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const area_id = parseInt(document.getElementById("userArea").value);

      try {
        const response = await apiRequest("/auth/register", "POST", {
          name,
          email,
          password,
          phone,
          role: "user",
          area_id
        });

        if (response.message) {
          alert("Registration successful. Please login.");
          window.location.href = "login-user.html";
        } else {
          alert("Registration failed");
        }

      } catch (error) {
        console.error("User register error:", error);
        alert("Server error during registration");
      }
    });
  }

  /* ================= PROFESSIONAL LOGIN ================= */

  const proLoginForm = document.getElementById("professionalLoginForm");

  if (proLoginForm) {
    proLoginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("proEmail").value.trim();
      const password = document.getElementById("proPassword").value.trim();

      try {
        const response = await apiRequest("/auth/login-json", "POST", {
          email,
          password,
          role: "professional",
        });

        if (response.access_token) {
          localStorage.setItem("token", response.access_token);
          localStorage.setItem("role", "professional");
          window.location.href = "../professional/dashboard.html";
        } else {
          alert("Invalid credentials");
        }

      } catch (error) {
        console.error("Professional login error:", error);
        alert("Server error during login");
      }
    });
  }

  /* ================= PROFESSIONAL REGISTER ================= */

  const proRegisterForm = document.getElementById("professionalRegisterForm");

  if (proRegisterForm) {
    proRegisterForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("proName").value.trim();
      const email = document.getElementById("proEmail").value.trim();
      const password = document.getElementById("proPassword").value.trim();
      const phone = document.getElementById("proPhone").value.trim();
      const category_id = parseInt(document.getElementById("proCategory").value);
      const area_id = parseInt(document.getElementById("proArea").value);
      const experience = parseInt(document.getElementById("proExperience").value);

      try {
        const response = await apiRequest("/auth/register", "POST", {
          name,
          email,
          password,
          phone,
          role: "professional",
          category_id,
          area_id,
          experience
        });

        if (response.message) {
          alert("Registration successful. Please login.");
          window.location.href = "login-professional.html";
        } else {
          alert("Registration failed");
        }

      } catch (error) {
        console.error("Professional register error:", error);
        alert("Server error during registration");
      }
    });
  }

  /* ================= ADMIN LOGIN ================= */

  const adminLoginForm = document.getElementById("adminLoginForm");

  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("adminEmail").value.trim();
      const password = document.getElementById("adminPassword").value.trim();

      try {
        const response = await apiRequest("/auth/login-json", "POST", {
          email,
          password,
          role: "admin",
        });

        if (response.access_token) {
          localStorage.setItem("token", response.access_token);
          localStorage.setItem("role", "admin");
          window.location.href = "../admin/dashboard.html";
        } else {
          alert("Invalid admin credentials");
        }

      } catch (error) {
        console.error("Admin login error:", error);
        alert("Server error during login");
      }
    });
  }

});
