# Events

## Overview

StateMachine, like many other systems, uses events to communicate changes in a decoupled manner.

There are four different event types to respond to, which correlate to the main parts of the system that is undergoing change:

- [SystemEvents](#systemevent) - such as starting, when the configuration is changed, or reaching the final state
- [TransitionEvents](#transitionevent) - when a transition is paused, resumed or cancelled
- [StateEvents](#stateevent) - when a state event handler is triggered
- [ActionEvents](#actionevent) - when an action even handler is triggered

To hook into an event, you need to add an event handler with an event handler shorthand, and a callback to run Javascript code:

```
var fsm = new StateMachine(options);
fsm.on('from@next', function(event, fsm){
    console.log('About to submit the form...')
})
```

All events pass two arguments by default: the actual `Event` object and a reference to the owning `StateMachine`

The event handler shorthand (to hook into different events) is discussed at length [here](../config/handlers.md).

## SystemEvent