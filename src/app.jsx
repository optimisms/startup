import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { History } from './history/history';
import { NewForm } from './newform/newform';
import { Queue } from './queue/queue';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <header className="container-fluid">
                    <nav className="navbar fixed-top navbar-dark">
                        <a className="navbar-brand" href="#">PGSPCA</a>
                        <menu className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className='nav-link' to=''>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to='history'>History</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to='newform'>New Form</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to='queue'>Queue</NavLink>
                            </li>
                        </menu>
                    </nav>
                </header>
        
                <Routes>
                    <Route path='/' element={<Login 
                        userName={userName}
                        authState={authState}
                        onAuthChange={(userName, authState) => {
                            setAuthState(authState);
                            setUserName(userName);
                        }}
                    />} exact />
                    <Route path='/history' element={<History />} />
                    <Route path='/newform' element={<NewForm />} />
                    <Route path='/queue' element={<Queue />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
        
                <footer className="bg-dark text-white-50">
                    <div className="container-fluid">
                        <span className="text-reset">Haile Terry</span>
                        <a className="text-reset" href="https://github.com/optimisms/startup" target="_blank">GitHub</a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}