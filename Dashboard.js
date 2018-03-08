import React from "react"
import axios from "axios"

class Dashboard extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {firstName:"FN", headline:"Title"};
    }

    componentDidMount(){
        var o = this;
        var uid = this.props.params.uid;
        axios.get("http://localhost:5000/profiledata?uid="+ uid).then(function (data) {
            o.setState(data);
        })
    }

    render(){

        return (
            <div>

                <h2>Welcome {this.state.firstName} {this.state.lastName}</h2>

                <h4>{this.state.headline}</h4>

            </div>
        )
    }
}



export default Dashboard
