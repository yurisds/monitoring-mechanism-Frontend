import React, { useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import PageHeader from '../../components/Common/PageHeader';
import axios from 'axios';
import { Button } from 'antd';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserDbDetailsPage = props => {

    const navigate = useNavigate();
    const params = useParams();

    const api = axios.create({
        baseURL: "http://localhost:3003",
    });

    const [ list, setList ] = useState([]);

    useEffect( () => {
        getUserDb();

        console.log(list)
    }, [])


    const getUserDb = async () => {
        
        const response = await api.get(`/events/${params.userdb}`);

        setList(response.data.array);

    }

    return (
        <div>
            <PageHeader name={`${params.userdb}`}/>
            <Button onClick={() => navigate('/statistics')} type="primary" htmlType="submit"> Voltar </Button>

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
                        {list.map((row) => (
                            <TableRow
                            key={row.event_name}
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
    );
};


export default UserDbDetailsPage;