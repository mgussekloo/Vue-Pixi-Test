import { Entity } from '@/helpers/entity.js';
import { Sprite } from 'pixi.js'
import { entityManager } from '@/helpers/entityManager.js';

class Wizard extends Entity {
	goalPos = false;



    constructor() {
    	super();
    	const wizardSprite = Sprite.from("static/wizard.png");
 		this.sprite = wizardSprite;
    }

    tick() {
    	let emptyTile = entityManager.emptyTile;
    	let distance = this.sprite.position
    	super.tick();

    }
}

export {
	Wizard
}

