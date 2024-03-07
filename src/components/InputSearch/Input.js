import React, { useState } from 'react';
import Table from '../TableS';

const Input = () => {
    const [nameCountries, setNameCountries] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchClick, setSearchClick] = useState(false); // Vai aparecer somente quando clicar no botão
    const [searchHistory, setSearchHistory] = useState([]);
    

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

        setSearchHistory(preventHistory => [...preventHistory, nameCountries]); // colocar tudo no array
    }

    const handleHistory = async (countryName) => {
        setNameCountries(countryName);
        setSearchClick(true);

        try {
            // Buscar país
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
            const data = await response.json();
            setSearchResult(data);
        } catch (error) {
            console.error('Erro ao buscar país:', error);
        }
    }

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

        <Table searchHistory={searchHistory} handleHistory={handleHistory} />
        </div>
    );
}

export default Input;
