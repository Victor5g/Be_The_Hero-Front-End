import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import { FiArrowLeft} from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg';


import api from '../../services/api';
//pegar dados do furmulario----------------------------
export default function Register(){
    const[name, setName] = useState();
    const[email, setEmail] = useState();
    const[whatsapp, setWhatsapp] = useState();
    const[city, setCity] = useState();
    const[uf, setUF] = useState();

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

      try {

        const response = await api.post('ongs', data);




        
        alert(`Seu ID de acesso: ${response.data.id}`);
        history.push('/');

      } catch (err) {
          alert('Error no cadastro tente novamente');
          
          
      }
    }

    return(
    <div className="register-container">
        <div className="content">
            <section>
            <img src={LogoImg} alt = "Be the Hero"></img>

            <h1>Cadastro</h1>
            <p>Faca Seu cadastro, entre na plataforma e ajude as pessoas a encontrarem seu casos</p>

            <Link className="back-link" to="/">
               <FiArrowLeft size={16} color="#E02041"/>Tenho Cadastro
            </Link>

            </section>
            <form onSubmit={handleRegister}>

                <input placeholder="Nome da Ong"
                 value={name} 
                 onChange={e=>setName(e.target.value)}/>


                <input type="email" placeholder="E-Mail"  
                value={email} 
                onChange={e=>setEmail(e.target.value)}/>


                <input placeholder="Whatsapp" 
                value={whatsapp} 
                onChange={e=>setWhatsapp(e.target.value)} />


                <div ClassName="Input-group">

                <input placeholder="Cidade" 
                value={city} 
                onChange={e=>setCity(e.target.value)}/>


                <input placeholder="UF" style={{width: 80}} 
                value={uf} 
                onChange={e=>setUF(e.target.value)}/>

                </div>

                <button className="button" type="submit">Cadastrar</button>
                
            </form>
        </div>
    </div>
    );
}
