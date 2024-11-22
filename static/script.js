document.getElementById("form-recomendacao").addEventListener("submit", function (e) {
    e.preventDefault();  // Previne o envio do formulário

    // Obtém o gênero selecionado
    const generoSelecionado = document.getElementById("genero").value;

    // Cria a requisição AJAX para enviar os dados para o backend (Flask)
    const formData = new FormData();
    formData.append("genero", generoSelecionado);

    fetch("/recomendar", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const sugestaoDiv = document.getElementById("sugestoes");

        if (data.sugestoes.length > 0) {
            sugestaoDiv.textContent = `Recomendamos os seguintes filmes de ${generoSelecionado}: ${data.sugestoes.join(", ")}`;
        } else {
            sugestaoDiv.textContent = "Desculpe, não temos sugestões para esse gênero.";
        }
    })
    .catch(error => {
        console.error('Erro ao fazer a requisição:', error);
    });
});
