import React from 'react';
import styles from './Button.module.css'

const ButtonComponent = ({background, top, left, sign, click}) => {
    return (
        <div 
            className={styles.wrapp}
            style={{
                background: background,
                top: `${top}px`,
                left: `${left}px`
            }}
            onClick={() => click()}
        >
            {sign}
        </div>
    );
}

export default ButtonComponent;
