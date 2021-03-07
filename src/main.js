import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/pages/index'
import './style/base.css'

const root = document.getElementById('root');

// todo redux状态管理热更新 持久化
const start = () => {
    const render = () => ReactDOM.render(<App />, root)
    const renderError = e => {
        const RedBox = require('redbox-react').default
        ReactDOM.render(<RedBox error={e} />, root)
    }
    try {
        render()
    } catch (error) {
        renderError()
    }
}
start()
if (module.hot) {
    module.hot.accept('./pages/index.js', start);
}




