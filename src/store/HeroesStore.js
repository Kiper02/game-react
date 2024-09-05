import { makeAutoObservable } from "mobx";
import { sizeField, sizes } from "../utils/consts";

export class HeroesStore {
    heroOneCoordinates = {
        x: 50,
        y: 250 - (sizes.height / 2),
    }
    heroTwoCoordinates = {
        x: 850,
        y: 250 - (sizes.height / 2)
    }

    signOne = true
    signTwo = true

    scoreOne = 0;
    scoreTwo = 0;
    speedOne = 1;
    speedTwo = 1;
    moveOne = 1;
    moveTwo = 1;

    mouseCoordinates = {
        x: 0,
        y: 0
    }

    coordinatesBulletOne = {
        x: this.heroOneCoordinates.x,
        y: this.heroOneCoordinates.y
    }

    coordinatesBulletTwo = {
        x: this.heroTwoCoordinates.x,
        y: this.heroTwoCoordinates.y
    }
    
    speedBulletOne = 1;
    speedBulletTwo = 1;


    constructor() {
        makeAutoObservable(this)
    }

    get mouseCoordinatesGet() {
        return this.mouseCoordinates
    }

    get heroOne() {
        return this.heroOneCoordinates
    }

    get heroTwo() {
        return this.heroTwoCoordinates
    }

    get scoreOneGet() {
        return this.scoreOne;
    }

    get scoreTwoGet() {
        return this.scoreTwo;
    }

    get speedOneGet() {
        return this.speedOne
    }

    get speedTwoGet() {
        return this.speedTwo
    }

    get speedBulletOneGet() {
        return this.speedBulletOne
    }

    get speedBulletTwoGet() {
        return this.speedBulletTwo
    }

    get coordBulletOne() {
        return this.coordinatesBulletOne;
    }

    get coordBulletTwo() {
        return this.coordinatesBulletTwo;
    }

    setSpeedBulletOne(offset) {
        this.speedBulletOne += offset;
    }
    
    setSpeedBulletTwo(offset) {
        this.speedBulletTwo += offset;
    }
    

    setSpeedOne(offset) {
        this.speedOne += offset
    }

    setSpeedTwo(offset) {
        this.speedTwo += offset
    }

    setScoreOne(offset) {
        this.scoreOne += offset;
    }

    setScoreTwo(offset) {
        this.scoreTwo += offset;
    }

    setMouseCoordinates(x, y) {
        this.mouseCoordinates = {
            x,
            y
        } 
    }


    moveHeroOne() {
        if(this.signOne) {
            this.heroOneCoordinates.y += this.moveOne
        } else {
            this.heroOneCoordinates.y -= this.moveOne
        }
    }

    moveHeroTwo() {
        if(this.signTwo) {
            this.heroTwoCoordinates.y += this.moveTwo
        } else {
            this.heroTwoCoordinates.y -= this.moveTwo
        }
    }
    collisionWall() {
        if (this.heroOneCoordinates.y <= 0) {
            this.signOne = true; 
        } else if (this.heroOneCoordinates.y >= sizeField.height - sizes.height) {
            this.signOne = false;
        }

        if (this.heroTwoCoordinates.y <= 0) {
            this.signTwo = true; 
        } else if (this.heroTwoCoordinates.y >= sizeField.height - sizes.height) {
            this.signTwo = false;
        }
    }

    updateBullets() {
        this.coordinatesBulletOne.x += this.speedBulletOne;
        this.coordinatesBulletTwo.x -= this.speedBulletTwo;
        console.log(`Скорость второго`);
    
        this.collisionBulletWall();
        this.collisionBulletHero();
      }
    
      resetBulletOne() {
        this.coordinatesBulletOne.x = this.heroOneCoordinates.x;
        this.coordinatesBulletOne.y = this.heroOneCoordinates.y;
      }
    
      resetBulletTwo() {
        this.coordinatesBulletTwo.x = this.heroTwoCoordinates.x;
        this.coordinatesBulletTwo.y = this.heroTwoCoordinates.y;
    }
    
    
    
      collisionBulletWall() {
        if (this.coordinatesBulletOne.x >= sizeField.width) {
            this.resetBulletOne();
        }
        if (this.coordinatesBulletTwo.x <= 0) {
            this.resetBulletTwo();
        }
    }

    
      collisionBulletHero() {
        if (
          this.coordinatesBulletOne.x >= this.heroTwoCoordinates.x &&
          this.coordinatesBulletOne.y === this.heroTwoCoordinates.y
        ) {
            console.log(`Пуля первого попала во второго героя на координатах - Xbullet: 
                ${this.coordinatesBulletOne.x}, Ybullet: ${this.coordinatesBulletOne.y},
                XHero: ${this.heroTwoCoordinates.x}, YHero: ${this.heroTwoCoordinates.x}
                `
            );
          this.resetBulletOne();
          this.scoreOne++;
        }
        if (
          this.coordinatesBulletTwo.x <= this.heroOneCoordinates.x &&
          this.coordinatesBulletTwo.y === this.heroOneCoordinates.y
        ) {
          this.resetBulletTwo();
          this.scoreTwo++;
        }
      }
      



      collisionMouseHero() {

        const heroOneCenterY = this.heroOneCoordinates.y + (sizes.height / 2);
        const distanceX = Math.abs(this.heroOneCoordinates.x - this.mouseCoordinates.x);
        const distanceY = Math.abs(heroOneCenterY - this.mouseCoordinates.y);
    

        const collisionThreshold = 40; 
    
        if (distanceX < collisionThreshold && distanceY < collisionThreshold) {
            this.signOne = !this.signOne; 
        }
    }
}
