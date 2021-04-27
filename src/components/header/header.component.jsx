import React from 'react'
import './header.styles.scss';
import SearchIcon from '@material-ui/icons/Search';
import {ReactComponent as ReactLogo} from './Search.svg';

const Header = ()=>{
    return(
        <div className="header">
            <h1 className="title">Bank Search</h1>
            <div className="container">
                <div class="dot"><ReactLogo></ReactLogo></div>
            </div>
        </div>
    )
}
export default Header