<template>
	<div>
		<div id="canvas" @click="nextSlide" @touchstart="nextSlide()"></div>
	</div>
</template>

<script setup>
	import { Application, Sprite, Container } from 'pixi.js'
	import { Viewport } from 'pixi-viewport'
	import { onMounted } from 'vue';

	// this.$refs.canvas.addEventListener('mousedown', this.clickCanvas, false);
	// this.$refs.canvas.addEventListener('touchstart', this.clickCanvas, false);

	const app = new Application({
	    resolution: window.devicePixelRatio || 1,
	  	autoDensity: true,
	    width: window.innerWidth,
	    height: window.innerHeight
	});

	// create viewport
	const viewport = new Viewport({
	    screenWidth: window.innerWidth,
	    screenHeight: window.innerHeight,
	    worldWidth: 100 * 48,
	    worldHeight: 100 * 48,

	    interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
	})


	// const container = new Container();
	// container.x = 200;
	// container.y = 0;
	app.stage.addChild(viewport);

	// activate plugins
	viewport
    .drag()
    // .clamp({ direction: 'all' })
    // .pinch()
    // .wheel()
    .decelerate();

    viewport.scaled = 0.5;
	// const sprite = Sprite.from("static/player.png");
	// sprite.position.set(100, 100);
	// viewport.addChild(sprite);

	// grass
	const grassContainer = new Container();

	let sprite;
	for (let x=0;x<99;x++) {
		for (let y=0;y<99;y++) {
				sprite = Sprite.from("static/grass.png");
				sprite.position.set(48 * x, 48 * y);
				grassContainer.addChild(sprite);
		}
	}

	viewport.addChild(grassContainer);
	onMounted(() => {
		document.getElementById('canvas').appendChild(app.view);
	});
</script>