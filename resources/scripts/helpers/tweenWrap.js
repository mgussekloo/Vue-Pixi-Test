import TWEEN from '@tweenjs/tween.js'

class TweenWrap {
	elapsed = 0;
	duration = 0;
	tween = null;

	constructor(origin, destination, duration) {
		this.duration = duration;
		this.tween = new TWEEN.Tween(origin).to(destination, duration).easing(TWEEN.Easing.Quadratic.InOut);
	}

	update(delta) {
		this.elapsed = this.elapsed + delta * 10;
		this.tween.update(this.elapsed);
		return this.tween.isPlaying();
	}

}

export {
	TweenWrap
}

