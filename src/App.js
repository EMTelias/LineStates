import React, { Component } from 'react';
import { Container, Row, Col, Button, Table } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';
import 'moment-duration-format';
import logo from './logo.svg';
import './App.css';

class LineStatus extends Component{
    render(){
        return  <p>{this.props.status}</p>
    }
}
class LineFrequency extends Component{
    render(){
        return  <p>{this.props.lineFrequency}</p>
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
                        lineFrequency: moment.duration(filtro[0].LineFrequency*1, "seconds").format(),
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
            <Button className={ name + " btn-linea" }  onClick={() => this.handleClick(name)}>{ name }</Button>
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
            <tr>
                    <th>{this.renderName(this.props.name)}</th>
                    <th>{this.renderFrequency(this.state.lineStatus)}</th>
                    <th>{this.renderFrequency(this.state.lineFrequency)}</th>
            </tr>
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
                <Table borderless>
                    <thead>
                    <tr>
                        <th>Linea</th>
                        <th>Servicio</th>
                        <th>Frecuencia</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.items}
                    </tbody>
                </Table>

                <p className="App-intro">
                </p>
            </div>
        );
    }
}



export default App;
