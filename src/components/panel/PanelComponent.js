import React, { useContext } from 'react';
import styles from './Panel.module.css'
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';

const PanelComponent = () => {
    const {heroes} = useContext(Context)

    return (
        <div className={styles.panel}>
            <h1 className={styles.heading}>Счёт</h1>
            <div className={styles.wrapp}>
            <div className={styles.feature}></div>
            <div className={styles.scoreOne}>{heroes.scoreOneGet}</div>
            <div className={styles.scoreTwo}>{heroes.scoreTwoGet}</div>
        </div>
        </div>
    );
}

export default observer(PanelComponent);
