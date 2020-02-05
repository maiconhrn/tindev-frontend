import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import Load from '../components/Load';
import api from '../services/api';
import './Login.css';

export default function Login({ history }) {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true);

            const response = await api.post('/devs', {
                username
            });

            setLoading(false);

            history.push(`/dev/${response.data._id}`);
        } catch (e) {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <Load loading={loading} />

            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"
                    onLoadStart={() => setLoading(true)}
                    onLoad={() => setLoading(false)} />
                <input type="text" placeholder="Digite seu usuário do GitHub"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}