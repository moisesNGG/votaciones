import React, { useState } from 'react';
import { Usuario } from '../types/types';
import { useVotacion } from '../context/VotacionContext';
import '../styles/UserInfo.css';

interface UserInfoProps {
  usuario: Usuario;
  onLogout: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ usuario, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { usuarioYaHaVotado } = useVotacion();

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      onLogout();
    }
  };

  return (
    <div className="user-info">
      <div 
        className="user-avatar-container"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="user-avatar">
          {usuario.nombres.charAt(0).toUpperCase()}
          {usuario.apellidos.charAt(0).toUpperCase()}
        </div>
        <div className="user-status">
          {usuarioYaHaVotado ? (
            <span className="status-voted">✅ Votó</span>
          ) : (
            <span className="status-pending">⏳ Pendiente</span>
          )}
        </div>
      </div>

      {showDropdown && (
        <div className="user-dropdown">
          <div className="user-info-details">
            <h4>{usuario.nombres} {usuario.apellidos}</h4>
            <p>Cédula: {usuario.cedula}</p>
            <p className={`status ${usuarioYaHaVotado ? 'voted' : 'pending'}`}>
              {usuarioYaHaVotado ? 'Ya has votado' : 'Puedes votar'}
            </p>
          </div>
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;