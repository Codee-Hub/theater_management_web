document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("password").value;

        try {
            const response = await fetch(`http://localhost:8080/clients/${encodeURIComponent(email)}`);

            if (!response.ok) {
                alert("Usuário não encontrado.");
                return;
            }

            const client = await response.json();

            if (client.senha !== senha) {
                alert("Senha incorreta.");
                return;
            }

            // Salva dados no localStorage (id, nome, role)
            localStorage.setItem("clientId", client.id);
            localStorage.setItem("clientName", client.nome);
            localStorage.setItem("clientRole", client.role);

            // Redireciona conforme a role
            if (client.role === "USER") {
                window.location.href = "client_page_events.html";
            } else if (client.role === "ADMIN") {
                window.location.href = "organizer_page.html";
            } else {
                alert("Role desconhecida.");
            }

        } catch (error) {
            console.error(error);
            alert("Erro ao tentar fazer login. Tente novamente.");
        }
    });
});
