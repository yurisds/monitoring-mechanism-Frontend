import React, { useEffect, useState, useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { Table, Spin,Tabs  } from 'antd';
import dayjs from 'dayjs';
import { Button, DatePicker, Form, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import "./style.css"

const DbList = props => {
    const { TabPane } = Tabs;

    const navigate = useNavigate(); 

    const minMetric = 20;
    const maxMetric = 100;

    const api = axios.create({
        //baseURL: "https://tcc-backend-bd.herokuapp.com",
        baseURL: "https://tcc-backend-bd.herokuapp.com",
      });
    

    const [ list, setList ] = useState([]);
    const [ gradeList, setGradeList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ viewTable, setViewTable ] = useState(true);

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

    const columnsGrade = [
        {
          title: 'Nome',
          dataIndex: 'db_name',
          key: 'db_name',
          ...getColumnSearchProps('db_name'),
        },
        {
            title: 'Nª Quizzes',
            dataIndex: 'quizzes',
            key: 'quizzes',
            render: (qtt) => {
                if(parseFloat(qtt) < 4.00) {
                    return <div style={{color:'red', fontWeight:"bold" }}> {qtt} </div>
                }else if (parseFloat(qtt) > 7.00)  {
                    return <div style={{color:'green', fontWeight:"bold" }}> {qtt} </div>
                }else {
                    return <div style={{color:'black', fontWeight:"bold"}}> {qtt} </div>
                }
            },
        },
        {
            title: 'Nª Prova 1',
            dataIndex: 'prova1',
            key: 'prova1',
            render: (qtt) => {
                if(parseFloat(qtt) < 4.00) {
                    return <div style={{color:'red', fontWeight:"bold" }}> {qtt} </div>
                }else if (parseFloat(qtt) > 7.00)  {
                    return <div style={{color:'green', fontWeight:"bold" }}> {qtt} </div>
                }else {
                    return <div style={{color:'black', fontWeight:"bold"}}> {qtt} </div>
                }
            },
        },
        {
            title: 'Nª Prova 2',
            dataIndex: 'prova2',
            key: 'prova2',
            render: (qtt) => {
                if(parseFloat(qtt) < 4.00) {
                    return <div style={{color:'red', fontWeight:"bold" }}> {qtt} </div>
                }else if (parseFloat(qtt) > 7.00)  {
                    return <div style={{color:'green', fontWeight:"bold" }}> {qtt} </div>
                }else {
                    return <div style={{color:'black', fontWeight:"bold"}}> {qtt} </div>
                }
            },
        },
        {
            title: 'Média',
            dataIndex: 'media',
            key: 'media',
            render: (qtt) => {
                if(parseFloat(qtt) < 4.00) {
                    return <div style={{color:'red', fontWeight:"bold" }}> {qtt} </div>
                }else if (parseFloat(qtt) > 7.00)  {
                    return <div style={{color:'green', fontWeight:"bold" }}> {qtt} </div>
                }else {
                    return <div style={{color:'black', fontWeight:"bold"}}> {qtt} </div>
                }
            },
        },
        {
            title: 'Nª Prova Final',
            dataIndex: 'provaFinal',
            key: 'provaFinal',
        },
        {
            title: 'Nª Final',
            dataIndex: 'notaFinal',
            key: 'notaFinal',
            render: (qtt) => {
                if(parseFloat(qtt) < 4.00) {
                    return <div style={{color:'red', fontWeight:"bold" }}> {qtt} </div>
                }else if (parseFloat(qtt) > 7.00)  {
                    return <div style={{color:'green', fontWeight:"bold" }}> {qtt} </div>
                }else {
                    return <div style={{color:'black', fontWeight:"bold"}}> {qtt} </div>
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

    useEffect( () => {
        setIsLoading(true);
        getBdGradeList();
        setIsLoading(false);

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

        const result = response.data.map((r) => {
            return {
                ...r,
                ...gradeList[r.db_name]
            }
        })

        setList(result);
        setIsLoading(false);
    }

    const getBdGradeList = async () => {

        const [responseGrade, responseBd] = await Promise.all([await api.get(`/grade`), await api.get(`/statistics`)]);

        const result = responseBd.data.map((r) => {
            return {
                ...r,
                ...responseGrade.data[r.db_name]
            }
        })

        setList(result);
        setGradeList(responseGrade.data);
    }

    const onChange = () => {
        setViewTable(!viewTable);
    };

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
            <Tabs onChange={onChange} type="card" style={{marginLeft: "5%", marginRight: "5%"}}>
                <TabPane tab="Comandos" key="1">
                </TabPane>
                <TabPane tab="Notas" key="2">
                </TabPane>
            </Tabs>
            <div className='table-db-List'>
                {isLoading ? (
                    <div className="example">
                        <Spin />
                    </div>
                    ) : 
                        (   viewTable ? (
                            <Table 
                            scroll={{
                                y: "41.5rem",
                            }}
                            summary={() => (<Table.Summary fixed={'top'}>
                            
                                            </Table.Summary>)}
                            pagination={false} dataSource={list} columns={columns} />
                        ) : (
                                <Table 
                                scroll={{
                                    y: "41.5rem",
                                }}
                                summary={() => (<Table.Summary fixed={'top'}>
                                
                                                </Table.Summary>)}
                                pagination={false} dataSource={list} columns={columnsGrade} />
                            )

                    )
                
                }
            </div>
            
        </div>
    );
};



export default DbList;