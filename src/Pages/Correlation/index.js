import React, { useEffect, useState } from 'react';
import "./style.css"
import ResponsiveAppBar from '../../components/Common/NavBar';

import axios from 'axios';
import CorrelationList from '../../components/CorrelationList';


const Correlation = () => {

    const api = axios.create({
        baseURL: "http://localhost:3003",
    });

    const [button, setButton ] = useState("commands");

    const [ list, setList ] = useState([]);

    useEffect( () => {
        getDbList();
    }, [])
    
    const getDbList = async () => {

        const response = await api.get("/statistics");

        setList(response.data)
    }

    const handleButton = (e) => {
        setButton(e);
    }

    return (
        <div>
            <ResponsiveAppBar/>


                <CorrelationList key={list} list={list}/>


        </div>
    );
};


export default Correlation;