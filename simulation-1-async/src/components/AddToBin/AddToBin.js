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
        this.handleAddBin = this.handleAddBin.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleImageChange(e) {
        this.setState({
            image: e.target.value
        })
    }

    handleNameChange(e){
        this.setState({
            name: e.target.value
        })
    }

    handlePriceChange(e){
        this.setState({
            price: e.target.value
        })
    }

    handleAddBin(){
        let {name, price, image} = this.state
        console.log(this.props.match.params.number)
        axios.post(`/api/bin/${this.props.match.params.id}${this.props.match.params.number}`, {name, price, image})
        .then((res) => {
            console.log(res.data)
            this.props.history.goBack()
        })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <div className="bin-header">
                    <div className="logo-header">
                        <Link to="/"><img className="logo" src={logo} alt="logo" /></Link> 
                    </div>
                    <div className="add-bin-crumb">
                        <h2>Shelf {this.props.match.params.id}</h2>
                    </div>
                    <div className="bin-number">
                        <h2 className="a2b" onClick={() => this.props.history.goBack()}>Add to Bin {this.props.match.params.number}</h2>
                    </div>
                </div>
                <div className="edit-container">
                    <h2>Name</h2>
                    <input onChange={this.handleNameChange} value={this.state.name} type="text"  />
                    <h2> Price</h2>
                    <input onChange={this.handlePriceChange} value={this.state.price} placeholder="$0.00" type="text" />
                    <h2> Image </h2>
                    <input onChange={this.handleImageChange} value={this.state.image}  placeholder="image url" type="text"/>
                    <div className="buttons">
                    </div>
                    <button onClick={this.handleAddBin} className="add-inventory"> + Add Inventory </button>
                </div>
            </div>
        )
    }
}

export default AddToBin;