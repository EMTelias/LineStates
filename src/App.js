import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';
import 'moment-duration-format';
import logo from './logo.svg';
import './App.css';

class LineStatus extends Component{
    render(){
        return  <h4>{this.props.status}</h4>
    }
}
class LineFrequency extends Component{
    render(){
        return  <h4>{this.props.lineFrequency}</h4>
    }
}
class Line extends Component{
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            lineName: props.name,
            lineStatus: null,
            lineFrequency: null,
        };
    }
    handleClick(name) {
        if( !this.state.active){
            var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
                targetUrl = 'http://www.metrovias.com.ar/Subterraneos/Estado?site=Metrovias'
            fetch(proxyUrl + targetUrl).then(res => res.json())
                .then((result) => {
                    var filtro = _.filter(result,function(linea){
                        return linea.LineName === name;
                    });
                    this.setState({
                        active: true,
                        lineStatus: filtro[0].LineStatus,
                        lineFrequency: moment.duration(filtro[0].LineFrequency, "seconds").format(),
                    });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
        else{
            this.setState({
                active: false,
                lineStatus: null,
                lineFrequency: null,
            });
        }
        console.log(this.state);
    }
    renderName(name){
        return(
            <button onClick={() => this.handleClick(name)}>{ name }</button>
        );
    }
    renderStatus(status){
            return (
                <LineStatus lineStatus={status}/>
            );
    }
    renderFrequency(freq){
            return (
                <LineFrequency lineFrequency={freq}/>
            );
    }
    render(){
        return (
            <Container>
                <Row>
                    <Col sm="2">{this.renderName(this.props.name)}
                    </Col>
                    <Col sm="2">{this.renderFrequency(this.state.lineStatus)}
                    </Col>
                    <Col sm="2">{this.renderFrequency(this.state.lineFrequency)}
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
            .then((result) => {
                    const listItems = result.map((line) =>
                            <Line key={line.LineName} name={line.LineName}/>
                    );
                    this.setState({
                        isLoaded: true,
                        items: listItems
                    });
                },
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
