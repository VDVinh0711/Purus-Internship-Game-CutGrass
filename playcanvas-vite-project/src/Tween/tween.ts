import * as pc from 'playcanvas';

const Tween = pc.createScript('tween');

Tween!.attributes.add('tweens', {
    type: 'json',
    schema: [
        {
            name: 'autoPlay',
            title: 'Autoplay',
            description: 'Play tween immediately.',
            type: 'boolean',
            default: false
        }, {
            name: 'event',
            title: 'Trigger Event',
            description: 'Play tween on the specified event name. This event must be fired on the global application object (e.g. this.app.fire(\'eventname\');).',
            type: 'string'
        }, {
            name: 'path',
            title: 'Path',
            description: 'The path from the entity to the property. e.g. \'light.color\', \'camera.fov\' or \'script.vehicle.speed\'.',
            type: 'string'
        }, {
            name: 'start',
            title: 'Start',
            type: 'vec4'
        }, {
            name: 'end',
            title: 'End',
            type: 'vec4'
        }, {
            name: 'easingFunction',
            title: 'Easing Function',
            description: 'The easing functions: Linear, Quadratic, Cubic, Quartic, Quintic, Sinusoidal, Exponential, Circular, Elastic, Back and Bounce.',
            type: 'number',
            enum: [
                { 'Linear': 0 },
                { 'Quadratic': 1 },
                { 'Cubic': 2 },
                { 'Quartic': 3 },
                { 'Quintic': 4 },
                { 'Sinusoidal': 5 },
                { 'Exponential': 6 },
                { 'Circular': 7 },
                { 'Elastic': 8 },
                { 'Back': 9 },
                { 'Bounce': 10 }
            ],
            default: 0
        }, {
            name: 'easingType',
            title: 'Easing Type',
            description: 'Whether to ease in, easy out or ease in and then out using the specified easing function. Note that for a Linear easing function, the easing type is ignored.',
            type: 'number',
            enum: [
                { 'In': 0 },
                { 'Out': 1 },
                { 'InOut': 2 }
            ],
            default: 0
        }, {
            name: 'delay',
            title: 'Delay',
            description: 'Time to wait in milliseconds after receiving the trigger event before executing the tween. Defaults to 0.',
            type: 'number',
            default: 0
        }, {
            name: 'duration',
            title: 'Duration',
            description: 'Time to execute the tween in milliseconds. Defaults to 1000.',
            type: 'number',
            default: 1000
        }, {
            name: 'repeat',
            title: 'Repeat',
            description: 'The number of times the tween should be repeated after the initial playback. -1 will repeat forever. Defaults to 0.',
            type: 'number',
            default: 0
        }, {
            name: 'repeatDelay',
            title: 'Repeat Delay',
            description: 'Time to wait in milliseconds before executing each repeat of the tween. Defaults to 0.',
            type: 'number',
            default: 0
        }, {
            name: 'yoyo',
            title: 'Yoyo',
            description: 'This function only has effect if used along with repeat. When active, the behaviour of the tween will be like a yoyo, i.e. it will bounce to and from the start and end values, instead of just repeating the same sequence from the beginning. Defaults to false.',
            type: 'boolean',
            default: false
        }, {
            name: 'startEvent',
            title: 'Start Event',
            description: 'Executed right before the tween starts animating, after any delay time specified by the delay method. This will be executed only once per tween, i.e. it will not be run when the tween is repeated via repeat(). It is great for synchronising to other events or triggering actions you want to happen when a tween starts.',
            type: 'string'
        }
    ]
});

