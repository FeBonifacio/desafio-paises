import React, { useState, useEffect } from 'react';
import './styles.css';
import Table from '../TableS';

const Input = () => {
    const [nameCountries, setNameCountries] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchClick, setSearchClick] = useState(false); // Vai aparecer somente quando clicar no botão
    const [searchHistory, setSearchHistory] = useState([]);

    //useEffect para recuperar o histórico de consultas 
    useEffect(() => {
        const storedHistory = localStorage.getItem('searchHistory');
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    }, []);

    const handleInput = (e) => {
        setNameCountries(e.target.value);
    }

    //Submit normal
    const handleSubmit = async (e) => {
        e.preventDefault();

        setSearchClick(true); // Define como verdadeiro quando clicado

        try {
        // Buscar país
        const response = await fetch(`https://restcountries.com/v3.1/name/${nameCountries}`);
        const data = await response.json();
        setSearchResult(data);

        // para salvar no localS
        const updatedHistory = [...searchHistory, nameCountries];
        localStorage.setItem('searchHisory', JSON.stringify(updatedHistory));
        } catch (error) {
            console.error('Erro ao buscar país:', error);
        }

        setSearchHistory(preventHistory => [...preventHistory, nameCountries]); // colocar tudo no array
    }

    // Historicos da tabela
    const handleHistory = async (countryName) => {
        setNameCountries(countryName);
        setSearchClick(true);

        try {
            // Tenho q buscar a api de novo
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
            const data = await response.json();
            setSearchResult(data);
        } catch (error) {
            console.error('Erro ao buscar país:', error);
        }
    }

    return (
        <div className='container-all'>
            <div className='div-input'>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="query"
                        value={nameCountries}
                        onChange={handleInput}
                        placeholder='Brasil, Argentina...'
                    />

                    <button className='btn' type="submit">Buscar</button>
                </form>
            </div>
            

            {searchClick && (
                <div className='contant-table'>
                    <ul>
                    {searchResult.length > 0 ? (
                        searchResult.map(country => (
                            <li className="itens" key={country.name?.common}>
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
                </div>
            )}

        <Table searchHistory={searchHistory} handleHistory={handleHistory} />
        </div>
    );
}

export default Input;
