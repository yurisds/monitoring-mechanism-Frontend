import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams  } from 'react-router-dom';
import PageHeader from '../../components/Common/PageHeader';
import "./style.css"
import axios from 'axios';
import { Button, DatePicker, Form } from 'antd';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DbUserDetails from '../../components/DbUserDetails';

const UserDbDetailsPage = props => {

    const navigate = useNavigate();
    const params = useParams();

    const [form] = Form.useForm();

    const api = axios.create({
        baseURL: "https://tcc-backend-bd.herokuapp.com",
    });

    const [ list, setList ] = useState([]);
    const [ startDate, setStartDate ] = useState(null);
    const [ endDate, setEndDate ] = useState(null);

    useEffect( () => {
        getUserDb();
    }, [])


    const getUserDb = async () => {
        
        const response = await api.get(`/events/${params.userdb}`);

        setList(response.data.array);

    }

    const getUserDbByDate = async (values) => {

        let response;

        if(!values.date) {
            setStartDate(null);
            setEndDate(null);
            response = await api.get(`/events/${params.userdb}`);

        } else {

            setStartDate(dayjs(values.date[0]).format("YYYY-MM-DDT00:00:00"));
            setEndDate(dayjs(values.date[1]).format("YYYY-MM-DDT23:59:59"));

            const startDate = dayjs(values.date[0]).format("YYYY-MM-DDT00:00:00");
            const endDate = dayjs(values.date[1]).format("YYYY-MM-DDT23:59:59")

            if(startDate && endDate){
                response = await api.get(`/events/${params.userdb}?initialDate=${startDate}&finalDate=${endDate}`);
            }else {
                response = await api.get(`/events/${params.userdb}`);
            }

        }

        setList(response.data.array);
    }


    return (
        <div>
            <PageHeader name={`${params.userdb}`}/>
            <Button onClick={() => navigate('/statistics')} type="primary" htmlType="submit"> Voltar </Button>

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
                                getUserDbByDate(values);
                              })
                              .catch((info) => {
                                console.log('Validate Failed:', info);
                              });
            
                          }}
                    />
                </Form.Item>
              </Form>
            </div>

            {/* <Button
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    getUserDbByDate(values);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                  });

              }}

            >
              Filtrar
            </Button> */}
          </div>


            <div className="wrapper">
                <div></div>

                <div className="table">

                    <h2>Registros dos comandos SQL</h2>

                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>

                            <TableCell align="center">Evento</TableCell>
                            <TableCell align="center">SQL</TableCell>
                            <TableCell align="center">Data</TableCell>

                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((row, index) => (
                                <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">{row.event_name}</TableCell>
                                <TableCell align="center">{row.current_query}</TableCell>
                                <TableCell align="center">{row.date_time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>

                </div>
                    <div className="teste">
                    <DbUserDetails key={`${startDate}-${endDate}`} name={`${params.userdb}`} startDate={startDate} endDate={endDate}/>
                </div> 


            </div>
        </div>
    );
};


export default UserDbDetailsPage;