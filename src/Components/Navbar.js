import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Navbar(props) {
    const getNavbarStyle = () => {
        return props.mode === 'dark'
            ? {
                backgroundColor: '#1e293b',
                color: '#e0f2fe',
                borderBottom: '1px solid #334155',
                boxShadow: '0 3px 8px rgba(255, 255, 255, 1)',
                transition: 'all 0.5s ease',
            }
            : {
                backgroundColor: '#dbeafe',
                color: '#001f3f',
                borderBottom: '1px solid #bcd3f7',
                boxShadow: '0 3px 8px rgba(0, 0, 0, 1)',
                transition: 'all 0.5s ease',
            };

    };


    return (
        <nav className={`navbar navbar-expand-lg fixed-top shadow-sm ${props.mode === 'dark' ? 'navbar-dark' : 'navbar-light'}`} style={getNavbarStyle()}>

            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: getNavbarStyle().color }}>
                    <b>{props.title}</b>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" style={{ color: getNavbarStyle().color }}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about" style={{ color: getNavbarStyle().color }}>
                                {props.AboutText}
                            </Link>
                        </li>
                    </ul>

                    <div className="theme-toggle">
                        <input
                            type="checkbox"
                            id="modeSwitch"
                            className="toggle-checkbox"
                            onChange={props.toggleMode}
                            checked={props.mode === 'dark'}
                        />
                        <label htmlFor="modeSwitch" className="toggle-label">
                            <i className={`fas fa-sun icon sun ${props.mode === 'light' ? 'active' : ''}`}></i>
                            <i className={`fas fa-moon icon moon ${props.mode === 'dark' ? 'active' : ''}`}></i>
                        </label>
                    </div>
                </div>
            </div>
        </nav>
    );
}
