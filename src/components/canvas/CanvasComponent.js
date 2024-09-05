import React, { useContext, useEffect, useState } from 'react';
import styles from './Canvas.module.css';
import HeroesComponent from '../heroes/HeroesComponent';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { sizeField } from '../../utils/consts';
import PanelComponent from '../panel/PanelComponent';
import ButtonComponent from '../UI/button/ButtonComponent';
import BulletComponent from '../bullet/BulletComponent';

const CanvasComponent = () => {
  const { heroes } = useContext(Context);
  const [bullets, setBullets] = useState([]);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
  const handleMouseMove = (event) => {
    const field = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - field.left;
    const y = event.clientY - field.top;
    setMousePosition({ x, y });
    heroes.setMouseCoordinates(x, y)
    // console.log({ x, y });
  };

  useEffect(() => {
    const bulletInterval = setInterval(() => {
        setBullets([
            { x: heroes.coordBulletOne.x, y: heroes.coordBulletOne.y, one: true },
            { x: heroes.coordBulletTwo.x, y: heroes.coordBulletTwo.y, one: false },
        ]);
        heroes.updateBullets();
    }, 10);



    return () => clearInterval(bulletInterval);
  }, [heroes]);

  useEffect(() => {
    console.log('asd');
    const moveHeroesOne = setInterval(() => {
      heroes.moveHeroOne();
      heroes.collisionWall();
      heroes.collisionMouseHero()
    }, heroes.speedOneGet);
    const moveHeroesTwo = setInterval(() => {
      heroes.moveHeroTwo();
      heroes.collisionWall();
    }, heroes.speedTwoGet);

    return () => {
      clearInterval(moveHeroesOne);
      clearInterval(moveHeroesTwo);
    };
  }, [heroes.speedOneGet, heroes.speedTwoGet]);

  const increaseOne = () => {
    heroes.setSpeedOne(1);
  };

  const reduceOne = () => {
    heroes.setSpeedOne(-1);
  };
  const increaseTwo = () => {
    heroes.setSpeedTwo(1);
  };

  const reduceTwo = () => {
    heroes.setSpeedTwo(-1);
  };

  return (
    <div className={styles.wrapp}>
      <PanelComponent />
      <ButtonComponent
        background={'blue'}
        top={500}
        left={100}
        sign={'+'}
        click={increaseOne}
      />
      <ButtonComponent
        background={'brown'}
        top={580}
        left={100}
        sign={'-'}
        click={reduceOne}
      />
      <ButtonComponent
        background={'blue'}
        top={500}
        left={1650}
        sign={'+'}
        click={increaseTwo}
      />
      <ButtonComponent
        background={'brown'}
        top={580}
        left={1650}
        sign={'-'}
        click={reduceTwo}
      />
      <div
        className={styles.field}
        onMouseMove={handleMouseMove}
        style={{
          width: `${sizeField.width}px`,
          height: `${sizeField.height}px`,
        }}
      >
        <HeroesComponent
          x={heroes.heroOne.x}
          y={heroes.heroOne.y}
          background={'brown'}
          one={true}
        />
        <HeroesComponent
          x={heroes.heroTwo.x}
          y={heroes.heroTwo.y}
          background={'yellow'}
          one={false}
        />

        {bullets.map((bullet, index) => (
          <BulletComponent
            key={index}
            background={bullet.one ? 'chartreuse' : 'coral'}
            top={bullet.y}
            left={bullet.x}
            one={bullet.one}
          />
        ))}
      </div>
    </div>
  );
};

export default observer(CanvasComponent);
