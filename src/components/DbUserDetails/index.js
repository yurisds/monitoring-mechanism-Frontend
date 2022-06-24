import React, { useEffect, useState } from 'react';
import "./style.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Plot from 'react-plotly.js';

const DbUserDetails = ({startDate, endDate}) => {

    const params = useParams();

    const api = axios.create({
        baseURL: "http://localhost:3003",
    });

    const [ userStatistics, setUserStatistics ] = useState([]); 

    useEffect( () => {
        getUserStatistics();
    }, [])


    const getUserStatistics = async () => {
        
        let response;

        if(startDate && endDate) {
            response = await api.get(`/statistics/${params.userdb}?initialDate=${startDate}&finalDate=${endDate}`);
        }else{
            response = await api.get(`/statistics/${params.userdb}`);
        }     

        setUserStatistics(response.data);
    }


    return (
        <div className="body">
           <p>Sessões de Estudos: {userStatistics.studySessions}</p>
           <p>Quantidade de Criação de Tabelas: {userStatistics.create_table}</p>
           <p>Quantidade de Remoção de Tabelas: {userStatistics.drop_table}</p>
           <p>Quantidade de Atualização de Tabelas: {userStatistics.alter_table}</p>
           <p>Quantidade de Inserção de Dados: {userStatistics.insert}</p>
           <p>Quantidade de Remoção de Dados: {userStatistics.delete}</p>
           <p>Quantidade de Atualização de Dados: {userStatistics.update}</p>
            
           <Plot
                data={[

                {type: 'bar', x:[1], y: [userStatistics.varchar_type], name: "VARCHAR"},
                {type: 'bar', x:[2],  y: [userStatistics.text_type], name: "TEXT"},
                {type: 'bar', x:[3],  y: [userStatistics.integer_type], name: "INTEGER"},
                {type: 'bar', x:[4],  y: [userStatistics.smallint_type], name: "SMALLINT"},
                {type: 'bar', x:[5],  y: [userStatistics.char_type], name: "CHAR"},
                {type: 'bar', x:[6],  y: [userStatistics.date_type], name: "DATE"},
                {type: 'bar', x:[7],  y: [userStatistics.numeric_type], name: "NUMERIC"},
                {type: 'bar', x:[8],  y: [userStatistics.boolean_type], name: "BOOLEAN"},
                {type: 'bar', x:[9],  y: [userStatistics.bigint_type], name: "BIGINT"},


                ]}
                layout={ {width: 480, height: 400, title: 'Tipos de dados'} }
            />

        </div>
    );
};



export default DbUserDetails;