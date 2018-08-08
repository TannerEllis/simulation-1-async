import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import logo from './logo.png';
class Homepage extends Component {

    
    render() {
   
        return (
            <div className="homepage">
                <div className="homepage-header">
                    <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>
                   <div className="homepage-title"><h2>SHELFIE</h2></div>
                </div>
                <Link to="/shelf/A"><button className="shelf-button"> Shelf A</button></Link>
                <Link to="/shelf/B"><button className="shelf-button"> Shelf B</button></Link>
                <Link to="/shelf/C"><button className="shelf-button"> Shelf C</button></Link>
                <Link to="/shelf/D"><button className="shelf-button"> Shelf D</button></Link>
            </div>
        )
    }
}

export default Homepage;