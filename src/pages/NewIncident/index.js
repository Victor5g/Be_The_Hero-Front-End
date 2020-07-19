import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowDownLeft} from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import LogoImg from '../../assets/logo.svg';

export default function NewIncidents(){
    //salvar dados do fomr
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');// Pega o IDsalvo no navegador


    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        };
        
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            
            
          history.push('/profile');

        } catch (err) {
            alert('Error ao cadastrar caso');
        }
    }

 return(
    <div className="new-incident-container">
    <div className="content">
        <section>
        <img src={LogoImg} alt = "Be the Hero"></img>

        <h1>Cadastrar novo Caso</h1>
        <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso</p>

        <Link className="back-link" to="/profile">
           <FiArrowDownLeft size={16} color="#E02041"/>Voltar para Home
        </Link>

        </section>
        <form onSubmit={handleNewIncident}>
            <input
             placeholder="Titulo do caso" 
             value={title}
             onChange={e=>setTitle(e.target.value)}
             />

            <textarea 
            placeholder="Descrição" 
            value={description}
            onChange={e => setDescription(e.target.value)}
            />

            <input 
            placeholder="Valor em reais"
            value={value}
             onChange={e => setValue(e.target.value)}
            />
            
            <button className="button" type="submit">Cadastrar</button>
            

        </form>
    </div>
</div>

 );
}