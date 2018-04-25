import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

class LineStatus extends Component{
    render(){
        return  <h4>{this.props.status}</h4>
    }
}

class Line extends Component{
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            lineName: null,
            lineStatus: null,
            lineFrequency: null,
        };
    }
    handleClick() {

        this.setState({
            active: !this.state.active,
        });
    }
    renderName(name){
        return(
            <Button onClick={() => this.handleClick()}>Name</Button>
        );
    }
    renderStatus(status){
        if(active) {
            return (
                <LineStatus lineStatus={status}/>
            );
        }else{
            <LineStatus lineStatus={status}/>
        }
    }
    render(){
        return (
            <Container>
                <Row>
                    <Col sm="2">{this.renderName(this.props.lineName)}
                    </Col>
                    <Col sm="6">{this.renderStatus(this.props.lineStatus)}
                    </Col>
                </Row>
            </Container>
        );
    }
}


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: null,
            time: moment().format('LTS'),
        };
    }

    componentDidMount() {
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'http://www.metrovias.com.ar/Subterraneos/Estado?site=Metrovias'
        fetch(proxyUrl + targetUrl).then(res => res.json())
            .then(
                (result) => {
                    const listItems = result.map((line) =>
                            <Line key={line.LineName} lineName={line.LineName} lineStatus={line.LineStatus}/>
                        //<LineStatus key={line.LineName} lineStatus={line.LineStatus}/>
                    );
                    this.setState({
                        isLoaded: true,
                        items: listItems
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    renderLine(name, status){
        return(
            <Line lineName={name} lineStatus={status}/>
        );
    }

    render() {
        console.log(this.state);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                    {this.state.time}
                    <br/>
                </header>
                {this.state.items}
                <p className="App-intro">
                </p>
            </div>
        );
    }
}



export default App;
