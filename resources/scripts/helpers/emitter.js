import * as particles from '@pixi/particle-emitter';

class Emitter {
	emitter = null;

	entity = null;
	config = null;

	startTime = null;

	constructor(entity, config) {
		this.entity = entity;
		this.config = config;
		// this.config = particles.upgradeConfig(config, ['assets/particleball.png']);
		// console.log(this.config);
	}

	start() {
		this.emitter = new particles.Emitter(this.entity.entityManager.container, this.config);
		this.updateOwnerPos();
		this.emitter.emit = true;
		this.startTime = Date.now();
	}

	update() {
		if (this.startTime && this.emitter) {
			this.updateOwnerPos()

			let elapsed = Date.now() - this.startTime;
			this.emitter.update(elapsed * 0.001);
		}
	}

	stop() {
		if (this.startTime && this.emitter) {
			this.emitter.emit = false;
		}
	}

	updateOwnerPos() {
		if (this.entity && this.entity.sprite && this.emitter) {
			this.emitter.updateOwnerPos(this.entity.sprite.position.x + 24, this.entity.sprite.position.y + 48);
		}
	}
}

export {
	Emitter
}