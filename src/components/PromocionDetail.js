import React, { Component } from 'react';

import '../css/producto-styleMs.css';
import {Link} from 'react-router-dom';
import {FormattedMessage} from "react-intl";
import axios from 'axios'
class PromocionDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      nombre:"",
      fechaInicio:"",
      fechaFin:"",
      pagina: 0,
      IDmarcas:[],
      IDtiendas:[],
      tienda:"",
      marcas:[]
    };
  }

  componentDidMount() {
    var id=this.props.match.params.idPromocion;

        axios.get('https://regalayapp1.herokuapp.com/promocion/'+id)
            .then((response) => {
                var a=[];
                var idTienda=0
                var state = this.state;
                var tarjetaRegalo = response.data;
                state.id = id;
                state.nombre = tarjetaRegalo.nombre;
                state.fechaInicio = tarjetaRegalo.fechaDeInicio;
                state.fechaFin=tarjetaRegalo.fechaDeFin;
                state.pagina = 0;
                a=tarjetaRegalo.marcas;
                console.log(a.length);
                idTienda=tarjetaRegalo.idTienda;
                // pueden cambiar el tamaño de partion aca
                this.setState(state);
                var i;
                for (i = 0; i < a.length; i++){
                    axios.get('https://regalayapp1.herokuapp.com/marcas/'+a[i].idMarca)
                        .then((response) => {
                            var state = this.state;
                            var marca = response.data;
                            state.marcas.push(marca.imagen);
                            console.log(state.marcas[1]);
                            state.pagina = 0;
                            // pueden cambiar el tamaño de partion aca
                            this.setState(state);
                        });
                      }
                      axios.get('https://regalayapp1.herokuapp.com/tiendas/'+idTienda)
                          .then((response) => {
                              var state = this.state;
                              var tienda = response.data;
                              console.log(tienda);
                              state.tienda =tienda.imagen;
                              state.pagina = 0;
                              // pueden cambiar el tamaño de partion aca
                              this.setState(state);
                          });
            });
    }
    postPromocion=()=>{
      let nombre=document.getElementById('tituloPost').value;
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
        nombre:nombre,
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
      axios.post('https://regalayapp1.herokuapp.com/promocion', tarjetaRegalo);
      return false;
    }
    putTarjetaRegalo=()=>{
      let nombre=document.getElementById('tituloPut').value;
      let img=[];
      if(nombre===""){
        nombre=this.state.nombre;
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
        nombre:nombre,
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
    deletePromocion=()=>{
      var tok=localStorage.getItem('token');
      if (tok) {
        var token = localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + token;
      }
      axios.delete('https://regalayapp1.herokuapp.com/promocion/'+this.state.id);
      window.location.href = 'https://regalayapp1.herokuapp.com/Promociones';
    }
  render(){
    return(
      <div className="container">
      <div className="float-left">
      <div className="card text-center">
        <div className="overflow">
          <img className='card-img-top' src={this.state.tienda} alt='Image1'/>
        </div>
        <div className="card-body text-dark">
        <h1 className="card-title">{this.state.nombre}</h1>
        </div>
        <div className="row">
        <div className="overflow">
          <img className='card-img-top down' src={this.state.marcas[0]} alt='Image1'/>
        </div>
        <div className="overflow">
          <img className='card-img-top down' src={this.state.marcas[1]} alt='Image1'/>
        </div>
        </div>

        <div className="og">
        <Link to={{
          pathname:"/Promociones/",
        }}  className="back "><FormattedMessage id="Back"/></Link>

          &nbsp;&nbsp;
          <Link to={{
            pathname:"/ProductoList/",
          }}  className="back ">See Products</Link>

        </div>
      </div>
      </div>
      </div>
    );
  }
}
export default PromocionDetail;
