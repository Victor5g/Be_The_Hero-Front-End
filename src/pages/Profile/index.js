import React,{useState,useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';
import api from '../../services/api';

import './style.css';

export default function Profile(){
    //Pegando nome e id da ong salvo no navegador pelo logon.
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history= useHistory();
    
    //---------------------
    const [incidents, setIncidents] = useState([]);
//Listar os casos do banco de dados-------------;
    useEffect(()=>{
        api.get('incidents', {
            headers:{
                Authorization: ongId,
            }
        }).then(response=> {
            setIncidents(response.data);
    })
   },[ongId]);

   async function handleDeleteIncident(id){
       try {
           await api.delete(`incidents/${id}`,
           {headers:{
              Authorization: ongId,
           }
        });

        setIncidents(incidents.filter(incident=>incident.id !== id ));
           
       } catch (err) {
           alert('Error ao deletar caso, tente novamente');
           
       }

   }
//Para o usuario sair e remover os dados do chrome(Local Storage)
   function heandleLogout(){
       localStorage.clear();

       history.push('/');//Redirecionar usuario para tela de login
   }

//------------------------------------------
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                 <span> Bem vinda, {ongName}</span>

                <Link className="button" to="/newIcident"> Cadastrar Novo Caso</Link>
                <button onClick={heandleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
               {incidents.map(incident=>( 
               <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRICÂO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</p>

                    <button onClick={()=>handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );   
}