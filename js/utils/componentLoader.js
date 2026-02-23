async function loadComponent(id, filePath) {
    const element = document.getElementById(id);
    if (!element) return;

    const response = await fetch(filePath);
    const html = await response.text();
    element.innerHTML = html;

    attachGlobalEvents();
}

function attachGlobalEvents() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "../index.html";
        });
    }
}
