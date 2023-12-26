import { Entity } from '@/helpers/entity.js';
import { Sprite } from 'pixi.js'
import { entityManager } from '@/helpers/entityManager.js';
import { pixelsToTile, tileToPixels } from '@/helpers/utils.js';

import TWEEN from '@tweenjs/tween.js'

class Wizard extends Entity {
    constructor() {
    	super();
    	const wizardSprite = Sprite.from("static/wizard.png");
 		this.sprite = wizardSprite;
 		this.state = 'idle';
    }

    tick() {
    	super.tick();

    	if (this.state == 'moving') {
			TWEEN.update();
		}
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
		this.state = 'moving';

		let emptyPosition = tileToPixels(emptyTile);
		let position = this.sprite.position;

		let source = { x: position.x, y: position.y };
		let destination = { x: emptyPosition.x, y: emptyPosition.y };

		let distance = parseInt(emptyPosition.distanceTo(position));

		let tween = new TWEEN.Tween(source).to(destination, 200)
		.onStart((target) => {

		})
		.onUpdate((target, elapsed) => {
			this.sprite.position.set(target.x, target.y);
		})
		.onComplete((target, tween) => {
			this.state = 'idle';
		})
		.start();
    }
}

export {
	Wizard
}

