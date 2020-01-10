import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import Navbar from './NavBar'
import TarjetaRegaloList from './TarjetaRegaloList'
import ProductoList from './ProductoList'
import ProductoDetail from './ProductoDetail'

import MarcaDetail from './MarcaDetail'
import TiendaDetail from './TiendaDetail'

import TarjetaRegaloDetail from './TarjetaRegaloDetail'


import TiendasList from './TiendaList'
import MarcaList from './MarcaList'
import Promociones from './Promociones'
import PromocionDetail from './PromocionDetail'

import UsuarioList from './UsuarioList'
import UsuarioDetail from './UsuarioDetail'
import FacturaList from './FacturaList'
import FacturaDetail from './FacturaDetail'

import Home from './Home'


class Vista extends Component {

    render() {
        return(
            <div>


                <Navbar ADMIN={this.props.ADMIN} logged={this.props.logged} logout={this.props.logout}/>
                <Route path="/" exact component= {Home}/>
                <Route path="/ProductoList" exact component={ProductoList}/>
                <Route path="/ProductoDetail/:idProducto" exact component={ProductoDetail}/>
                <Route path="/TiendaDetail/:idTienda" exact component={TiendaDetail}/>
                <Route path="/MarcaDetail/:idMarca" exact component={MarcaDetail}/>
                <Route path="/TarjetaRegaloList" exact component={TarjetaRegaloList}/>
                <Route path="/TarjetaRegaloDetail/:idTarjetaRegalo" exact component={TarjetaRegaloDetail}/>
                <Route path="/Promociones" exact component={Promociones}/>
                <Route path="/PromocionDetail/:idPromocion"exact component={PromocionDetail}/>
                <Route path="/TiendaList" exact component={TiendasList}/>
                <Route path="/MarcaList" exact component={MarcaList}/>
                <Route path="/UsuarioList" exact component={UsuarioList}/>
                <Route path="/UsuarioDetail/:idUsuario" exact component={UsuarioDetail}/>
                <Route path="/FacturaList" exact component={FacturaList}/>
                <Route path="/FacturaDetail/:idFactura" exact component={FacturaDetail}/>


            </div>
        );
    }
}

export default Vista;
