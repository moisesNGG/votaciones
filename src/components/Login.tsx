import React, { useState } from 'react';
import { Usuario } from '../types/types';
import '../styles/Login.css';

interface LoginProps {
  onLogin: (usuario: Usuario) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    cedula: ''
  });
  
  const [errores, setErrores] = useState({
    nombres: '',
    apellidos: '',
    cedula: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const validarFormulario = (): boolean => {
    const nuevosErrores = {
      nombres: '',
      apellidos: '',
      cedula: ''
    };

    // Validar nombres
    if (!formData.nombres.trim()) {
      nuevosErrores.nombres = 'Los nombres son obligatorios';
    } else if (formData.nombres.trim().length < 2) {
      nuevosErrores.nombres = 'Los nombres deben tener al menos 2 caracteres';
    }

    // Validar apellidos
    if (!formData.apellidos.trim()) {
      nuevosErrores.apellidos = 'Los apellidos son obligatorios';
    } else if (formData.apellidos.trim().length < 2) {
      nuevosErrores.apellidos = 'Los apellidos deben tener al menos 2 caracteres';
    }

    // Validar cédula (formato ecuatoriano básico: 10 dígitos)
    if (!formData.cedula.trim()) {
      nuevosErrores.cedula = 'La cedula es obligatoria';
    } else if (!/^\d{10}$/.test(formData.cedula.trim())) {
      nuevosErrores.cedula = 'La cedula debe tener exactamente 10 dígitos';
    }

    setErrores(nuevosErrores);
    return !Object.values(nuevosErrores).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setIsLoading(true);

    // Simula carga para que se vea bonito
    setTimeout(() => {
      const usuario: Usuario = {
        nombres: formData.nombres.trim(),
        apellidos: formData.apellidos.trim(),
        cedula: formData.cedula.trim(),
        yaVoto: false
      };

      onLogin(usuario);
      setIsLoading(false);
    }, 800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // limpiaa
    if (errores[name as keyof typeof errores]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-card">
          <div className="login-header">
            <h1>🗳️ VOTAPP 2025</h1>
            <p>Sistema de Votación Digital</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="nombres">Nombres</label>
              <input
                type="text"
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleInputChange}
                className={errores.nombres ? 'error' : ''}
                placeholder="Ingresa tus nombres"
                maxLength={50}
              />
              {errores.nombres && <span className="error-message">{errores.nombres}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                className={errores.apellidos ? 'error' : ''}
                placeholder="Ingresa tus apellidos"
                maxLength={50}
              />
              {errores.apellidos && <span className="error-message">{errores.apellidos}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cedula">Número de Cédula</label>
              <input
                type="text"
                id="cedula"
                name="cedula"
                value={formData.cedula}
                onChange={handleInputChange}
                className={errores.cedula ? 'error' : ''}
                placeholder="1234567890"
                maxLength={10}
              />
              {errores.cedula && <span className="error-message">{errores.cedula}</span>}
            </div>

            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Verificando...
                </>
              ) : (
                'Ingresar a Votar'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>⚠️ Solo puedes votar una vez con tu cédula</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;