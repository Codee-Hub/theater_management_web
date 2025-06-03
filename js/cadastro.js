document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const cpf = document.getElementById("cpf").value;
        const numero = document.getElementById("numero").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("password").value;
        const role = "USER"

        const payload = {
            nome,
            cpf,
            numero,
            email,
            senha,
            role
        };

        try {
            const response = await fetch("http://localhost:8080/clients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Erro ao cadastrar cliente");
            }

            const data = await response.json();

            // Salvar no localStorage (exemplo: id e nome)
            localStorage.setItem("clientId", data.id);
            localStorage.setItem("clientName", data.nome);

            alert("Cliente cadastrado com sucesso!");

            // Redireciona para a página do cliente
            window.location.href = "client_page_events.html";

        } catch (error) {
            console.error(error);
            alert("Falha ao cadastrar. Verifique os dados e tente novamente.");
        }
    });
});
