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
        this.checkBins = this.checkBins.bind(this);

    }
    componentDidMount() {
        this.handleGetBins()
    }

    handleGetBins() {
        axios.get(`/api/shelf/${this.props.match.params.id}`)
            .then((res) => {
                this.setState({
                    bins: res.data
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    checkBins() {

        let binList = [];
        let currentBins = []
        let missingBins = []

        // If the array doesnt have 5 elements, loop over each element and push the bin_number into the currentBins array
        if (this.state.bins.length !== 5) {
            this.state.bins.forEach(bin => {
                currentBins.push(bin.bin_number)
            })

            // checks the currentBins index (the === -1 is to check if the currentBin exists) if it doesn't exist it is pushed into missingBins 
            for (let i = 1; i <= 5; i++) {
                if (currentBins.indexOf(i) === -1) {
                    missingBins.push(i);
                }
            }

            // loops through each object in state and compares the bin number of the current index vs the bin number in the db
            for (let j = 0; j < this.state.bins.length; j++) {
                let bin = this.state.bins[j];
                for (let i = 1; i <= 5; i++) {
                    if (bin && bin.bin_number === i) {
                        binList.push(<Link to={`/shelf/${this.props.match.params.id}/bin/${bin.bin_number}`}> <button className="bin-button">Bin {`${bin.bin_number}`}</button></Link>)
                    }
                }
            }

            // checks missingBins and displays Add Inventory button if the bin is empty
            for (let i = 0; i < missingBins.length; i++) {
                binList.splice(missingBins[i] - 1, 0, <Link to={`/shelf/${this.props.match.params.id}/${missingBins[i]}`}> <button className="bin-add"> + Add Inventory</button></Link>)
            }
            console.log(binList);
            return binList;

            //if all bins are empty it makes sure to display buttons
        } else if (this.state.bins.length === 0) {
            for (let i = 1; i <= 5; i++) {
                binList.push(<Link to={`/shelf/${this.props.match.params.id}/${i}`}> <button className="bin-add"> + Add Inventory</button></Link>)
            }
            return binList

            // if bins are full display button with bin number
        } else {
            for (let i = 0; i < this.state.bins.length; i++) {
                binList.push(<Link to={`/shelf/${this.props.match.params.id}/bin/${this.state.bins[i].bin_number}`}> <button className="bin-button">Bin {`${this.state.bins[i].bin_number}`}</button></Link>)
            }
            return binList
        }
    }

    // Number of bins are hard coded(5) Only thing that should change is the bin name when a bin is empty. If bin is empty bin name = + Add Inventory. Add Inventory routes to AddToBin
    render() {
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
                    {this.checkBins().map((bin, index) => {
                        return (
                            <div key={index}>
                                {bin}
                            </div>
                        );
                    })
                    }
                </div>
            </div>
        )
    }
}

export default Shelf;