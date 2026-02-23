async function apiRequest(endpoint, method = "GET", data = null) {

    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    // 🔐 Attach token if available
    if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL + endpoint, options);

    if (!response.ok) {
        throw new Error("API request failed");
    }

    return await response.json();
}

