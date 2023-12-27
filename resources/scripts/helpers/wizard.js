import { Sprite } from 'pixi.js'
import { entityManager } from '@/helpers/entityManager.js';
import { Entity } from '@/helpers/entity.js';
import { Emitter } from '@/helpers/emitter.js';
import { distanceBetween, pixelsToTile, tileToPixels } from '@/helpers/utils.js';

import { dustTrailParticlesConfig } from '@/configs/dustTrailParticles.js';

import TWEEN from '@tweenjs/tween.js'

class Wizard extends Entity {
	lastTime = 0;
	target = null;

    constructor() {
    	super();

    	const wizardSprite = Sprite.from("static/wizard.png");
 		this.sprite = wizardSprite;

		this.emitter = new Emitter(this, dustTrailParticlesConfig);

 		this.state = 'idle';

 		this.lastTime = Date.now();

    }

    tick() {
    	super.tick();
    	this.emitter.update();
    	this.updateMove();
    	// if (this.state == 'moving') {

		// }
    }

	onChangeState(newState) {
		switch (newState) {
			case 'idle':
				setTimeout(() => this.move(), 1000);
				break;

			case 'moving':
				break;
		}
	}

	updateMove() {
		if (!this.target) {
			return;
		}

		let delta = Date.now() - this.lastTime;
		this.lastTime = Date.now();

		let speed = delta * 0.05;

		let currentX = this.sprite.position.x;
		let currentY = this.sprite.position.y;

		let targetX = this.target.x;
		let targetY = this.target.y;

		let diffX = currentX - targetX;
		let diffY = currentY - targetY;

		let distance = distanceBetween(currentX, currentY, targetX, targetY);
		console.log('dist', distance);

		// if (distance < 1) {
		// 	speed = speed / (1 - distance);
		// }

		if (distance < 0.5) {
			console.log('found');
			this.sprite.position.set(this.target.x, this.target.y);
			this.target = null;
	 		this.state = 'idle';
			this.emitter.stop()

			return;
		}

		let changeX = 0, changeY = 0;

		if (Math.abs(diffX) > 0) {
			changeX = (diffX < 0) ? speed : -1 * speed;
		}
		if (Math.abs(diffY) > 0) {
			changeY = (diffY < 0) ? speed : -1 * speed;
		}

		console.log(changeX, changeY);

		this.sprite.position.set(currentX + changeX, currentY + changeY);
	}

    move() {
		// look around
		let arr = [
			[this.tile.x - 1, this.tile.y],
			[this.tile.x + 1, this.tile.y],
			[this.tile.x, this.tile.y - 1],
			[this.tile.x, this.tile.y + 1],
		];

    	let emptyTile = entityManager.emptyTileInArr(arr);
    	if (emptyTile === false) {
    		this.state = 'idle';
    	}

		let emptyPosition = tileToPixels(emptyTile);
		let position = this.sprite.position;

		let source = { x: position.x, y: position.y };
		let destination = { x: emptyPosition.x, y: emptyPosition.y };

		let distance = parseInt(emptyPosition.distanceTo(position));

		this.target = destination;
 		this.lastTime = Date.now();

		this.state = 'moving';
		this.emitter.start();

		// let tween = new TWEEN.Tween(source).to(destination, 200)
		// .onStart((target) => {
		// 	this.state = 'moving';
		// 	this.emitter.start();
		// })
		// .onUpdate((target, elapsed) => {
		// 	this.sprite.position.set(target.x, target.y);
		// })
		// .onComplete((target, tween) => {
		// 	this.state = 'idle';
		// 	this.emitter.stop()
		// })
		// .start();
    }
}

export {
	Wizard
}

