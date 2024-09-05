import React from 'react';
import styles from './Heroes.module.css'
import { observer } from 'mobx-react-lite';
import { sizes } from '../../utils/consts.js';

const HeroesComponent = ({x, y, background, one}) => {
    return (
        <div 
            className={styles.wrapp}
            style={{
                top: `${y}px`,
               left: `${x}px`,
                background: background,
                width: `${sizes.width}px`,
                height: `${sizes.height}px`
            }}
        >
        </div>
    );
}

export default observer(HeroesComponent);