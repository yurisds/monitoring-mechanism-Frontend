import React, { useEffect, useState } from 'react';
import "./style.css"
import HistogramaDbList from '../../components/HistogramaDbList';
import ResponsiveAppBar from '../../components/Common/NavBar';
import { Button, Spin, Form, DatePicker } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import HistogramaDbTypeTextUsed from '../../components/HistogramaDbTypeTextUsed';
import HistogramaDbTypeNumericUsed from '../../components/HistogramaDbTypeNumericUsed';
import HistogramaDbHoursWorkedAM from '../../components/HistogramaDbHoursWorkedAM';
import HistogramaDbHoursWorkedPM from '../../components/HistogramaDbHoursWorkedPM';

const HistogramaDbListPage = () => {

    const api = axios.create({
        baseURL: "https://tcc-backend-bd.herokuapp.com",
    });

    const [button, setButton ] = useState("commands");

    const [form] = Form.useForm();

    const [ list, setList ] = useState([]);

    const [ isLoading, setIsLoading ] = useState(true);

    useEffect( () => {
        getDbList({});
    }, [])
    
    const getDbList = async (values) => {

        setIsLoading(true);

        let response;

        if(!values.date) {

            response = await api.get(`/statistics`);

        } else{

            const startDate = dayjs(values.date[0]).format("YYYY-MM-DDT00:00:00");
            const endDate = dayjs(values.date[1]).format("YYYY-MM-DDT23:59:59")

            if(startDate && endDate){
                response = await api.get(`/statistics?initialDate=${startDate}&finalDate=${endDate}`);
            }else {
                response = await api.get(`/statistics`);
            }

        }  

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
                    Uso do Banco no Período da Manhã
                </Button>
                <Button type="primary" style={{marginLeft: "5%"}}  onClick={ () => handleButton("HoursWorkedPM")}>
                    Uso do Banco no Período da Noite
                </Button>

                <div style={{marginTop: '-5%'}}>
                <Form form={form} layout="vertical" name="form" style={{ marginLeft: "25%", alignItems: "left", display: "flex", flexDirection: "column", width: "100%"}}>
                    <Form.Item key={"date"} name={"date"}>
                        <DatePicker.RangePicker
                        format={"DD/MM/YYYY"}
                            allowClear={true}
                            onChange={() => {
                                form
                                .validateFields()
                                .then((values) => {
                                    getDbList(values);
                                })
                                .catch((info) => {
                                    console.log('Validate Failed:', info);
                                });

                            }}
                        />
                    </Form.Item>
                </Form>
            </div>

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