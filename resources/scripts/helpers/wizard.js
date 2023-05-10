import { Entity } from '@/helpers/entity.js';
import { Sprite } from 'pixi.js'
import { entityManager } from '@/helpers/entityManager.js';

import anime from 'animejs/lib/anime.es.js';

class Wizard extends Entity {

	moving = false;

    constructor() {
    	super();
    	const wizardSprite = Sprite.from("static/wizard.png");
 		this.sprite = wizardSprite;
    }

    tick() {
    	super.tick();

    	if (!this.moving) {
    		this.moving = true;

	    	let emptyTile = entityManager.emptyTile;
	    	let emptyPosition = entityManager.emptyTile.multi(48);

	    	let position = { x: this.sprite.position.x, y: this.sprite.position.y };

			let distance = emptyPosition.distanceTo(position);
			console.log(distance);

		    anime({
			  targets: position,
			  x: emptyPosition.x,
			  y: emptyPosition.y,
			  easing: 'linear',
			  duration: distance * 2,
		      update: (anim) => {
			    this.sprite.position.set(position.x, position.y);
			  },
			  complete: () => {
			     this.moving = false;
			   }
			});
		}

    }
}

export {
	Wizard
}

