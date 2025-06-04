const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");

let eventoSelecionadoId = null;

document.getElementById("eventos").addEventListener("click", () => {
    window.location.href = "client_page_events.html";
});

// Fecha o modal
fecharModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Lida com a submissão do formulário
document.getElementById("form-pagina").addEventListener("submit", async (e) => {
    e.preventDefault();

    const idPersonType = Number(document.getElementById("tipoIngresso-select").value);
    const armchairId = Number(document.getElementById("poltrona-select").value);
    const paymentMethodId = document.getElementById("pagamento-select").value;
    const clientId = Number(localStorage.getItem("clientId"));
    const idSpectacle = Number(eventoSelecionadoId);

    try {
        // 🔍 Buscar espetáculo (pra pegar precoBase)
        const spectacleRes = await fetch(`http://localhost:8080/spectacles/${idSpectacle}`);
        if (!spectacleRes.ok) throw new Error("Erro ao buscar espetáculo");
        const spectacle = await spectacleRes.json();
        let preco = spectacle.precoBase;

        // 🔍 Buscar poltrona (pra pegar area)
        const armchairRes = await fetch(`http://localhost:8080/armchairs/${armchairId}`);
        if (!armchairRes.ok) throw new Error("Erro ao buscar poltrona");
        const armchair = await armchairRes.json();
        const nomeArea = armchair.roomArea.nomeArea.toLowerCase();

        // 🏟️ Ajuste pelo tipo da área
        if (nomeArea === "vip") {
            preco = 0;
        } else if (nomeArea === "camarote") {
            preco *= 2;
        } // normal = mantém

        // 🎟️ Ajuste pelo tipo de ingresso
        if (idPersonType === 1) { // VIP
            preco = 0;
        } else if (idPersonType === 3) { // Meia
            preco = preco / 2;
        }

        // 🔢 Garantir duas casas decimais
        preco = parseFloat(preco.toFixed(2));

        // 1. Salvar o TicketPrice
        const ticketPricePayload = {
            idSpectacle,
            idPersonType,
            price: preco
        };

        const ticketPriceResponse = await fetch("http://localhost:8080/ticketsprices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketPricePayload)
        });

        if (!ticketPriceResponse.ok) throw new Error("Erro ao salvar TicketPrice");

        const ticketPrice = await ticketPriceResponse.json();

        // 2. Salvar o Ticket
        const ticketPayload = {
            spectacleId: idSpectacle,
            clientId,
            armchairId,
            ticketPriceId: ticketPrice.id
        };

        const ticketResponse = await fetch("http://localhost:8080/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketPayload)
        });

        if (!ticketResponse.ok) throw new Error("Erro ao salvar Ticket");

        const ticketSalvo = await ticketResponse.json();
        alert("Ingresso comprado com sucesso!");

        modal.classList.add("hidden");

    } catch (error) {
        console.error("Erro durante a compra:", error);
        alert("Erro durante a compra do ingresso.");
    }
});


// Buscar eventos e renderizar
async function carregarEventos() {
    try {
        const response = await fetch("http://localhost:8080/spectacles");
        const eventos = await response.json();

        const container = document.getElementById("eventosContainer");
        container.innerHTML = "";

        eventos.forEach(evento => {
            const div = document.createElement("div");
            div.className = "evento";
            div.dataset.id = evento.id;

            div.innerHTML = `
                <h2 style="color:rgb(185, 19, 19)">${evento.nome}</h2>
                <div style="display: flex; justify-content: space-between; width: 100%;">
                    <p>Data do evento: ${new Date(evento.date).toLocaleDateString()}</p>
                    <p>Duração: ${evento.durationInMinutes} Minutos</p>
                </div>
            `;

            div.addEventListener("click", async () => {
                eventoSelecionadoId = evento.id;

                try {
                    const response = await fetch(`http://localhost:8080/spectacles/${evento.id}`);
                    const espetaculoDetalhado = await response.json();
                    const roomId = espetaculoDetalhado.room.id;

                    // 💰 Preenche o valor base no modal
                    document.getElementById("valor-base").textContent = `R$ ${espetaculoDetalhado.precoBase.toFixed(2)}`;

                    const armchairResponse = await fetch(`http://localhost:8080/armchairs/by-room/${roomId}`);
                    const poltronas = await armchairResponse.json();

                    const selectPoltrona = document.getElementById("poltrona-select");
                    selectPoltrona.innerHTML = '<option value="" disabled selected>Selecione</option>';

                    poltronas.forEach(poltrona => {
                        const option = document.createElement("option");
                        option.value = poltrona.id;
                        option.textContent = `Poltrona ${poltrona.numero} - ${poltrona.roomArea.nomeArea}`;
                        selectPoltrona.appendChild(option);
                    });

                    modal.classList.remove("hidden");

                } catch (error) {
                    console.error("Erro ao buscar poltronas ou espetáculo:", error);
                }
            });


            container.appendChild(div);
        });
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
    }
}

// Carregar os tipos de ingresso
async function carregarTiposDeIngresso() {
    try {
        const response = await fetch("http://localhost:8080/persontypes");
        const tipos = await response.json();

        const select = document.getElementById("tipoIngresso-select");
        select.innerHTML = '<option value="" disabled selected>Selecione</option>';

        tipos.forEach(tipo => {
            const option = document.createElement("option");
            option.value = tipo.id;
            option.textContent = tipo.typeName;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar tipos de ingresso:", error);
    }
}

// Carregar os métodos de pagamento
async function carregarMetodosPagamento() {
    try {
        const response = await fetch("http://localhost:8080/paymentsmethods");
        const metodos = await response.json();

        const select = document.getElementById("pagamento-select");
        select.innerHTML = '<option value="" disabled selected>Selecione</option>';

        metodos.forEach(metodo => {
            const option = document.createElement("option");
            option.value = metodo.id;
            option.textContent = metodo.methodPayment;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar métodos de pagamento:", error);
    }
}

// Carregar tudo ao iniciar
carregarEventos();
carregarTiposDeIngresso();
carregarMetodosPagamento();
