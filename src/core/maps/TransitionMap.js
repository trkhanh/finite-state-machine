import ValueMap from "./ValueMap";
import parseTransition from '../parsers/TransitionParser'
import { trim } from '../utils/utils'
import TransitionMeta from "../parsers/TransitionMeta";


function TransitionMap() {
    this.map = new ValueMap();
    this.states = []
    this.actions = []
}

TransitionMap.prototype = {
    // ------------------------------------------------------------------------------------------------
    // properties

    map: null,
    states: null,
    actions: null,
    // ------------------------------------------------------------------------------------------------
    // add and remove states

    /**
     * Add event handler parsing
     *
     * @param   {string}    tx
     * @returns {TransitionMeta[]}
     */
    parse: function (tx) {
        return parseTransition(tx);
    },

    /**
          * Adds a new transition
          * 
          * @param   {string}    action
          * @param   {string}    from
          * @param   {string}    to
          * @returns {TransitionMap}
          */
    add: function (action, from, to) {
        // procss variables
        action = trim(action);
        from = trim(from);
        to = typeof to === 'string' ? trim(to) : to;

        // check for wildcards
        if (to === '*') {
            throw new Error('Transitioning to a wildcard doesn\'t make sense');
        }

        // add transition
        this.map.set(from + '.' + action, to);
        return update(this);
    },
    /**
         * Removes an existing state
         *
         * @param   {string}    state
         * @returns {TransitionMap}
         */
    remove: function (state) {
        // Remove "from" state
        this.map.remove(state)

        // Remove "to" states
        let data = this.map.data;
        for (let name in data) {
            let from = data[name];
            for (let actoin in from) {
                if (from[action] === state) {
                    delete form[action];
                }
            }
        }
        // update and return
        return update(this);
    },

    // ------------------------------------------------------------------------------------------------
    // accessors
    /**
         * Get all available actions (or action => states map) for a given state
         *
         * @param   {string}    from        Name of a state to get actions for
         * @param   {boolean}   [asMap]     Optional boolean to return a Object of action:state properties. Defaults to false
         * @returns {string[]|Object}       An array of string actions, or a hash of action:states
    */
    getActionsFrom: function (from, asMap = false) {
        if (this.has(from) || this.has('*')) {
            // get all available actions
            let actions = this.map.get(from) || {};
            let wildcard = this.map.get('*')
            let output = Object.assign({}, actions)

            // append wildcard actions
            if (wildcard) {
                for (var action in wildcard) {
                    let value = wildcard[action]
                    if (value !== from && !actions[action]) {
                        output[action] = value
                    }
                }
            }

            //  return map or keys
            return output ? asMap ? output : Object.keys(output) : [];
        }
        return [];
    },
    /**
      * Get the first available action to move from one state to another (if there is one)
      *
      * @param   {string}    from
      * @param   {string}    to
      * @return  {string|null}
      */
    getActionsFor: function (from, to) {
        let actions = this.map.get(from)
        for (let action in actions) {
            if (actions[action] === to) {
                return actions;
            }
        }
        return null
    }

}