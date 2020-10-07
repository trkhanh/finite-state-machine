# State Machine

The StateMachine class is the primary interface to manage states, actions, handlers and transitions. 

You instantiate the StateMachine via `new` operator and an `options` object to configure transitions and handlers. After instantiation you can add additional transitiion and handlers via the public methods, as well as interact with transitions, and test for states and actions to update any connected UI, via event handler callbacks.

