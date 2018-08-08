import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AddToBin.css'
import logo from './logo.png';

class AddToBin extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            price: '',
            image: ''
        }
    }

    handleAddBin(){
        axios.post(`/api/shelf${this.props.match.params.id}/bin/${this.props.match.params.number}`)
        .then((res) => {
            this.setState({
                name: res.data.name,
                price: res.data.price,
                image: res.data.image
            })
        }).catch((err) => {console.log(err)})   
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <div className="bin-header">
                    <div className="logo-header">
                        <Link to="/"><img className="logo" src={logo} alt="logo" /></Link> 
                    </div>
                    <div className="bin-crumb">
                        <h2>Shelf {this.props.match.params.id}</h2>
                    </div>
                    <div className="bin-number">
                        <h2 onClick={() => this.props.history.goBack()}>Bin {this.props.match.params.number}</h2>
                    </div>
                </div>
                <div className="edit-container">
                    <h2>Name</h2>
                    <input type="text" />
                    <h2> Price</h2>
                    <input placeholder="$0.00" type="text" />
                    <div className="buttons">
                    </div>
                    <button className="add-inventory"> + Add Inventory </button>
                </div>
            </div>
        )
    }
}

export default AddToBin;