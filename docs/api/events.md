# Events

## Overview

StateMachine, like many other systems, uses events to communicate changes in a decoupled manner.

There are four different event types to respond to, which correlate to the main parts of the system that is undergoing change:

- [SystemEvents](#systemevent) - such as starting, when the configuration is changed, or reaching the final state
- [TransitionEvents](#transitionevent) - when a transition is paused, resumed or cancelled
- [StateEvents](#stateevent) - when a state event handler is triggered
- [ActionEvents](#actionevent) - when an action even handler is triggered

To hook into an event, you need to add an event handler with an event handler shorthand, and a callback to run Javascript code:

```js
var fsm = new StateMachine(options);
fsm.on('from@next', function(event, fsm){
    console.log('About to submit the form...')
})
```

All events pass two arguments by default: the actual `Event` object and a reference to the owning `StateMachine`

The event handler shorthand (to hook into different events) is discussed at length [here](../config/handlers.md).

## SystemEvent
SystemEvents are called in response to system level event handler 

<h4>
	<a name="system.start" href="#system.start">#</a>
	<code>start</code>
</h4>
Fired when the StateMachine starts.

Useful to lazily wire up any UI, especially for delayed starts (where the FSM option start is set to false).

<h4>
	<a name="system.start" href="#system.change">#</a>
	<code>change</code>
</h4>

When a transition has completed and there is a change of state. Check the event source to see what the state is, or even the fsm.state:

```js
function onCHange (event, fsm) {
    event.source === fsm.state;
}
```

<h4>
    <a name="system.complete" href="#system.complete">#</a>
    <code>complete</code>
</h4>

