import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { Table, Spin  } from 'antd';
import dayjs from 'dayjs';
import { Button, DatePicker, Form } from 'antd';
import "./style.css"

const DbList = props => {

    const navigate = useNavigate(); 

    const minMetric = 20;
    const maxMetric = 100;

    const [form] = Form.useForm();

    const [ startDate, setStartDate ] = useState(null);
    const [ endDate, setEndDate ] = useState(null);

    const columns = [
        {
          title: 'Nome',
          dataIndex: 'db_name',
          key: 'db_name',
        },
        {
            title: 'Create',
            dataIndex: 'create_table',
            key: 'create_table',
            render: (qtt) => {
                if(qtt < minMetric) {
                    return <div style={{color:'red', fontWeight:"bold" }}> {qtt} </div>
                }else if (qtt > maxMetric)  {
                    return <div style={{color:'green', fontWeight:"bold" }}> {qtt} </div>
                }else {
                    return <div style={{color:'blue', fontWeight:"bold"}}> {qtt} </div>
                }
            },
        },
        {
            title: 'Drop',
            dataIndex: 'drop_table',
            key: 'drop_table',
            render: (qtt) => {
                if(qtt < minMetric) {
                    return <div style={{color:'red', fontWeight:"bold" }}> {qtt} </div>
                }else if (qtt > maxMetric)  {
                    return <div style={{color:'green', fontWeight:"bold" }}> {qtt} </div>
                }else {
                    return <div style={{color:'blue', fontWeight:"bold"}}> {qtt} </div>
                }
            },
        },
        {
            title: 'Alter',
            dataIndex: 'alter_table',
            key: 'alter_table',
            render: (qtt) => {
                if(qtt < minMetric) {
                    return <div style={{color:'red', fontWeight:"bold" }}> {qtt} </div>
                }else if (qtt > maxMetric)  {
                    return <div style={{color:'green', fontWeight:"bold" }}> {qtt} </div>
                }else {
                    return <div style={{color:'blue', fontWeight:"bold"}}> {qtt} </div>
                }
            },
        },
        {
            title: 'Insert',
            dataIndex: 'insert',
            key: 'insert',
            render: (qtt) => {
                if(qtt < minMetric) {
                    return <div style={{color:'red', fontWeight:"bold" }}> {qtt} </div>
                }else if (qtt > maxMetric)  {
                    return <div style={{color:'green', fontWeight:"bold" }}> {qtt} </div>
                }else {
                    return <div style={{color:'blue', fontWeight:"bold"}}> {qtt} </div>
                }
            },
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (qtt) => {
                if(qtt < minMetric) {
                    return <div style={{color:'red', fontWeight:"bold" }}> {qtt} </div>
                }else if (qtt > maxMetric)  {
                    return <div style={{color:'green', fontWeight:"bold" }}> {qtt} </div>
                }else {
                    return <div style={{color:'blue', fontWeight:"bold"}}> {qtt} </div>
                }
            },
        },
        {
            title: 'Update',
            dataIndex: 'update',
            key: 'update',
            render: (qtt) => {
                if(qtt < minMetric) {
                    return <div style={{color:'red', fontWeight:"bold" }}> {qtt} </div>
                }else if (qtt > maxMetric)  {
                    return <div style={{color:'green', fontWeight:"bold" }}> {qtt} </div>
                }else {
                    return <div style={{color:'blue', fontWeight:"bold"}}> {qtt} </div>
                }
            },
        },
        {
            title: 'Study Sessions',
            dataIndex: 'studySessions',
            key: 'studySessions',
            render: (qtt) => {

                return <div style={{color:'black', fontWeight:"bold"}}> {qtt} </div>

            },
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (e) => <a onClick={ () => {navigate(`/statistics/${e.db_name}`)}}>Detalhes</a>,
          },
    ];

    const api = axios.create({
        baseURL: "http://localhost:3003",
      });
    

    const [ list, setList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect( () => {
        setIsLoading(true);
        getDbList({});
       
    }, [])


    const getDbList = async (values) => {

        setIsLoading(true);

        let response;

        if(!values.date) {
            setStartDate(null);
            setEndDate(null);
            response = await api.get(`/statistics`);

        } else{

            setStartDate(dayjs(values.date[0]).format("YYYY-MM-DDT00:00:00"));
            setEndDate(dayjs(values.date[1]).format("YYYY-MM-DDT23:59:59"));

            const startDate = dayjs(values.date[0]).format("YYYY-MM-DDT00:00:00");
            const endDate = dayjs(values.date[1]).format("YYYY-MM-DDT23:59:59")

            if(startDate && endDate){
                response = await api.get(`/statistics?initialDate=${startDate}&finalDate=${endDate}`);
            }else {
                response = await api.get(`/statistics`);
            }

        }  

        setList(response.data);
        setIsLoading(false);
    }

    return (
        <div>

            <div>
                <Form form={form} layout="vertical" name="form">
                    <Form.Item key={"date"} name={"date"}>
                        <DatePicker.RangePicker
                        format={"DD/MM/YYYY"}
                            style={{
                                width: '40%',
                            }}
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

            {isLoading ? (
                <div className="example">
                    <Spin />
                </div>
            ) : 
            (
            <Table pagination={false} dataSource={list} columns={columns} />)
            
        }
            
            
        </div>
    );
};



export default DbList;