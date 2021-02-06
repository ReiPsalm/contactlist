import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ContactList from '../cluster/ContactList';

const AppRoutes = () => {
    return (
        <React.Fragment>
           <BrowserRouter>
                <React.Fragment>
                    <Switch>
                        <Route exact path='/' component={ContactList} />
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default AppRoutes;