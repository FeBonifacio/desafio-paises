import React from 'react';

const Table = ({ searchHistory, handleHistory }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Histórico de Consultas</th>
                </tr>
            </thead>
            <tbody>
                {searchHistory.map((query, index) => (
                    <tr key={index}>
                        <td>
                            <button onClick={() => handleHistory(query)}>{query}</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
