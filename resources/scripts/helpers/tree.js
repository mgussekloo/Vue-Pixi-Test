import { Sprite } from 'pixi.js'
import { entityManager } from '@/helpers/entityManager.js';
import { Entity } from '@/helpers/entity.js';
import { Emitter } from '@/helpers/emitter.js';
import { distanceBetween, pixelsToTile, tileToPixels } from '@/helpers/utils.js';

import { dustTrailParticlesConfig } from '@/configs/dustTrailParticles.js';

import TWEEN from '@tweenjs/tween.js'

class Tree extends Entity {
    constructor() {
    	super();

    	const sprite = Sprite.from("static/tree.png");
 		this.sprite = sprite;
 		this.sprite.anchor.set(1, 0.5);

		// this.emitter = new Emitter(this, dustTrailParticlesConfig);

 		this.state = 'idle';

 		// this.lastTime = Date.now();

    }

    tick() {
    	super.tick();
    	// this.emitter.update();
    	// this.updateMove();
    	// if (this.state == 'moving') {

		// }
    }

	onChangeState(newState) {
		switch (newState) {
			case 'idle':
				break;

			case 'moving':
				break;
		}
	}
}

export {
	Tree
}

