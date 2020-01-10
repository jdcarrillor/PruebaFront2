import React, { Component } from 'react';

import '../css/producto-styleMs.css';
import {Link} from 'react-router-dom';
import axios from 'axios'
import {FormattedMessage} from "react-intl";
class TarjetaRegaloDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      id:0,
      pagina: 0,
      titulo:"",
      mensaje:"",
      imagenes:[],
      plantilla:""
    };
  }

  componentDidMount() {
        var id=this.props.match.params.idTarjetaRegalo;
            axios.get('https://regalayapp1.herokuapp.com/tarjetaRegalo/'+id)
                .then((response) => {
                    var state = this.state;
                    var tarjetaRegalo = response.data;
                    state.id = id;
                    state.titulo = tarjetaRegalo.titulo;
                    state.mensaje = tarjetaRegalo.mensaje;
                    state.imagenes.push(tarjetaRegalo.imagenes[0].url);
                    state.imagenes.push(tarjetaRegalo.imagenes[1].url);
                    state.plantilla = tarjetaRegalo.plantilla;
                    state.pagina = 0;
                    // pueden cambiar el tamaño de partion aca
                    this.setState(state);
                });
    }
    postTarjetaRegalo=()=>{
      let titulo=document.getElementById('tituloPost').value;
      let img=[];
      let url1=document.getElementById('url1Post').value;
      let url1json={
        url:url1
      }
      img.push(url1json);
      let url2=document.getElementById('url2Post').value;
      let url2json={
        url:url2
      }
      img.push(url2json);
      let men=document.getElementById('mensajePost').value;
      let plan=document.getElementById('plantillaPost').value;
      let tarjetaRegalo={
        titulo:titulo,
        mensaje:men,
        imagenes:img,
        plantilla:plan,
        cupones:[],
        productos:[]
      }
      var tok=localStorage.getItem('token');
      if (tok) {
        var token = localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + token;
      }
      axios.post('https://regalayapp1.herokuapp.com/tarjetaRegalo', tarjetaRegalo);
      return false;
    }
    putTarjetaRegalo=()=>{
      let titulo=document.getElementById('tituloPut').value;
      let img=[];
      if(titulo===""){
        titulo=this.state.titulo;
      }
      let url1=document.getElementById('url1Put').value;
      if(url1===""){
        url1=this.state.imagenes[0];
      }
      let url1json={
        url:url1
      }
      img.push(url1json);
      let url2=document.getElementById('url2Put').value;
      if(url2===""){
        url2=this.state.imagenes[1];
      }
      let url2json={
        url:url2
      }
      img.push(url2json);
      let men=document.getElementById('mensajePut').value;
      if(men===""){
        men=this.state.mensaje;
      }
      let plan=document.getElementById('plantillaPut').value;
      if(plan===""){
        plan=this.state.plantilla;
      }
      let tarjetaRegalo={
        titulo:titulo,
        mensaje:men,
        imagenes:img,
        plantilla:plan,
        cupones:[],
        productos:[]
      }
      var tok=localStorage.getItem('token');
      if (tok) {
        var token = localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + token;
      }
      axios.put('https://regalayapp1.herokuapp.com/tarjetaRegalo/'+this.state.id, tarjetaRegalo);
      console.log(this.state.id);
    }
    deleteTarjetaRegalo=()=>{
      var tok=localStorage.getItem('token');
      if (tok) {
        var token = localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + token;
      }
      axios.delete('https://regalayapp1.herokuapp.com/tarjetaRegalo/'+this.state.id);
      window.location.href = 'https://front-8b02f.firebaseapp.com/TarjetaRegaloList/';
    }
  render(){
    return(
      <div className="container">
      <div className="float-left">
      <div className="card text-center">
        <div className="card-body text-dark">
        <h2 className="card-title">{this.state.titulo}</h2>
        <p className="card-text text-secondary">{this.state.mensaje}</p>
        <div className="overflow">
          <img className='card-img-top' src={this.state.plantilla} alt='Image1'/>
        </div>
          <br/>
        <div className="og">
        <Link to={{
          pathname:"/TarjetaRegaloList/",
        }}  className="back" data={this.props.data}><FormattedMessage id="Back"/></Link>

          &nbsp;&nbsp; &nbsp;&nbsp;
          <Link to={{
            pathname:"/TiendaList/",
          }}  className="back" data={this.props.data}>See Stores</Link>
        </div>
        </div>
      </div>
      </div>
      </div>
    );
  }
}
export default TarjetaRegaloDetail;
