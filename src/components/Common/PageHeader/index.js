import * as React from 'react';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

const PageHeader = props => {

    return (
        <Layout>
            <Header
            style={{
                zIndex: 1,
                width: '100%',
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center',
                alignContent: 'center'

              }}
            >
                <Menu
                theme="dark"
                mode="horizontal"
                >  
                {props.name.toUpperCase()}
                </Menu> 
            </Header>

        </Layout>

    );
};

export default PageHeader;