import Config from './core/classes/Config';
import HandlerMap from './core/maps/HandlerMap';
import TransitionMap from './core/maps/TransitionMap';
import Transition from './core/classes/Transition';
import { diff } from './core/utils/utils';

/**
 * StateMachine constructor
 *
 * @param   {Object|null}    options
 * @constructor
 */
function StateMachine(options){
    this.transitions = new TransitionMap()
    this.handler = new HandlerMap(this)
    this.ini
}