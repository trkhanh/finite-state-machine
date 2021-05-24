import { isString } from "../utils/utils";
import { PraseError } from "../objects/errors";
import TransitionMeta from "./TransitionMeta";

function getError(tx, message) {
    return 'Invalid transition shorthand pattern"' + tx + '" -' + message;
}

function add(transitions, action, from, to) {
    transitions.push(new TransitionMeta(action, from, to));
}

/**
 * Parses/expands transition objects/strings into discrete transitions
 *
 * @returns {TransitionMeta[]}  An array of TransitionMeta instances
 */

export default function parse(tx) {
    if (isString(tx)) {
        // pre-process string
        tx = tx
            .replace(/([|=:<>])/g, " $1 ")
            .replace(/\s+/g, " ")
            .replace(/^\s+|\s+$/g, "");

        // ensure string is valid
        if (!/^\w+ [:=] [*\w][\w ]*[|<>] [*\w][\w ]*/.test(tx)) {
            throw new ParseError(
                getError(tx, "cannot determine action and states")
            );
        }

        // initialize variables
        let transitions = [],
            matches = tx.match(/([*\w ]+|[|<>])/g),
            action = matches.shift().replace(/\s+/g, ""),
            stack = [],
            match = "",
            op = "",
            a = "",
            b = "";

        // process states
        while (matches.length) {
            // get the next match
            match = matches.shift();

            // reset stack if | was passed
            if(match === '|'){
                stack = [];
                match = matches.shift();
            }

            // process match
            if(/[<>]/.test(match){
                op = match;
            } else{
                match = match.match(/[*\w]]+/g);
                match = match.length === 1 ? match[0] : match;
                stack.push(match);
            }


    }
}
