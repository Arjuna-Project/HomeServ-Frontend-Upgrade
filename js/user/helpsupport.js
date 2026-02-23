const chatBtn = document.getElementById("chatBtn");
const chatModal = document.getElementById("chatModal");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");

const user = JSON.parse(localStorage.getItem("user"));

chatBtn.onclick = () => (chatModal.style.display = "block");
closeChat.onclick = () => (chatModal.style.display = "none");

sendBtn.onclick = sendMessage;
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  appendMessage("ai-user", message);
  chatInput.value = "";

  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();
  console.log(data);

  appendMessage("ai-bot", data.reply);
}

function appendMessage(className, text) {
  const div = document.createElement("div");
  div.classList.add("ai-message", className);
  div.innerText = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}
