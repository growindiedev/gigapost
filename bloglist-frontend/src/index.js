import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './App'
import './styles.css'
import {store} from './store'
import {BrowserRouter as Router} from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react"



ReactDOM.render(
    <ChakraProvider >

    <Provider store={store}>
                <Router>

                    <App />

                </Router>
    </Provider>
    </ChakraProvider >

, document.getElementById('root'))