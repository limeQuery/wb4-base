import React from 'react'
import Button from './Button'
import style from './index.less'

export default function Home() {

    const [list, setList] = React.useState([
        { id: 1, name: 'lime', age: 18 },
        { id: 2, name: 'fiber', age: 3 },
        { id: 3, name: 'luxi', age: 108 },
        { id: 4, name: 'test', age: 18 },
    ])

    const change = () => {
        setList([
            { id: 1, name: 'lime', age: 18 },
            { id: 2, name: 'fiber', age: 3 },
            { id: 3, name: '达尔文', age: 108 },
            { id: 4, name: 'test', age: 18 },
        ])
    }



    return (
        <div>
            <p>Home</p>
            <h4>lime</h4>
            {/* <button className='btn'>确定</button> */}
            {/* <Button /> */}
            <ul>
                {list.map((v, i) => (
                    <li key={v.id}><Button>{v.name}</Button></li>
                ))}
            </ul>
            <button onClick={change}>打乱</button>

            {/* <div>
                <h4> home img</h4>
                <img src="./assets/logo192.png" alt="" />
                <img src="./assets/logo512.png" alt="" />
            </div>
            <div>
                <h4> home bg</h4>
                <div className={style.bg192}></div>
                <div className={style.bg512}></div>
            </div>
            <div>
                <h4> home require</h4>
                <img style={{ width: '200px', height: '200px' }} src={require('./assets/logo192.png').default} alt="" />
                <img style={{ width: '200px', height: '200px' }} src={require('./assets/logo512.png').default} alt="" />
            </div> */}
        </div>
    )
}
