import { Entity } from '@/helpers/entity.js';
import { Sprite } from 'pixi.js'

class Wizard extends Entity {
    constructor() {
    	super();
    	const wizardSprite = Sprite.from("static/wizard.png");
 		this.setSprite(wizardSprite);
    }
}

export {
	Wizard
}

