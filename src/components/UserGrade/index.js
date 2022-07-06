import React, { useEffect, useState } from 'react';
import "./style.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserGrade = ({name}) => {

    const params = useParams();

    const api = axios.create({
        baseURL: "http://localhost:3003",
    });

    const [ userGrade, setUserGrade ] = useState([]); 

    useEffect( () => {
        getUserGrade();
    }, [])


    const getUserGrade = async () => {
        
        let response = await api.get(`/grade/${name}`);
         
        setUserGrade(response.data);
    }


    return (
        <div className="userGradeBody">
           <div className='userGradeSentence'>Média dos Quizzes: {userGrade.quizzes}</div>
           <div className='userGradeSentence'>Nota da Prova 1: {userGrade.prova1}</div>
           <div className='userGradeSentence'>Nota da Prova 2: {userGrade.prova2}</div>
           <div className='userGradeSentence'>Média geral: {userGrade.media}</div>
           <div className='userGradeSentence'>Nota da Prova Final: {userGrade.provaFinal}</div>
           <div className='userGradeSentence'>Nota Final: {userGrade.notaFinal}</div>

        </div>
    );
};



export default UserGrade;