import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './AppHeader.css';
import { PinkButton } from '../app/App.js'

class AppHeader extends Component {

    render() {
        const style1 = {
            "background-color": "#ffffff"
        };
        const style2 = {
            "background-color": "#000000"
        };
        return (

                <header className="app-header">
                    <div className="container">
                        <div className="app-branding">
                            <Link to="/" className="app-title">누굴까?</Link>
                        </div>
                        <div className="app-options">
                            <nav className="app-nav">
                                {this.props.authenticated ? (
                                    <ul>
                                        <li>
                                            <PinkButton component={Link} to="/job">My Job</PinkButton>
                                        </li>
                                        <li>
                                            <PinkButton component={Link} to="/profile">Pro####file</PinkButton>
                                        </li>
                                        <li>
                                            <PinkButton onClick={this.props.onLogout}>Logout</PinkButton>
                                        </li>
                                    </ul>
                                ) : (
                                        <ul>
                                            <li>
                                                <PinkButton component={Link} to="/login">Login</PinkButton>
                                            </li>
                                            <li>
                                                <PinkButton component={Link} to="/signup">Signup</PinkButton>
                                            </li>
                                        </ul>
                                    )}
                            </nav>
                        </div>
                    </div>
                </header>

        )
    }
}

export default withRouter(AppHeader);