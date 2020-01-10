import React, { Component } from 'react';

import '../css/tr-style.css';
import {Link} from 'react-router-dom';
import {FormattedMessage} from "react-intl";
class TarjetaRegalo extends Component{
  render(){
  return(
    <div className="card text-center">

      <div className="overflow">
        <img className='card-img-top' src={this.props.data.plantilla} alt='Image1'/>

      </div>
        <div className="overflow">
            <br/>
      <Link to={{
        pathname:"/TarjetaRegaloDetail/"+this.props.data.id,
      }}  className="btn3" data={this.props.data}><FormattedMessage id="MoreDetails"/><span className="bg"></span></Link>
        </div>
      </div>
  );
}
}
export default TarjetaRegalo;
