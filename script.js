document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-button");
    const searchQueryInput = document.getElementById("search-query");
    const searchResults = document.getElementById("search-results");

    searchButton.addEventListener("click", () => {
        const apiKey = "fc0ce0006e2b413795d023733abe1446";
        const query = searchQueryInput.value;

        // URL da API Bing Search
        const apiUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`;

        // Configuração da chamada fetch com a chave da API
        const requestOptions = {
            method: "GET",
            headers: {
                "Ocp-Apim-Subscription-Key": apiKey
            }
        };

        // Chamada à API Bing Search
        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                // Limpe os resultados anteriores
                searchResults.innerHTML = "";

                // Exiba os resultados da pesquisa
                if (data.webPages?.value) {
                    data.webPages.value.forEach(result => {
                        const title = result.name;
                        const url = result.url;

                        // Crie um elemento de link para exibir o título e o URL
                        const link = document.createElement("a");
                        link.href = url;
                        link.textContent = title;
                        link.target = "_blank"; // Abra em uma nova guia

                        // Adicione o link aos resultados
                        searchResults.appendChild(link);
                        searchResults.appendChild(document.createElement("br"));
                    });
                } else {
                    searchResults.textContent = "Nenhum resultado encontrado.";
                }
            })
            .catch(error => {
                console.error("Erro ao buscar resultados da pesquisa:", error);
                searchResults.textContent = "Ocorreu um erro ao buscar resultados da pesquisa.";
            });
    });
});
