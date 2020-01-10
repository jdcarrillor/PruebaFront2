import React, { Component } from 'react';
import Vista from './components/Structure.js';
import {BrowserRouter} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      token:'',
      userid:'',
      ADMIN:false,
      logged:false
    }
    this.logout = this.logout.bind(this)
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.setItem('admin','false');
    localStorage.setItem('userid','-1');
    console.log('se borro el token');
    alert('Se cerro sesión exitosamente');
  }
  componentDidMount(){
    try{/*
    let tok = localStorage.getItem('token', '');
    let usu = localStorage.getItem('userid', '2');
    if(tok && usu && userid==-1){
      this.setState(
        userid: usu;
      )
    }*/}
    catch(e){
      console.log(e);
    }
  }
  actualizar=(token,id,admin)=>{
    localStorage.setItem('admin','true');
    this.setState({
      token: token,
      userid:id,
      ADMIN:admin
    });
    if(admin){
      window.location='/';
    }
    else{
      window.location='home';
    }
  }
  componentWillMount(){
      let a=localStorage.getItem('token');
      if(a!==null&&a.length>0){
        this.setState({
          logged:true
        });
      }
      else{
        this.setState({
          logged:false
        });
      }
      let b=localStorage.getItem('admin');
      if(b==='true'){
        this.setState({
          ADMIN:true
        });
      }
      else{
        this.setState({
          ADMIN:false
        });
      }
      let c=localStorage.getItem('userid');
      if(c!=='admin'){
        this.setState({
          userid:parseInt(c)
        });
      }
      else{
        this.setState({
          userid:0
        });
      }
      let d=localStorage.getItem('token');
      if(d){
      console.log(d.substr(1,d.length-2));}
      if(d!==''&& d){
        this.setState({
          token:d.substr(1,d.length-2)
        });
      }
      else{
        this.setState({
          token:''
        });
      }
  }
  render() {

    //const language =


    return (
      <div className="App">
        <BrowserRouter>
            <Vista {...this.state} actualizar={this.actualizar} logout={this.logout}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
