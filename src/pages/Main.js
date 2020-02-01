import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';
import like from '../assets/like.svg';
import logo from '../assets/logo.svg';
import Load from '../components/Load';
import api from '../services/api';
import './Main.css';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const response = await api.get('/devs', {
          headers: {
            user: match.params.id
          }
        });

        setUsers(response.data);
      } finally {
        setLoading(false);
      }
    })();
  }, [match.params.id]);

  useEffect(() => {
    (async () => {
      const socket = io(process.env.REACT_APP_API_URL, {
        query: { user: match.params.id }
      });

      socket.on('match', dev => {
        setMatchDev(dev);
      });
    })();
  }, [match.params.id]);

  async function handleDislike(id) {
    try {
      await api.post(`/devs/${id}/dislikes`, null, {
        headers: {
          user: match.params.id
        }
      });

      setUsers(users.filter(user => user._id !== id));

    } finally {
      setLoading(false);
    }
  }

  async function handleLike(id) {
    try {
      await api.post(`/devs/${id}/likes`, null, {
        headers: {
          user: match.params.id
        }
      });

      setUsers(users.filter(user => user._id !== id));

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main-container">
      <Load loading={loading} />

      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>

      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name}></img>
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : !loading && (
        <div className="empty">
          Acabou :(
          </div>
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a Match"></img>
          <img className="avatar" src={matchDev.avatar} alt={matchDev.name}></img>
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>
          <button type="button" onClick={() => setMatchDev(null)}>Fechar</button>
        </div>
      )}
    </div>
  );
}
