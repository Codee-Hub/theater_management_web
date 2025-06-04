const clientId = localStorage.getItem("clientId"); // ou defina manualmente para testes
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");
const mainContent = document.getElementById("main-content");

let tickets = [];

function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

async function carregarTickets() {
    try {
        const response = await fetch(`http://localhost:8080/tickets/client/${clientId}`);
        const ticketsDTO = await response.json();
        tickets = [];

        mainContent.innerHTML = ""; // limpa antes de renderizar para evitar duplicação

        for (const dto of ticketsDTO) {
            // Buscar os dados completos em paralelo
            const [spectacle, armchair, ticketPrice] = await Promise.all([
                fetch(`http://localhost:8080/spectacles/${dto.spectacleId}`).then(res => res.json()),
                fetch(`http://localhost:8080/armchairs/${dto.armchairId}`).then(res => res.json()),
                fetch(`http://localhost:8080/ticketsprices/${dto.ticketPriceId}`).then(res => res.json())
            ]);

            const ticket = {
                id: dto.id,
                spectacle,
                armchair,
                ticketPrice
            };

            tickets.push(ticket);

            const eventoDiv = document.createElement("div");
            eventoDiv.classList.add("evento");

            eventoDiv.innerHTML = `
                <h2 style="color:rgb(185, 19, 19)">${spectacle.nome}</h2>
                <div>
                    <p>Data do evento: ${formatarData(spectacle.date)}</p>
                    <p>Duração: ${spectacle.durationInMinutes} min</p>
                </div>
            `;

            eventoDiv.addEventListener("click", () => abrirModalDetalhado(ticket));
            mainContent.appendChild(eventoDiv);
        }

    } catch (error) {
        console.error("Erro ao carregar tickets:", error);
    }
}

function abrirModalDetalhado(ticket) {
    document.getElementById("modal-title").textContent = ticket.spectacle.nome;

    const infoDivs = modal.querySelectorAll(".modal-content > div");

    infoDivs[0].innerHTML = `
        <p>Data do evento: <span style="color: black">${formatarData(ticket.spectacle.date)}</span></p>
        <p>Duração: <span style="color: black">${ticket.spectacle.durationInMinutes} min</span></p>
    `;

    infoDivs[1].innerHTML = `
        <p >Poltrona: <span style="color: black">${ticket.armchair.numero}</span></p>
        <p>Preço: R$ <span style="color: black">${ticket.ticketPrice.price}</span></p>
    `;

    modal.classList.remove("hidden");
}


document.getElementById("eventos-busca").addEventListener("click", () => {
    window.location.href = "client_page_busca.html";
});

document.getElementById("eventos").addEventListener("click", () => {
    window.location.href = "client_page_events.html";
});

fecharModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Carrega na primeira vez que a página abre
window.addEventListener("DOMContentLoaded", carregarTickets);

// Garante recarregar ao voltar para a página (navegação de histórico)
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        // Limpa para evitar duplicação
        mainContent.innerHTML = "";
        carregarTickets();
    }
});
