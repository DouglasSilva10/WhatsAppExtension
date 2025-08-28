// Arrays para armazenar registros
let ganhos = [];
let perdidos = [];
let tags = [];

// Função para adicionar botões no chat
function addButtons() {
    let chatHeader = document.querySelector("[data-testid='conversation-header']");
    if (chatHeader && !document.getElementById("ganhoBtn")) {
        // Botão Ganho
        let ganhoBtn = document.createElement("button");
        ganhoBtn.id = "ganhoBtn";
        ganhoBtn.innerText = "👍 Ganho";
        ganhoBtn.style.marginRight = "5px";
        ganhoBtn.style.backgroundColor = "#28a745";
        ganhoBtn.style.color = "white";

        // Botão Perdido
        let perdidoBtn = document.createElement("button");
        perdidoBtn.id = "perdidoBtn";
        perdidoBtn.innerText = "👎 Perdido";
        perdidoBtn.style.marginRight = "5px";
        perdidoBtn.style.backgroundColor = "#dc3545";
        perdidoBtn.style.color = "white";

        // Botão Tag
        let tagBtn = document.createElement("button");
        tagBtn.id = "tagBtn";
        tagBtn.innerText = "🏷️ Tag";
        tagBtn.style.backgroundColor = "#ffa500";
        tagBtn.style.color = "white";

        chatHeader.appendChild(ganhoBtn);
        chatHeader.appendChild(perdidoBtn);
        chatHeader.appendChild(tagBtn);

        ganhoBtn.addEventListener("click", () => addRecord("Ganho"));
        perdidoBtn.addEventListener("click", () => addRecord("Perdido"));
        tagBtn.addEventListener("click", () => addRecord("Tag"));
    }
}

// Função para adicionar registro
function addRecord(type) {
    let contactName = document.querySelector("[data-testid='conversation-info-header'] span")?.innerText || "Desconhecido";
    let timestamp = new Date().toLocaleString();
    let value = "";
    let reason = "";

    if (type === "Ganho") {
        value = prompt("Informe o valor da venda:");
        ganhos.push({contact: contactName, value: value, time: timestamp});
    } else if (type === "Perdido") {
        value = prompt("Informe o valor perdido:");
        reason = prompt("Informe o motivo da perda:");
        perdidos.push({contact: contactName, value: value, reason: reason, time: timestamp});
    } else if (type === "Tag") {
        tags.push({contact: contactName, time: timestamp});
    }

    alert(`${type} registrado para ${contactName}`);
}

// Função para criar botão de Registro no topo
function addRegistroButton() {
    if (!document.getElementById("registroBtn")) {
        let topBar = document.querySelector("#side > header");
        if (!topBar) return;

        let registroBtn = document.createElement("button");
        registroBtn.id = "registroBtn";
        registroBtn.innerText = "Registro";
        registroBtn.style.backgroundColor = "#007bff";
        registroBtn.style.color = "white";
        registroBtn.style.margin = "5px";
        registroBtn.style.padding = "5px";

        topBar.appendChild(registroBtn);
        registroBtn.addEventListener("click", () => showModal());
    }
}

// Função para mostrar modal com listas
function showModal() {
    // Remove modal se já existir
    let existing = document.getElementById("registroModal");
    if (existing) existing.remove();

    let modal = document.createElement("div");
    modal.id = "registroModal";
    modal.style.position = "fixed";
    modal.style.top = "50px";
    modal.style.left = "50%";
    modal.style.transform = "translateX(-50%)";
    modal.style.backgroundColor = "white";
    modal.style.border = "1px solid #ccc";
    modal.style.padding = "10px";
    modal.style.zIndex = "9999";
    modal.style.maxHeight = "400px";
    modal.style.overflowY = "auto";

    // Abas
    let tabs = document.createElement("div");
    let ganhoTab = document.createElement("button");
    ganhoTab.innerText = "Ganho";
    let perdidoTab = document.createElement("button");
    perdidoTab.innerText = "Perdido";
    let tagTab = document.createElement("button");
    tagTab.innerText = "Tag";

    tabs.appendChild(ganhoTab);
    tabs.appendChild(perdidoTab);
    tabs.appendChild(tagTab);
    tabs.style.marginBottom = "10px";
    modal.appendChild(tabs);

    let listContainer = document.createElement("div");
    modal.appendChild(listContainer);

    // Função para mostrar lista
    function showList(type) {
        listContainer.innerHTML = "";
        let list = [];
        if (type === "Ganho") list = ganhos;
        else if (type === "Perdido") list = perdidos;
        else if (type === "Tag") list = tags;

        list.forEach(item => {
            let div = document.createElement("div");
            div.style.borderBottom = "1px solid #ccc";
            div.style.padding = "5px";
            div.style.cursor = "pointer";
            div.innerText = type === "Perdido" ? `${item.contact} - Valor: ${item.value} - Motivo: ${item.reason} - ${item.time}`
                                               : type === "Ganho" ? `${item.contact} - Valor: ${item.value} - ${item.time}`
                                                                  : `${item.contact} - ${item.time}`;
            div.addEventListener("click", () => {
                // Simula clique no chat do contato
                let chat = Array.from(document.querySelectorAll("._3Dr46")).find(c => c.innerText === item.contact);
                if (chat) chat.click();
                modal.remove();
            });
            listContainer.appendChild(div);
        });
    }

    ganhoTab.addEventListener("click", () => showList("Ganho"));
    perdidoTab.addEventListener("click", () => showList("Perdido"));
    tagTab.addEventListener("click", () => showList("Tag"));

    document.body.appendChild(modal);
}

// Atualiza a cada 2s
setInterval(addButtons, 2000);
setInterval(addRegistroButton, 2000);
