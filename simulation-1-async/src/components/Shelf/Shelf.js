import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Shelf.css'
import logo from './logo.png';
import axios from 'axios';

class Shelf extends Component {
    constructor() {
        super()

        this.state = {
            bins: []
        }

    }
    componentDidMount() {
        this.handleGetBins()
    }

    handleGetBins() {
        axios.get(`/api/shelf/${this.props.match.params.id}`)
            .then((res) => {
                console.log(res)
                this.setState({
                    bins: res.data
                })
            }).catch((err) => {
                console.log(err)
            })
    }



    // Number of bins are hard coded(5) Only thing that should change is the bin name when a bin is empty. If bin is empty bin name = + Add Inventory. Add Inventory routes to AddToBin
    render() {
        console.log()
        return (
            <div className="shelf">
                <div className="shelf-header">
                    <div className="logo-header">
                        <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>
                    </div>
                    <div className="shelf-crumb">
                        <h2 onClick={() => this.props.history.goBack()}>Shelf {this.props.match.params.id}</h2>
                    </div>
                </div>
                <div className="button-container">
               
                    <Link to={`/shelf/${this.props.match.params.id}/bin/1`}> <button className="bin-button"> Bin 1</button></Link>
                    <Link to={`/shelf/${this.props.match.params.id}/bin/2`}> <button className="bin-button"> Bin 2</button></Link>
                   
                    <Link to={`/shelf/${this.props.match.params.id}/bin/3`}> <button className="bin-button"> Bin 3</button></Link>
                    { console.log(this.state.bins)}

                    
                    <Link to={`/shelf/${this.props.match.params.id}/bin/4`}> <button className="bin-button"> Bin 4</button></Link>
                    <Link to={`/shelf/${this.props.match.params.id}/add`}><button className="bin-add">+Add Inventory </button></Link>
                   
                </div>
            </div>
        )
    }
}

export default Shelf;