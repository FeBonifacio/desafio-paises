import React, { useState, useEffect } from 'react';
import './styles.css';
import Table from '../TableS';
// import buscarMoeda from '../Moeda'; 

const Input = () => {
    const [nameCountries, setNameCountries] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchClick, setSearchClick] = useState(false); 
    const [searchHistory, setSearchHistory] = useState([]);

    // const [moeda, setMoeda] = useState('');

    useEffect(() => {
        //Salvando no localS
        const storedHistory = localStorage.getItem('searchHistory');
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    }, []);

    //Buscar pelo nome
    const handleInput = (e) => {
        setNameCountries(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSearchClick(true); // habilitando

        if (nameCountries.trim() === '') {
            alert('Informe o nome do país');
            return;
        }
        
        try {
            //Buscando todas as informações do pais
            const response = await fetch(`https://restcountries.com/v3.1/name/${nameCountries}`);
            const data = await response.json();
            setSearchResult(data);

            console.log('Informações do país:', data);

            //Salvado o historico das pesquisas no localS
            const updatedHistory = [...searchHistory, nameCountries];
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

            // Chame a função buscarMoeda para obter a moeda do país
            // const moeda = await buscarMoeda(nameCountries);
            // setMoeda(moeda);
        } catch (error) {
            console.error('Erro ao buscar país:', error);
        }

        setSearchHistory(prevHistory => [...prevHistory, nameCountries]);
    }

    const handleHistory = async (countryName) => {
        setNameCountries(countryName);
        setSearchClick(true);

        try {
            //Tive q buscar de novo
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
            const data = await response.json();
            setSearchResult(data);

            // Chame a função buscarMoeda para obter a moeda do país
            // const moeda = await buscarMoeda(countryName);
            // setMoeda(moeda);
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
                                <p>Moeda: {
                                    Object.values(country.currencies).map(currency => (
                                        <span key={currency.name}>{currency.name}</span>
                                    ))}
                                </p>    
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
