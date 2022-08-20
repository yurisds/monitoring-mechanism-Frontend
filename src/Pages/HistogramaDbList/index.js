import React, { useEffect, useState } from 'react';
import "./style.css"
import HistogramaDbList from '../../components/HistogramaDbList';
import ResponsiveAppBar from '../../components/Common/NavBar';
import { Button, Spin } from 'antd';
import axios from 'axios';
import HistogramaDbTypeTextUsed from '../../components/HistogramaDbTypeTextUsed';
import HistogramaDbTypeNumericUsed from '../../components/HistogramaDbTypeNumericUsed';
import HistogramaDbHoursWorkedAM from '../../components/HistogramaDbHoursWorkedAM';
import HistogramaDbHoursWorkedPM from '../../components/HistogramaDbHoursWorkedPM';

const HistogramaDbListPage = () => {

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
            <div className="site-button-ghost-wrapper">
                <Button type="primary" style={{marginLeft: "5%"}} onClick={ () => handleButton("commands")}>
                    Comandos
                </Button>
                <Button type="primary" style={{marginLeft: "5%"}}  onClick={ () => handleButton("texts")}>
                    Tipos Textuais
                </Button>
                <Button type="primary" style={{marginLeft: "5%"}}  onClick={ () => handleButton("numerics")}>
                    Tipos Numéricos
                </Button>
                <Button type="primary" style={{marginLeft: "5%"}}  onClick={ () => handleButton("HoursWorkedAM")}>
                    Trabalhos no Período da Manhã
                </Button>
                <Button type="primary" style={{marginLeft: "5%"}}  onClick={ () => handleButton("HoursWorkedPM")}>
                    Trabalhos no Período da Noite
                </Button>
            </div>

            

            {isLoading ? (
                <div className="example">
                    <Spin />
                </div>
                ) : 
                (
                <div>

                    {button === "commands" ? (
                        <HistogramaDbList key={list} list={list}/>
                    ): (
                        button === "texts" ? (
                            <HistogramaDbTypeTextUsed key={list} list={list}/>
                        ) : (
                            button === "numerics" ? (
                                <HistogramaDbTypeNumericUsed key={list} list={list}/>
                            ) : (
                                button === "HoursWorkedAM" ? ( 
                                    <HistogramaDbHoursWorkedAM key={list} list={list}/>
                                    ) : (
                                        <HistogramaDbHoursWorkedPM key={list} list={list}/>
                                    )
                            )
                        )
                        
                    )}
                </div>
                )}
            </div>

    );
    
};


export default HistogramaDbListPage;