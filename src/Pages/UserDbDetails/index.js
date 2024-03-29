import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useParams  } from 'react-router-dom';
import PageHeader from '../../components/Common/PageHeader';
import "./style.css"
import axios from 'axios';

import { Spin, DatePicker, Form, Radio } from 'antd';

import DbUserDetails from '../../components/DbUserDetails';
import UserGrade from '../../components/UserGrade';
import DbUserCommand from '../../components/DbUserCommand';
import DbUserWorkHours from '../../components/DbUserWorkHours';
import DbUserConstraint from '../../components/DbUserConstraint';

const UserDbDetailsPage = props => {

    const params = useParams();

    const [form] = Form.useForm();

    const api = axios.create({
        baseURL: "https://tcc-backend-bd.herokuapp.com",
    });

    const buttons = {0: "data_type", 1: "worked_hour", 2: "constraint"};

    const [ list, setList ] = useState([]);
    const [ startDate, setStartDate ] = useState(null);
    const [ endDate, setEndDate ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ userStatistics, setUserStatistics ] = useState([]);
    const [count, setCount] = useState(1);
    const [isClickedVision, setIsClickedVision] = useState(false);

    useEffect( () => {
        setIsLoading(true);
        getUserDb();
        getUserStatistics();

    }, [])


    const getUserDb = async () => {
        
        setIsLoading(true);

        const response = await api.get(`/events/${params.userdb}`);

        setList(response.data.array);
        setIsLoading(false);
    }

    const getUserDbByDate = async (values) => {

        setIsLoading(true);

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
        setIsLoading(false);
    }

    const getUserStatistics = async (values) => {
        
      let response;

      let startDate;
      let endDate

      if(values && values.date) {
        startDate = dayjs(values.date[0]).format("YYYY-MM-DDT00:00:00");
        endDate = dayjs(values.date[1]).format("YYYY-MM-DDT23:59:59")
      }

      if(startDate && endDate) {
          response = await api.get(`/statistics/${params.userdb}?initialDate=${startDate}&finalDate=${endDate}`);

      }else{
          response = await api.get(`/statistics/${params.userdb}`);
      }     

      setUserStatistics(response.data);
  }

  const [vision, setVision] = useState('data_type');

  const handleIsClickedVision = (e) => {

    const aux = Object.keys(buttons).find(key => buttons[key] === e.target.value);
    setVision(buttons[aux])
  }


  return (
        <div className='body-user-db-details'>
            <PageHeader name={`User ${params.userdb}`}/>
            <UserGrade name={`${params.userdb}`}></UserGrade>

            <div>

              <div>
                <Form form={form} layout="vertical" name="form" style={{ alignItems: "center", display: "flex", flexDirection: "column", width: "100%", marginTop: "1.5%"}}>
                  <Form.Item key={"date"} name={"date"}>
                      <DatePicker.RangePicker 
                      format={"DD/MM/YYYY"}

                          allowClear={true}
                          onChange={() => {
                              form
                                .validateFields()
                                .then((values) => {
                                  getUserDbByDate(values);
                                  getUserStatistics(values);
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

            <div className="wrapper">
                <div></div>

                <div className="table">

                    <h2>Registros dos comandos SQL</h2>
                    {isLoading ? (
                      <div className="example">
                          <Spin />
                      </div>
                    ) : 
                    (
                      <DbUserCommand list={list}/>
                    )}

                </div>
            
                <div className="teste">

                    <div className='carousel-button'> 

                        <Radio.Group value={vision} style={{display: 'flex', flexDirection: 'row'}}>
                            <Radio.Button value="data_type" onClick={handleIsClickedVision} style={{marginRight: "5px", marginLeft: "5px"}}>1</Radio.Button>
                            <Radio.Button value="worked_hour" onClick={handleIsClickedVision} style={{marginLeft: "5px", marginRight: "5px"}}>2</Radio.Button>
                            <Radio.Button value="constraint" onClick={handleIsClickedVision} style={{marginLeft: "5px", marginRight: "5px"}}>3</Radio.Button>
                        </Radio.Group>
                        
                    </div>

                    {vision === "data_type" ? (
                      <DbUserDetails key={`${startDate}-${endDate}`} userStatistics={userStatistics}/>
                    ): (
                      vision === "worked_hour" ? (
                        <DbUserWorkHours key={`${startDate}-${endDate}`} userStatistics={userStatistics}/>
                      ): (
                        <DbUserConstraint key={`${startDate}-${endDate}`} userStatistics={userStatistics}/>
                      )
                    )
                    }
                    

                </div> 

                <div></div>

            </div>
        </div>
    );
};


export default UserDbDetailsPage;