// var config = require('./config.json');
// module.exports = function() {
//    var greet = document.createElement('div');
//    greet.textContent = config.greetText;
//    return greet;
// };

//以下使用ES6的语法
import React, {Component} from 'react';
import config from './config.json';

import styles from './Greeter.css';

class Greeter extends Component{
    render(){
        return (
            // 使用cssModule添加类名的方法
            <div className={styles.root}>
                {config.greetText}
            </div>
        );
    }
}

export default Greeter