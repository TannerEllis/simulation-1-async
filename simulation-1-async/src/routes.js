import React from 'react';
import { Route, Switch } from "react-router-dom";
import Homepage from './components/Homepage/Homepage';
import Shelf from './components/Shelf/Shelf';
import Bin from './components/Bin/Bin';
import AddToBin from './components/AddToBin/AddToBin';

export default (    
    <Switch>
        <Route exact path="/" component={Homepage} /> 
        <Route exact path="/shelf/:id/bin/:number" component={Bin} />
        <Route exact path="/shelf/:id" component={Shelf} />
        <Route exact path="/shelf/:id/add" component={AddToBin} />
    </Switch>
) 