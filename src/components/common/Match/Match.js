import React from 'react';
import itsamatch from '../../../assets/itsamatch.png';
import './Match.css';

export default function Match({ matchDev, setMatchDev }) {
    return (
        <>
            {matchDev && <div className="match-container">
                <img src={itsamatch} alt="It's a Match"></img>
                <img className="avatar" src={matchDev.avatar} alt={matchDev.name}></img>
                <strong>{matchDev.name}</strong>
                <p>{matchDev.bio}</p>
                <button type="button" onClick={() => setMatchDev(null)}>Fechar</button>
            </div>}
        </>
    );
}
