class Enemy {
    constructor(n, row, col, imgs,x,y) {
        this.x = x;
        this.y = y;

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
        imageMode(CENTER);
        image(this.anim[this.curF], this.x+50, this.y+50, this.anim[this.curF].width/2, this.anim[this.curF].height/2); // State variable is frame number
    }


    move(x, y) {
        this.x = x;
        this.y = y;
    }

    
    
}
