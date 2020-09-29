# Handlers

## Overview

Handler are StateMachine's mechanism to hook into lifecycle events and run custom code. They work just the same as event handlers in the browser, with [Events](../api/events.md) objects being dispatched and passed to the event handler function, where you can take actions, run code, etc.

There are a variety of event types / Event classes that describe the lifecycle a StateMachine system, all of which are described in the Events section of the documentation.

## Handler syntax 
StateMachine keeps a map of event / callback pairs internally, which it uses to fire the correct events and call the correct handlers as the system transitions from state to state.

Because this map is somewhat complicated, and one of the aims of the project was to make using a finite state machine easy, a DSL (domain specific language) to reference lifecycle events has been developed.

Briefly, any lifecycle hook can be referenced using a few key words with some additional grammar, making it easy to specify handlers where it might otherwise might have been difficult, for example state.intro.next.start.

As an example, here are some typical use cases (note that patterns are always strings):

```js
'change'
'pause'
'state.add'
'intro'
'intro:leave'
'intro@next'
'@next'
'(intro form)@next'
```

By combining keywords and grammar together in various different ways, you can quickly specify the exact object and/or lifecycle target to hook into.

You can experiment with an interactive handler demo here:

kaoengine.io/html/api/events/playground.html

The specific syntax for keywords and grammars is summarised below:

<table class="table table-bordered table-striped indent">
    <thead>
        <tr><th>Format</th><th>Description</th></tr>
    </thead>
    <tbody>
        <tr><td><code>alias</code></td><td>Any single word that resolves to a namespaced type, state or action</td></tr>
        <tr><td><code>namespace.type</code></td><td>Absolute syntax for namespaced types</td></tr>
        <tr><td><code>@action</code></td><td>An action name</td></tr>
        <tr><td><code>#state</code></td><td>Alternative state name identifier to using an <code>alias</code></td></tr>
        <tr><td><code>:type</code></td><td>An event type, for action or state events</td></tr>
        <tr><td><code>(foo bar baz)</code></td><td>Grouping for multiple patterns, which are expanded to multiple handlers</td></tr>
    </tbody>
</table>

## Handler assignment

You can assign handlers via the constructor options like so:

```js
var options = {
    handlers: {
        'change' : function (event, fsm) { ... },
        'intro@next' : function (event, fsm, foo, bar) { ... },
    }
};
var fsm = new StateMachine(options);
```

Alternatively, you can assign them via fsm.on():

```js
var fsm = new StateMachine();
fsm.on('change', function (event, fsm) { ... });
```
The method is chainable, so you can add multiple handlers this way, though bear in mind that you can also use the grouping syntax (a b c) to assign the same handler to multiple events.

## Handler execution
Any event handler callback should be of a specific format:

```js
function (event, fsm, ...rest) { ... }
```
All handlers are passed first the specific Event instance describes the lifecycle hook, then a reference to the owning `StateMachine` then any optional parameters that may have been passed for some cases.

Inside the event handler you are free to call whatever code you like, using `this` to refer to the configured scope.

If you need to pause, resume or cancel a transition, you can do it via the fsm parameter, like so:

```js
function onChange(event, fsm) 
{
    fsm.pause();
    asynchronousCall(function onComplete() {
        fsm.resume();
    });
}
```

## Handler id patterns

This section outlines in detail, the specific handler id patterns that you can use to hook into lifecycle events.

You can experiment yourself with writing handler ids and seeing how they parse here:

kaoengine.io/html/api/events/interactive.html

Note that the StateMachine's lifecycle means that some hooks effectively overlap each other; for example action:start and state:leave are effectively the same thing, but your particular implementation may require, or benefit from, the subtle semantic / ordering differences between them.

## Everyday patterns

You'll use these patterns pretty much every time you use StateMachine, as they map to events common / logical to the majority of use cases.