//Não usei mas vou deixar aqui, caso eu precise para outra aplicação


// const Moeda = async (nameCountries) => {
//     try {
//         const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${nameCountries}`);
        
//         if (!response.ok) {
//             throw new Error('Erro ao obter os dados do país');
//         }

//         const data = await response.json();
        
//         if (!data || data.length === 0) {
//             throw new Error('Dados do país não encontrados na resposta da API');
//         }

//         const countryCodes = data.map(country => country.alpha3Code).join(',');
        
//         const currencyResponse = await fetch(`https://restcountries.com/v3.1/currency/${countryCodes}`);
//         const currencyData = await currencyResponse.json();

//         if (!currencyData || currencyData.length === 0) {
//             throw new Error('Dados da moeda não encontrados na resposta da API');
//         }

//         const currencies = currencyData.map(country => ({
//             codigo: country.alpha3Code,
//             moeda: country.currencies ? country.currencies[0]?.name : 'Moeda não disponível'
//         }));
        
//         console.log('Códigos e moedas recebidos:', currencies);
//         return currencies;
//     } catch (error) {
//         console.error('Erro ao buscar os códigos e moedas:', error);
//         return [];
//     }
// }

// export default Moeda;
