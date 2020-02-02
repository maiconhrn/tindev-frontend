import React from 'react';
import './Match.css';
import itsamatch from '../assets/itsamatch.png';

export default function Match({ matchDev, setMatchDev }) {
    return (
        matchDev && <div className="match-container">
            <img src={itsamatch} alt="It's a Match"></img>
            <img className="avatar" src={matchDev.avatar} alt={matchDev.name}></img>
            <strong>{matchDev.name}</strong>
            <p>{matchDev.bio}</p>
            <button type="button" onClick={() => setMatchDev(null)}>Fechar</button>
        </div>
    );
}
