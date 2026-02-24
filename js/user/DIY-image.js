const diyBtn = document.getElementById("diyBtn");
const diyModal = document.getElementById("diyModal");
const closeDIY = document.getElementById("closeDIY");
const analyzeBtn = document.getElementById("analyzeBtn");
const imageUpload = document.getElementById("imageUpload");
const diyResult = document.getElementById("diyResult");

diyBtn.onclick = () => (diyModal.style.display = "block");
closeDIY.onclick = () => (diyModal.style.display = "none");

analyzeBtn.onclick = async () => {
  const file = imageUpload.files[0];
  if (!file) return alert("Upload an image first");

  const token = localStorage.getItem("token");

  if (!token) {
    diyResult.innerText = "Please login to use DIY assistance.";
    return;
  }

  diyResult.innerText = "Analyzing issue...";

  const base64 = await toBase64(file);

  try {
    const response = await fetch(`${BASE_URL}/chat/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        image: base64.split(",")[1],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      diyResult.innerText = errorData.detail || "Server error occurred.";
      return;
    }

    const data = await response.json();
    diyResult.innerText = data.reply || "No response received.";

  } catch (error) {
    console.error(error);
    diyResult.innerText = "Network error. Please try again.";
  }
};

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 600;
        const scaleSize = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
    };

    reader.onerror = error => reject(error);
  });
}
