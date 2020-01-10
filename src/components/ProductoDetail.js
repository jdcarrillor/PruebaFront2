import React, { Component } from 'react';

import '../css/producto-styleMs.css';
import {Link} from 'react-router-dom';
import axios from 'axios'
import {FormattedMessage} from "react-intl";
import decode from "jwt-decode";
import get from './productoAction';
import {conect} from 'react-redux';


class ProductoDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      id:0,
      pagina: 0,
      nombre:"",
      src:"",
      clasificacion:"",
      talla:"",
      precio:0,
      cant:0
    };
  }

  checkAuth(){
    const token = localStorage.getItem('token');
    if(!token){
      return false;
    }
    try{
      const  tok = decode(token);
      if(!tok){
        return false;
      }
    }catch(e){

      return false;
    }
    return true;
  }

  componentDidMount() {
        var id=this.props.match.params.idProducto;
            axios.get('https://regalayapp1.herokuapp.com/producto/'+id)
                .then((response) => {
                    var state = this.state;
                    var producto = response.data;
                    state.id = id;
                    state.nombre = producto.nombre;
                    state.src = producto.src;
                    state.clasificacion = producto.clasificacion;
                    state.talla = producto.talla;
                    state.precio = producto.precio;
                    state.cant = producto.cantidadDisponible;
                    state.pagina = 0;
                    // pueden cambiar el tamaño de partion aca
                    this.setState(state);
                });
    }
    postProducto=()=>{
      let nombre=document.getElementById('nombrePost').value;
      let clas=document.getElementById('clasificacionPost').value;
      let talla=document.getElementById('tallaPost').value;
      let img=document.getElementById('urlPost').value;
      let luk=document.getElementById('precioPost').value;
      let cant=document.getElementById('cantidadPost').value;
      let producto={
        nombre:nombre,
        src:img,
        clasificacion:clas,
        talla:talla,
        precio:luk,
        cantidadDisponible:cant
      }
      var tok=localStorage.getItem('token');
      if (tok) {
        var token = localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + token;
      }
      axios.post('https://regalayapp1.herokuapp.com/producto', producto);
      return false;
    }
    putProducto=()=>{
      let nombre=document.getElementById('nombrePut').value;

      if(nombre===""){
        nombre=this.state.nombre;
      }
      let clas=document.getElementById('clasificacionPut').value;
      if(clas===""){
        clas=this.state.clasificacion;
      }
      let talla=document.getElementById('tallaPut').value;
      if(talla===""){
        talla=this.state.talla;
      }
      let img=document.getElementById('urlPut').value;
      if(img===""){
        img=this.state.src;
      }
      let luk=document.getElementById('precioPut').value;
      if(luk===""){
        luk=this.state.precio;
      }
      let cant=document.getElementById('cantidadPut').value;
      if(cant===0){
        cant=this.state.cant;
      }
      let producto={
        nombre:nombre,
        src:img,
        clasificacion:clas,
        talla:talla,
        precio:luk,
        cantidadDisponible:cant
      }

      var tok=localStorage.getItem('token');

      axios.put('https://regalayapp1.herokuapp.com/producto/'+this.state.id, producto);
      console.log(this.state.id);
    }
    deleteProducto=()=>{
      var tok=localStorage.getItem('token');

      axios.delete('https://regalayapp1.herokuapp.com/producto/'+this.state.id);
      window.location.href = 'https://regalayapp1.herokuapp.com/ProductoList';
    }
  render(){
    return(
      <div className="container">
      <div className="">
        <div className="">
          <div className="overflow">
            <br/>
              <br/>
            <img className='' src={this.state.src} alt='Image1'/>
          </div>
            <div className="card-body text-dark">
            <h1 className="card-title">{this.state.nombre}</h1>
            <p className="card-text text-secondary"><FormattedMessage id="Size"/>: {this.state.talla}</p>
            <p className="card-text text-secondary"><FormattedMessage id="Price"/>: ${this.state.precio}</p>
            <p className="card-text text-secondary"><FormattedMessage id="Stock"/>: {this.state.cant}</p>
            <div className="panelOg">
            <Link to={{
              pathname:"/ProductoList",
            }}  className="back"><FormattedMessage id="Back"/><span className="bg"></span></Link>
            <button type="button" className="del float-right" ><FormattedMessage id="AddCart"/><span className="bg"></span></button>
            </div>
            </div>
        </div>
      </div>

      </div>
    );
  }
}
export default ProductoDetail;
