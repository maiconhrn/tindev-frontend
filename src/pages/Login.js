import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import Load from '../components/Load';
import api from '../services/api';
import './Login.css';

export default function Login({ history }) {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        try {
            setLoading(true);

            event.preventDefault();

            const response = await api.post('/devs', {
                username
            });

            const { _id } = response.data;

            history.push(`/dev/${_id}`);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="login-container">
            <Load loading={loading} />

            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input type="text" placeholder="Digite seu usuário do GitHub"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}