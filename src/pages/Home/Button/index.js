
import React from 'react'
import Style from './index.less'
import Css from './index.css'


function Button(props) {
    console.log('.....render Button')
    const [test, setTest] = React.useState(100)

    return (
        <div>
            <button className={Css['css-btn'] + ' btn'}>{'按钮组件=>' + props.children + ',' + test}</button>
        </div>
    )
}

export default React.memo(Button)