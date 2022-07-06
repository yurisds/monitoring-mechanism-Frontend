import React, { useEffect, useState, useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { Table, Spin  } from 'antd';
import dayjs from 'dayjs';
import { Button, DatePicker, Form, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import "./style.css"

const DbList = props => {

    const navigate = useNavigate(); 

    const minMetric = 20;
    const maxMetric = 100;

    const [form] = Form.useForm();

    const [ startDate, setStartDate ] = useState(null);
    const [ endDate, setEndDate ] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 8,
            }}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1890ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) => {
            if(record[dataIndex]) {
                return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            }
        },
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });

    const columns = [
        {
          title: 'Nome',
          dataIndex: 'db_name',
          key: 'db_name',
          ...getColumnSearchProps('db_name'),
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
            title: 'Atenção',
            dataIndex: 'percentual_create_alter',
            key: 'percentual_create_alter',
            render: (qtt) => {

                if (qtt > 0.80)  {
                    return <div style={{color:'green', fontWeight:"bold" }}> OK </div>
                }else {
                    return <div style={{color:'red', fontWeight:"bold"}}> Risco </div>
                }
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
        //baseURL: "https://tcc-backend-bd.herokuapp.com",
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
                <Form form={form} layout="vertical" name="form" style={{ alignItems: "center", display: "flex", flexDirection: "column", width: "100%", marginTop: "1.5%"}}>
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
            <div className='table-db-List'>
                {isLoading ? (
                    <div className="example">
                        <Spin />
                    </div>
                    ) : 
                    (
                        <Table 
                            scroll={{
                                y: "46.5rem",
                            }}
                            summary={() => (<Table.Summary fixed={'top'}>
                            
                                            </Table.Summary>)}
                            pagination={false} dataSource={list} columns={columns} />
                    )
                
                }
            </div>
            
        </div>
    );
};



export default DbList;