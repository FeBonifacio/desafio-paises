import React from 'react';
import './styles.css';

const Table = ({ searchHistory, handleHistory }) => {

    //https://www.youtube.com/watch?v=YJCZCdLEMo4
    //https://www.npmjs.com/package/csv-parser
    //CHATGTP
    // Função para converter a tabela em formato CSV
    const convertToCSV = () => {
        const csvContet = "data:text/csv;charset=utf-8,"
        + searchHistory.map(row => row).join("\n");
    return encodeURI(csvContet);
    }

    //Função de download
    const downloadCSV = () => {
        const csvData = convertToCSV();
        const link = document.createElement("a");
        link.setAttribute('href', csvData);
        link.setAttribute('download', 'historico.csv');
        document.body.appendChild(link);
        link.click();
    }

    return (
    <>
        <div className='content-table'>
            <table>
                <thead>
                    <tr>
                        <th>Histórico de Consultas</th>
                    </tr>
                </thead>
                <tbody className='button-country'>
                    {searchHistory.map((query, index) => (
                        <tr key={index}>
                            <td>
                                <button onClick={() => handleHistory(query)}>{query}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        <div className='buttonCSV'>
            <button onClick={downloadCSV}>Exporta arquivo</button>
        </div>
    </>
        
    );
}

export default Table;
