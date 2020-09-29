# Transitions

## Overviews
Transitions are the paths between states, and are expressed with an action, from state and to state. They can be configured in advance via the constructor's options argument, or added at run time via fsm.add().

There are two ways to describe a transition:
- As a JavaScript Object with the above properties, resulting in a single transition
- Via "shorthand notation", where you "draw" the transitions, resulting in one or many transitions

When you add transitions to StateMachine, the list of states and actions is updated automatically. Conversely, when you remove states or actions, orphaned states or actions are removed by default.

## Objects
Describing a transition via its 3 properties is the most obvious way to add a transition to StateMachine.

You can do it via the constructor options like so:

```js
var options = {
    transitions: [
        {action: 'next', from: 'a', to: 'b'},
        {action: 'back', from: 'b', to: 'a'}
    ]
};
var fsm = new StateMachine(options);
```

Alternatively, you can add them via fsm.add():

```js
var fsm = new StateMachine();
fsm
    .add('next', 'a', 'b')
    .add('back', 'b', 'a');
```

## Shorthand notation
A more expressive way of adding transitions is via "shorthand notation". This allows you to literally write out the flow of transitions as they occur.

```js
var options = {
    transitions: [
        'next : a > b',
        'back : b > a'
    ]
};
var fsm = new StateMachine(options);
```

Not only that, but you can reverse the > symbol to describe transitions that go the opposite way:

```js
transitions: [
    'next : a > b',
    'back : a < b',
]
```

You're not limited to a single set of states either; you can add multiple transitions in a variety of ways:

```js
// move sequentially from one state to the next state
'next : a > b > c > d'

// move from both a and c to state x
'error: a > x < c'

// move from each of a, b and c, to state x
'quit : a b c > x'
```

Note that it doesn't make sense to transition from multiple states to multiple states, so the following will throw an error:

```js
'wtf : a b c > x y z'
```

Each of the above configurations can be viewed in the API section of the demos.

In a more complicated system you can even change the spacing of the states to make the intention of the system really clear.

The following describes a basic sign-up form (and can be seen in the Examples section of the demos here):

```js
transitions: [
    'next    : intro > form > finish',
    'back    : intro < form           < error',
    'error   :         form >           error',
    'restart : intro        < finish'
]
```

As with Object transition configuration, you can also assign shorthand transitions at run time:

```js
fsm.add('next : intro > form > finish')
```

For each of the examples above, they will be converted and expanded internally to regular `Object` transitions.

## Wildcard states

StateMachine also supports "wildcard" state assignment, where any state will transition to a target to state:

```
fsm.on('restart : intro < *'); // you can use any order or operator here
```

Note that you cannot transition to a wildcard (it doesn't make sense to) and StateMachine will warn you if you attempt to do so.

See the [Options](options.md) section for more information on reporting warnings and errors.

## Miscellaneous

You can use = in place of : if you prefer:

```
'next = a > b'
```