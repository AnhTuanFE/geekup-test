import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import vnVN from 'antd/locale/vi_VN';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <React.StrictMode>
            <ConfigProvider locale={vnVN}>
                <App />
            </ConfigProvider>
        </React.StrictMode>
    </Router>,
);

reportWebVitals();
