import React, {Component} from 'react';
import './App.css';

class App extends Component {
    render() {
        const authurl = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81sftw5i3bu0ga&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&state=2522abcde12345&scope=r_basicprofile";
        return (
            <div className="App">
                <a href={authurl}><img src="signin.png" alt="Sign in with Linkedin"/></a>
            </div>
        );
    }
}

export default App;
