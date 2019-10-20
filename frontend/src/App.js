/// IMPORTS

// Libraries
import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import platform from 'platform';
import axios from 'axios';

// Subpages and components
import Wrapper from './components/ui/wrapper';
import Homepage from './components/web/homepage';

/// GLOBAL TUNABLES
const API_ADDR = 'https://momentum-host.herokuapp.com/';
const API_GET = API_ADDR + 'api/get';
const API_PUT = API_ADDR + 'api/put';
const API_UPD = API_ADDR + 'api/update';
const API_DEL = API_ADDR + 'api/delete';

// How often is the database polled from data?
// NOTE: in ms
const DB_POLL = 1000;

/// UTILITY FUNCTIONS
export function isMobile() {
    // Check for resolution and user-agent verification
    let device_width = window.screen.width * window.devicePixelRatio;
    let mobile_user = platform.name.includes('Mobile');

    return device_width < 800 || mobile_user;
}

export function isSubpage() {
    // Check if we're running from the root
    // also if it's the master webpage
    //
    // This is a necessary check due to the way we link stylesheets.
    // In the case that we're using a subdomain or running a subpage in an 'iframe'
    // we have to go one directory up in order for relative CSS linking to work.
    let document_path = window.location.pathname;
    let document_dir = document_path.substring(0, document_path.lastIndexOf('/'));

    // Fix determining whether it's a subpage or not
    /*
    if (document_dir === '/MomentumClient/web/') {
        return true;
    } else if (document_dir === '/MomentumClient/') {
        return false;
    }
    */
    return false;
}

// Main application component
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [], // Data from the server represented as an array,
            interval: false, // Whether the interval that polls the server is set
            loading: true, // Whether the application is still loading and waiting for a fetch
            error: null // or maybe the connection throws an error
        };
    }

    // TODO: Add get, put, update and delete methods

    // Get method
    getData = () => {
        fetch(API_GET)
            .then(data => data.json())
            .then(res => this.setState({ data: res.data, loading: false }))
            .catch(err => this.setState({ error: err }));
    };

    // Put method
    putData = query => {
        let current_ids = this.state.data.map(data => data.id);
        let id = 0;
        while (current_ids.includes(id)) {
            ++id;
        }

        axios.post(API_PUT, {
            id: id,
            data: query
        });
    };

    componentDidMount = () => {
        this.getData();
        // Poll the database continuously
        if (!this.state.interval) {
            let interval = setInterval(this.getData, DB_POLL);
            this.setState({ interval: interval });
        }
    };

    componentWillUnmount = () => {
        if (this.state.interval) {
            clearInterval(this.state.interval);
            this.setState({ interval: null });
        }
    };

    render() {
        const { data, loading, error } = this.state;

        // Display any errors
        if (error) {
            return <center>{error.message}</center>;
        }

        // Waiting for the response
        if (loading) {
            // TODO: return an empty loader
            return <Wrapper></Wrapper>;
        }

        // Unitialized?
        if (!data) {
            return <center>Data is undefined or null</center>;
        }

        // Data is actually empty?
        if (data.length <= 0) {
            // Propably the scheme model is wrong. Show anyways
            return <center>Error</center>;
        }

        // If and only if everything seems okay render the page
        return (
            <Router basename="admin">
                <Switch>
                    <Route exact path="/">
                        <Wrapper>
                            <Homepage data={data}></Homepage>
                        </Wrapper>
                    </Route>
                    <Route path="/homepage">
                        <Wrapper>
                            <Homepage data={data}></Homepage>
                        </Wrapper>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
