import React, { useState, useRef } from 'react';
import "./style.css"
import { Button, Input, Space, Table  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const DbUserCommand = ({list}) => {

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
            title: 'Evento',
            dataIndex: 'event_name',
            key: 'event_name',
            ...getColumnSearchProps('event_name'),
            render: (text) => {

              return <div style={{textAlign: 'center'}}> {text} </div>

            },
            align: 'center',
            width: "15%",
        },
        {
            title: 'SQL',
            dataIndex: 'current_query',
            key: 'current_query',
            ...getColumnSearchProps('current_query'),
            render: (text) => {

                return <div style={{textAlign: 'center', fontWeight:"bold"}}> {text} </div>

            },
            align: 'center',
            width: "60%",
        },
        {
            title: 'Data',
            dataIndex: 'date_time',
            key: 'date_time',
            render: (text) => {

              return <div style={{textAlign: 'center'}}> {text} </div>

            },
            align: 'center',
            width: "25%",
        },
      ]

    return (
        
        <Table 
          scroll={{
            y: 615,
          }}
          summary={() => (<Table.Summary fixed={'top'}>
            
             </Table.Summary>)}
          
          pagination={false} dataSource={list} columns={columns} />

    );
};



export default DbUserCommand;