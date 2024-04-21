import { Sprite } from 'pixi.js'
import { entityManager } from '@/helpers/entityManager.js';
import { Entity } from '@/helpers/entity.js';
import { Emitter } from '@/helpers/emitter.js';
import { distanceBetween, pixelsToTile, tileToPixels, randomElements } from '@/helpers/utils.js';
import * as particles from '@pixi/particle-emitter';

import { dustTrailParticlesConfig } from '@/configs/dustTrailParticles.js';

// import TWEEN from '@tweenjs/tween.js'
import { TweenWrap } from '@/helpers/tweenWrap.js';

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

    update(delta) {
    	super.update(delta);
    	this.components = this.components.filter(child => child.update(delta));
    }

	onChangeState(newState) {
		switch (newState) {
			case 'idle':
				console.log('idling');
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
		let distance = emptyPosition.distanceTo(position);

		this.state = 'moving';

		// let emitter = new Emitter(this, dustTrailParticlesConfig);
		// this.components.push(emitter);
		// this.addChild(emitter);

		let origin = {
			x: position.x,
			y: position.y,
		};

		let destination = {
			x: emptyPosition.x,
			y: emptyPosition.y
		}
		let duration = 300;

		let tw = new TweenWrap(origin, destination, duration);
		tw.tween
		// .easing(TWEEN.Easing.Quadratic.InOut)
		.onStart(() => {
			this.state = 'moving';
			// emitter.start();
		})
		.onUpdate((object) => {
			this.position.set(object.x, object.y);
		})
		.onComplete(() => {
			this.state = 'idle';
			// emitter.stop();
		});

		this.components.push(tw);
    }
}

export {
	Wizard
}

