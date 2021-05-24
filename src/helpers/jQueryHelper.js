function jQueryHelper(fsm, states, controls, state, control) {
    // fsm
    this.fsm = fsm;

    // Selector
    this.selectors = {
        state: state || "[id]",
        control: control || "[name]",
    };

    // elements
    this.elements = {
        states: $(states || "#states"),
        controls: $(controls || "#controls"),
    };

    // live-bind button clicks to fsm actions
    this.elements.controls.on("click", this.selectors.control, (event) => {
        this.fsm.do(event.target.name);
    });
}
