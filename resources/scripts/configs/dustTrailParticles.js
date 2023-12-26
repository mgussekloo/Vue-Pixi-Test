import { Texture } from 'pixi.js'

let dustTrailParticlesConfig =
{
    "lifetime": {
        "min": 5,
        "max": 10
    },
    "frequency": 0.3,
    "emitterLifetime": -1,
    "maxParticles": 25,
    "addAtBack": true,
    "pos": {
        "x": 0,
        "y": 0
    },
    "behaviors": [
        {
            "type": "alpha",
            "config": {
                "alpha": {
                    "list": [
                        {
                            "time": 0,
                            "value": 0
                        },
                        {
                            "time": 0.1,
                            "value": 1
                        },
                        {
                            "time": 1,
                            "value": 0.5
                        }
                    ]
                }
            }
        },
        {
            "type": "moveSpeed",
            "config": {
                "speed": {
                    "list": [
                        {
                            "time": 0,
                            "value": 2
                        },
                        {
                            "time": 1,
                            "value": 0.5
                        }
                    ]
                },
                "minMult": 0.1
            }
        },
        {
            "type": "scale",
            "config": {
                "scale": {
                    "list": [
                        {
                            "time": 0,
                            "value": 0.3
                        },
                        {
                            "time": 1,
                            "value": 0.1
                        }
                    ]
                },
                "minMult": 0.5
            }
        },
        {
            "type": "colorStatic",
            "config": {
                "color": "#ffffff"
            }
        },
        {
            "type": "rotationStatic",
            "config": {
                "min": 0,
                "max": 360
            }
        },
        {
            "type": "textureSingle",
            "config": {
                "texture": Texture.from("static/particleball.png")
            }
        },
        // {
        //     "type": "spawnShape",
        //     "config": {
        //         "type": "torus",
        //         "data": {
        //             "x": 0,
        //             "y": 0,
        //             "radius": 0,
        //             "innerRadius": 0,
        //             "affectRotation": false
        //         }
        //     }
        // }
    ]
}

export {
	dustTrailParticlesConfig
}