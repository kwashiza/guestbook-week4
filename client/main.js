const form = document.getElementById("message-form");
const messageList = document.getElementById("message-list");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const messageData = Object.fromEntries(formData);

  const response = await fetch("http://localhost:4000/board", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
    body: JSON.stringify(messageData),
  });
  if (response.ok) {
    displayMessages();
  } else {
    console.error("Failed to post message", response.status);
  }
});

async function fetchMessages() {
  const messages = await fetch("http://localhost:4000/board");
  let result = await messages.json();
  return result;
}

async function displayMessages() {
  let messages = await fetchMessages();

  messageList.innerHTML = "";
  messages.forEach((message) => {
    let messageDiv = document.createElement("div");
    messageDiv.setAttribute("class", "message-div");

    let h3Tag = document.createElement("h3");
    let pTag = document.createElement("p");

    let buttonDiv = document.createElement(`div`);
    buttonDiv.setAttribute("class", "button-div");

    h3Tag.textContent = message.username;
    pTag.textContent = message.message;
    h3Tag.setAttribute("class", "username");
    pTag.setAttribute("class", "username-message");
   


    messageList.appendChild(messageDiv)
    messageDiv.appendChild(h3Tag);
    messageDiv.appendChild(pTag);
    messageDiv.appendChild(buttonDiv);
    
  });
}