import { Vector2 as _Vector2 } from 'three/src/math/Vector2';

class Vector2 extends _Vector2 {
	get x_y() {
		return this.x + '_' + this.y;
	}
}

export { Vector2 }