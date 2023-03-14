import React, { useContext } from 'react'
import { Navigate} from 'react-router-dom'
import { AuthContext } from './context/AuthContext';

const RedirectRoute = ({Component}) => {
    const {session} = useContext(AuthContext);
    return session.isLogin == false ? <Component/> : <Navigate to='/'/>
}

export default RedirectRoute