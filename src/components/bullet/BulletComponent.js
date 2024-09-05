import React from 'react';
import styles from './Bullet.module.css'
import { observer } from 'mobx-react-lite';

const BulletComponent = ({ background, top, left, one }) => {
    return (
        <div 
            className={styles.wrapp}
            style={{
                background: background,
                top: `${top}px`,
                left: `${left}px`
            }}
        >
        </div>
    );
}


export default observer(BulletComponent);
