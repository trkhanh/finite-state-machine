import HandlerMeta from "./HandlerMeta";
import Lexer from "../lexer/Lexer";
import { trim } from "../utils/utils";
import { ParseError } from "../objects/errors";

// ------------------------------------------------------------------------------------------------
// functions
function isSystem(token) {
    return /^(start|change|complete|reset)$/.test(token);
}

function isTransition(token) {
    return /^(pause|resume|cancel)$/.test(token);
}

function expandGroups(input) {
    var rx = /\((.+?)\)/;
    var matches = input.match(rx);
    if (matches) {
        var group = matches[0];
        var items = matches[1].match(/\S+/g);
        if (items) {
            items = items.map(item => input.replace(group, item));
            if (rx.test(items[0])) {
                return items.reduce((output, input) => {
                    return output.concat(expandGroups(input));
                }, []);
            }
            return items;
        }
    }
    return [input];
}

function addPath(path, namespace, target) {
    results.push(new HandlerMeta(_id, path, namespace, target));
    return true;
}

function addError(message, path) {
    var error = new ParseError(message, path, _id);
    results.push(error);
    return false;
}

// ------------------------------------------------------------------------------------------------
// export
/**
     * Parses event handler id into a HandlerMeta results containing handler paths
     *
     * @param   {string}    id          The handler id to parse, i.e. '@next', 'intro:end', 'change', etc
     * @param   {Object}    defaults     A StateMachine instance to test for states and actions
     * @return  {HandlerMeta[]}
     */
 export default function parse(id, defaults)
 {
     // pre-parse handler
     id          = trim(id);

     // objects
     _id         = id;
     _defaults   = defaults;
     results     = [];

     // parse
     parser.parse(id, defaults);

     // return
     return results;
 }

 
// ------------------------------------------------------------------------------------------------
// objects
let results,
    _defaults,
    _id;

var patterns = {
    // start pause intro
    alias   : /^(\w+)$/,
    
}