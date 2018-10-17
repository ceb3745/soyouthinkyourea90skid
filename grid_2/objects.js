class Star {
    constructor(n, row, col, imgs) {


        this.row = row;
        this.col = col;
        this.size = 100;
        this.nFrms = n; // Number of frames in animation & number of states in FSM
        this.anim = imgs; // Frames array for cells of animation
        this.curF = 0; // Current frame number in animation, also State variable for FSM

        this.transTab = [];

        this.transTab = [
            [1],
            [2],
            [3],
            [0]
          ];
    }
    // Transition current frame to next frame by mapping input to inType number
    // and then doing a table lookup in transTab with curFrm & inType
    transition() {
        var inputType; // indicates animation loop to play through
        
        inputType = 0;

        // Table lookup - No "if" statements needed!
        this.curF = this.transTab[this.curF][inputType]; // Transition to next state
    }

    display() {
        image(this.anim[this.curF], (this.col+0.5) * this.size, (this.row+0.5) * this.size, this.size, this.size); // State variable is frame number
    }

}
