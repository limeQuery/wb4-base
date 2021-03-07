
import React, { lazy, Suspense } from 'react'
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";


export default function App(props) {

    // 预加载
    const AsyncHome = asyncImport(() => import(/* webpackChunkName: "Home", webpackPrefetch:true */'@/pages/Home'))
    const AsyncSearch = asyncImport(() => import(/* webpackChunkName: "Search", webpackPrefetch:true */'@/pages/Search'))




    return (
        <Router>
            <Switch>
                <Route exact path='/' component={AsyncHome} />
                <Route exact path='/search' component={AsyncSearch} />
            </Switch>
        </Router>
    )
}


// react 自带懒加载
function asyncImport(importFn) {
    const LazyComponent = lazy(importFn)
    return () => (
        <Suspense fallback={<div>loading...</div>}>
            <LazyComponent />
        </Suspense>
    )
}