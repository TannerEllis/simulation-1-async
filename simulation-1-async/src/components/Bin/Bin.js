import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Bin.css';
import logo from './logo.png';

class Bin extends Component {
    constructor() {
        super()

        this.state = {
            edit: true,
            name: '',
            price: '',
            image: '',
            id: 0
        }

      
        this.handleDelete = this.handleDelete.bind(this);
        this.handleGetBin = this.handleGetBin.bind(this);
        this.handleUpdateBin = this.handleUpdateBin.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.handleEditPrice = this.handleEditPrice.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    componentDidMount() {
        this.handleGetBin()

    }

    toggleEdit(){
        this.setState({
            edit: !this.state.edit
        })
    }

    handleGetBin() {
        axios.get(`/api/bin/${this.props.match.params.id}${this.props.match.params.number}`)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    name: res.data.name,
                    price: res.data.price,
                    image: res.data.image,
                    id: res.data.id
                })
            }).catch((err) => { console.log(err) })
    }

    handleEditName(e){
        console.log(e)
        this.setState({
            name: e.target.value
         })
    }

    handleEditPrice(e){
        console.log(e)
        this.setState({
            price: e.target.value
         })
    }

    handleUpdateBin() {
        axios.put(`/api/bin/${this.state.id}`, {name: this.state.name, price: this.state.price}).then( () => {
            this.setState({
                edit: true,
                name: this.state.name,
                price: this.state.price
            }) 
        }).catch((err) => {console.log(err)})
    }

    handleDelete() {
        axios.delete(`/api/bin/${this.props.match.params.id}${this.props.match.params.number}`).then(() => {
            this.setState({
                name: null, 
                price: null
            })
        }).catch((err) => {console.log(err)})
    }

    render() {
        console.log(this.props)
        return (
            <div className="bin">
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
                <div className="image-container">
                    <img src={this.state.image} alt="" />
                    </div>
                <div className="edit-container">
                    <h2>Name</h2>
                    <input type="text" onChange={this.state.edit ? null: this.handleEditName} value={this.state.name}/>
                    <h2> Price</h2>
                    <input placeholder="$0.00" type="text"  onChange={this.state.edit ? null: this.handleEditPrice} value={this.state.price}/>
                    <div className="buttons">
                        
                        {this.state.edit 
                            ? 
                            <button className="edit-btn"  onClick={this.toggleEdit}>EDIT</button>
                             : 
                             <button onClick={this.handleUpdateBin} className="save-btn">SAVE</button> }
                       
                        <button className="delete-btn" onClick={this.handleDelete} >DELETE</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Bin;