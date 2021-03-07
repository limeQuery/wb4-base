import React, { useState } from 'react'

function Search(props) {
    const [count, setCount] = useState(0)
    return (
        <div>
            <p>this is a search page!</p>
            <div> num: {count}</div>
        </div>
    )
}

export default React.memo(Search)