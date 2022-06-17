import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';

const DbList = props => {

    const navigate = useNavigate(); 

    const minMetric = 20;
    const maxMetric = 100;

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

    useEffect( () => {
        getDbList();
    }, [])


    const getDbList = async () => {


        const response = await api.get("/statistics");

        setList(response.data);

    }

    return (
        <div>
            <Table pagination={false} dataSource={list} columns={columns}  onClick={() => {console.log("teste")}} />
            
        </div>
    );
};



export default DbList;