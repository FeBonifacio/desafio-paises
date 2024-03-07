import React, { useState, useEffect } from 'react';

const Input = () => {
    const [nameCountries, setNameCountries] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchClick, setSearchClick] = useState(false); // Vai aparecer somente quando clicar no botão

    const handleInput = (e) => {
        setNameCountries(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSearchClick(true); // Define como verdadeiro quando clicado

        try {
            // Buscar país
            const response = await fetch(`https://restcountries.com/v3.1/name/${nameCountries}`);
            const data = await response.json();
            setSearchResult(data);
        } catch (error) {
            console.error('Erro ao buscar país:', error);
        }
    }

    // const fetchCurrency = async (country) => {
    //     try {
    //         const currencyResponse = await fetch(`https://restcountries.com/v3.1/currency/${country.currencies[0]?.code}`);
    //         const currencyData = await currencyResponse.json();
    //         const currency = currencyData[0]?.currencies[0]?.name || 'Moeda não disponível';
    //         return { ...country, currency };
    //     } catch (error) {
    //         console.error('Erro ao buscar moeda:', error);
    //         return { ...country, currency: 'Moeda não disponível' };
    //     }
    // };

    // useEffect(() => {
    //     if (searchResult.length > 0 && searchClick) {
    //         const fetchData = async () => {
    //             const updatedSearchResult = [];
    //             for (const country of searchResult) {
    //                 const updatedCountry = await fetchCurrency(country);
    //                 updatedSearchResult.push(updatedCountry);
    //             }
    //             setSearchResult(updatedSearchResult);
    //         };
    //         fetchData();
    //     }
    // }, [searchResult, searchClick]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="query"
                    value={nameCountries}
                    onChange={handleInput}
                    placeholder='Brasil, Argentina...'
                />
                <button type="submit">Buscar</button>
            </form>

            {searchClick && (
                <ul>
                    {searchResult.length > 0 ? (
                        searchResult.map(country => (
                            <li key={country.name?.common}>
                                <h1>{country.name?.common}</h1>
                                <p>Capital: {country.capital}</p>
                                <p>População: {country.population}</p>
                                <p>Moeda: {country.currency}</p>
                                <p>Idioma: {country.languages ? Object.values(country.languages).join(', ') : 'Idioma não disponível'}</p>
                            </li>
                        ))
                    ) : (
                        <p>Nenhum resultado encontrado.</p>
                    )}
                </ul>
            )}
        </div>
    );
}

export default Input;
