import { Sprite } from 'pixi.js'
import { entityManager } from '@/helpers/entityManager.js';
import { Entity } from '@/helpers/entity.js';
import { Emitter } from '@/helpers/emitter.js';
import { distanceBetween, pixelsToTile, tileToPixels, randomElements } from '@/helpers/utils.js';
import * as particles from '@pixi/particle-emitter';

import { dustTrailParticlesConfig } from '@/configs/dustTrailParticles.js';

import TWEEN from '@tweenjs/tween.js'

class Wizard extends Entity {
	lastTime = 0;
	target = null;
	components = [];

    constructor() {
    	super();

    	const wizardSprite = Sprite.from("static/wizard.png");
 		// this.sprite = wizardSprite;
 		this.addChild(wizardSprite);

 		this.state = 'idle';
    }

    tick() {
    	super.tick();
    	this.components.forEach((child) => child.update());
    }

	onChangeState(newState) {
		switch (newState) {
			case 'idle':
				setTimeout(() => this.move(), 100);
				break;

			case 'moving':
				break;
		}
	}

    move() {
		// look around
		let arr = [
			[this.tile.x - 1, this.tile.y],
			[this.tile.x + 1, this.tile.y],
			[this.tile.x, this.tile.y - 1],
			[this.tile.x, this.tile.y + 1],
		];

    	let emptyTile = entityManager.emptyTiles(1, arr).pop();

    	if (!emptyTile) {
    		this.state = 'idle';
    		return;
    	}

		let emptyPosition = tileToPixels(emptyTile);
		let position = this.position;
		let distance = parseInt(emptyPosition.distanceTo(position));

		this.state = 'moving';

		let emitter = new Emitter(this, dustTrailParticlesConfig);
		this.components.push(emitter);
		// this.addChild(emitter);

		let tween = new TWEEN.Tween({
			x: position.x,
			y: position.y,
		}).to({
			x: emptyPosition.x,
			y: emptyPosition.y
		}, 300)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onStart((object) => {
			this.state = 'moving';
			emitter.start();
		})
		.onUpdate((object) => {
			this.position.set(object.x, object.y);
		})
		.onComplete((object) => {
			this.state = 'idle';
			emitter.stop();
		})
		.start();

		// /this.tweens.push(tween);
    }
}

export {
	Wizard
}

