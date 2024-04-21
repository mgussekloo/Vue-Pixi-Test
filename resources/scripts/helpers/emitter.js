import * as particles from '@pixi/particle-emitter';

class Emitter {
	emitter = null;

	entity = null;
	config = null;

	startTime = null;

	constructor(entity, config) {
		this.entity = entity;
		this.config = config;
		this.container = entity.entityManager.container;
	}

	start() {
		this.emitter = new particles.Emitter(this.container, this.config);
		this.updateOwnerPos();
		this.emitter.emit = true;
		this.startTime = Date.now();
	}

	update(delta) {
		if (this.startTime && this.emitter) {
			this.updateOwnerPos()

			// let elapsed = Date.now() - this.startTime;
			this.emitter.update(delta);
		}
		return true;
	}

	stop() {
		if (this.startTime && this.emitter) {
			this.emitter.emit = false;
		}
	}

	updateOwnerPos() {
		if (this.entity && this.emitter) {
			this.emitter.updateOwnerPos(
				this.entity.position.x + 24,
				this.entity.position.y + 55
			);
		}
	}
}

export {
	Emitter
}