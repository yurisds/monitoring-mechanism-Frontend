import React, { useEffect, useState } from 'react';
import "./style.css"
import ResponsiveAppBar from '../../components/Common/NavBar';

import axios from 'axios';
import { Spin } from 'antd';
import CorrelationList from '../../components/CorrelationList';


const Correlation = () => {

    const api = axios.create({
        baseURL: "https://tcc-backend-bd.herokuapp.com",
    });

    const [button, setButton ] = useState("commands");

    const [ list, setList ] = useState([]);

    const [ isLoading, setIsLoading ] = useState(true);

    useEffect( () => {
        getDbList();
    }, [])
    
    const getDbList = async () => {

        setIsLoading(true);

        const response = await api.get("/statistics");

        setList(response.data)

        setIsLoading(false);

    }

    const handleButton = (e) => {
        setButton(e);
    }

    return (
        <div>
            <ResponsiveAppBar/>

            {isLoading ? (
                <div className="example">
                    <Spin />
                </div>
                ) : 
                (

                    <CorrelationList key={list} list={list}/>
                )}

        </div>
    );
};


export default Correlation;