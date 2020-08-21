console.log("RayTracer Console!");

(async () => {
  let ws = null;
  const trasmitBtn = document.querySelector("#transmit");
  const connectBtn = document.querySelector("#connect");
  const disconnectBtn = document.querySelector("#disconnect");
  const canvas = document.querySelector("#canvas");

  const init = () => {
    let ws = new WebSocket("ws://localhost:3000");
    return ws;
  };

  const onOpen = () => {
    console.log("Socket opened!");
    canvas.classList.remove("border-danger");
    canvas.classList.remove("border-warning");
    canvas.classList.add("border-success");
  };

  const onMessage = (event) => {
    console.log("Incoming Message:", event.data);
  };

  const onclose = () => {
    console.log("Socket closed!");
    canvas.classList.remove("border-success");
    canvas.classList.add("border-danger");
  };

  const applyEventFuncs = (ws) => {
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onclose = onclose;
    return ws;
  };

  trasmitBtn.addEventListener("click", (event) => {
    if (!ws) {
      console.log("No WebSocket connection :(");
      return;
    }
    if (ws.readyState === 1) {
      [...new Array(10)].forEach((item, idx) => {
        ws.send(`count ${idx}`);
      });
      console.log("Message sent!");
    } else {
      console.log(`Socket is currently in state ${ws.readyState}.`);
    }
  });

  connectBtn.addEventListener("click", (event) => {
    if (!ws) {
      ws = init();
      ws = applyEventFuncs(ws);
      canvas.classList.add("border-warning");
    } else {
      console.log("Socket is still open.");
    }
  });

  disconnectBtn.addEventListener("click", (event) => {
    if (!ws) {
      console.log("No WebSocket connection :(");
      return;
    }
    ws.close(1000, "manual disconnect");
    ws = null;
    console.log("Manual Disconnect");
  });
})();
