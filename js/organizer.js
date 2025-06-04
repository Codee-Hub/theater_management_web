const modal = document.getElementById("modal");
const abrirModal = document.querySelector("header button");
const fecharModal = document.getElementById("fecharModal");

// Abrir e fechar modal
abrirModal.addEventListener("click", () => {
    console.log("Abrindo modal e carregando salas");
    modal.classList.remove("hidden");
    carregarSalas(); 
});



fecharModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

async function carregarSalas() {
    try {
        const response = await fetch("http://localhost:8080/rooms");
        const salas = await response.json();

        const selectSala = document.getElementById("salaEvento");

        // Limpa todas as opções, exceto a primeira
        selectSala.innerHTML = '<option value="" disabled selected>Selecione uma sala</option>';

        salas.forEach(sala => {
            const option = document.createElement("option");
            option.value = sala.id;
            option.textContent = `Sala ${sala.roomNumber}`;
            selectSala.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar salas:", error);
    }
}


// Buscar eventos da API e exibir
async function carregarEventos() {
    try {
        const response = await fetch("http://localhost:8080/spectacles");
        const eventos = await response.json();

        const container = document.getElementById("eventosContainer");
        container.innerHTML = "";

        eventos.forEach(evento => {
            const div = document.createElement("div");
            div.className = "evento";
            div.innerHTML = `
                <h2 style="color:rgb(185, 19, 19)">${evento.nome}</h2>
                <div style="display: flex; justify-content: space-between; width: 100%">
                    <p>Data do evento: ${new Date(evento.date).toLocaleDateString()}</p>
                    <p>Duração: ${evento.durationInMinutes} Minutos</p>
                </div>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
    }
}

// Envio do formulário para criar evento
document.getElementById("formEvento").addEventListener("submit", async (e) => {
    e.preventDefault();

    const precoBase = parseInt(document.getElementById("precoEvento").value);

    const novoEvento = {
        nome: document.getElementById("nomeEvento").value,
        date: new Date(document.getElementById("dataEvento").value).toISOString(),
        durationInMinutes: document.getElementById("duracaoEvento").value,
        idRoom: parseInt(document.getElementById("salaEvento").value),
        precoBase : parseInt(document.getElementById("precoEvento").value)
    };

    console.log(precoBase)

    try {
        const response = await fetch("http://localhost:8080/spectacles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoEvento)
        });

        if (response.ok) {
            alert("Evento cadastrado com sucesso!");
            modal.classList.add("hidden");
            carregarEventos(); // Atualiza a lista
        } else {
            alert("Erro ao cadastrar evento!");
        }
    } catch (error) {
        console.error("Erro ao cadastrar evento:", error);
    }
});

// Carregar eventos ao abrir a página
carregarEventos();
