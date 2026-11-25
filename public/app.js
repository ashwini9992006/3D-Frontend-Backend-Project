
const sendButton = document.getElementById("sendRequest");
const resetButton = document.getElementById("resetButton");

const frontend = document.getElementById("frontend");
const backend = document.getElementById("backend");
const database = document.getElementById("database");

const activityLog = document.getElementById("activityLog");
const responseBox = document.getElementById("response");

function addLog(message) {
  const item = document.createElement("li");
  item.textContent = `${new Date().toLocaleTimeString()} - ${message}`;
  activityLog.appendChild(item);
}

function animateNode(node) {
  node.classList.remove("active");
  void node.offsetWidth;
  node.classList.add("active");
}

sendButton.addEventListener("click", async () => {
  sendButton.disabled = true;
  responseBox.textContent = "Sending request...";

  try {
    animateNode(frontend);
    addLog("Frontend is sending an HTTP request.");

    await new Promise(resolve => setTimeout(resolve, 700));

    animateNode(backend);
    addLog("Backend received the request.");

    const result = await fetch("/api/demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ action: "demo" })
    });

    if (!result.ok) {
      throw new Error(`Server returned ${result.status}`);
    }

    const data = await result.json();

    await new Promise(resolve => setTimeout(resolve, 700));

    animateNode(database);
    addLog("Backend processed the simulated database data.");

    await new Promise(resolve => setTimeout(resolve, 500));

    animateNode(frontend);
    addLog("JSON response received by the frontend.");

    responseBox.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    responseBox.textContent = `Error: ${error.message}`;
    addLog(`Request failed: ${error.message}`);
  } finally {
    sendButton.disabled = false;
  }
});

resetButton.addEventListener("click", () => {
  activityLog.innerHTML = "<li>System ready. Waiting for your request.</li>";
  responseBox.textContent = "No response yet...";

  [frontend, backend, database].forEach(node => {
    node.classList.remove("active");
    node.querySelector("small").textContent =
      node.id === "database" ? "Ready" : "Waiting for request";
  });

  addLog("System has been reset.");
});
