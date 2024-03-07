import React from 'react';
import './styles.css';

const Table = ({ searchHistory, handleHistory }) => {
    return (
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
    );
}

export default Table;
