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