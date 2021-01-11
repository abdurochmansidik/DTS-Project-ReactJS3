import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Home extends React.Component{
  render(){
    return(
      <div>
        <Jumbotron>
          <h1 className="header">Data Cuaca, Gempa dan Tsunami</h1>
          <h4>Temukan data Cuaca Provinsi, Gempa dan Tsunami melalui aplikasi ini</h4>
        </Jumbotron>
    </div>
    )
  }
}

class Cuaca extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          data: [],
          provinsi: ["DigitalForecast-Aceh.xml","DigitalForecast-Bali.xml","DigitalForecast-Riau.xml"],
          pilihan: 0
      };
      this.handleKlik = this.handleKlik.bind(this)
      this.getData = this.getData.bind(this)
  }

  handleKlik(e){
      e.preventDefault();
      this.setState({
          data: []
      });
      this.getData();
  }

  getData(){
      var xhttp = new XMLHttpRequest();
      var self = this;
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              //alert(xhttp.responseText);
              var xmlDoc = xhttp.responseXML;
              var x = xmlDoc.getElementsByTagName('area');
              for (var i = 0; i < x.length; i++) {
                  //alert(x[i].getAttribute("id"))
                  var y = x[i].getElementsByTagName('parameter');
                  // var z = y[i].getElementsByTagName('timerange');
                  // console.log(z[0].getAttribute("datetime"));
                  self.setState( state =>{
                      var tmp = self.state.data.push({
                          'id': x[i].getAttribute("id"),
                          'nama': x[i].getAttribute("description"),
                          'longt': x[i].getAttribute("longitude"),
                          'lat': x[i].getAttribute("latitude"),

                      });
                      return (
                          tmp
                      )
                  });
              }
          }
      };
      xhttp.open("GET", "https://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/" + self.state.provinsi[self.state.pilihan], true);
      xhttp.send();
  }

  componentDidMount() {
      this.getData();
  }

  render(){
    const elements = ['Aceh','Bali','Riau'];
    
    return(
      <div>
        <Jumbotron>
          <Form> 
          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Provinsi</Form.Label>
            <Form.Control as="select" onChange={(e) => {
              this.setState({ pilihan: e.target.value });
                console.log(e.target.value);
              }}>
              {elements.map((value, index) => {
                return <option value={index}>{value}</option>
              })}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleKlik}>
            Submit
          </Button>
          </Form>
          <br/><br/>

          <Table striped bordered hover id="tableProvinsi">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Kota</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Peta</th>
              </tr>
            </thead>
            <tbody>
                {this.state.data.map((value, index) => {
                  return <tr>
                    <td>{value.id}</td>
                    <td>{value.nama}</td>
                    <td>{value.longt}</td>
                    <td>{value.lat}</td>
                    <td><a href='/lihat_peta'>Lihat Peta</a></td>
                  </tr>
                })}
            </tbody>
          </Table>
        </Jumbotron>
      </div>
    )
  }
}

class Gempa extends React.Component {
  render(){
    return(
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Tanggal/jam</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Large text" value="20 Oktober 2020" />
          </Form.Group>
          <Form.Group>
          <Form.Label>Kedalaman</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Large text" value="71 KM" />
          </Form.Group>
        </Form>
      </div>
    )
  }
}

class Tsunami extends React.Component {
  render(){
    return(
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Tanggal/jam</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Large text" value="20 Oktober 2020" />
          </Form.Group>
          <Form.Group>
          <Form.Label>Kedalaman</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Large text" value="71 KM" />
          </Form.Group>
        </Form>
      </div>
    )
  }
}
class Pegawai extends React.Component {
  state = {
    persons : []
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
    })
  }

  render(){
    return(
      <div>
        <Table striped bordered hover id="tableProvinsi">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
                  { this.state.persons.map( person => 
                  <tr>
                    <td>{person.id}</td>
                    <td>{person.name}</td>
                    <td>{person.email }</td>
                    <td>{person.phone}</td>
                  </tr>)}
            </tbody>
          </Table>
      </div>
    )
  }
}

class NavBar extends React.Component{
  render(){
    return(
      <div>
      <Nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Latihan Membuat Web BMKG</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/cuaca">Cuaca Provinsi</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/gempa">Gempa Bumi</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/tsunami">Tsunami</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/pegawai">Data Pegawai</a>
          </li>
        </ul>
      </div>
      </Nav>
      <br/><br/>
      <Router>
        <Switch>
            <Route path="/pegawai">
              <Pegawai/>
            </Route>
            <Route path="/cuaca">
              <Cuaca/>
            </Route>
            <Route path="/gempa">
              <Gempa />
            </Route>
            <Route path="/tsunami">
              <Tsunami />
            </Route>
            <Route path="/">
              <Home/>
            </Route>
        </Switch>
      </Router>
      </div>
    )
  }
}

function App() {
  //component: REUSABLE, bisa digunakan di berbagai modules
  return (
    <div className="App">
      <NavBar/>
    </div>
  );
}

export default App;
