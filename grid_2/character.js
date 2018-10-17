class Sprite {
    constructor(n, row, col, imgs) {


        this.row = row;
        this.col = col;
        this.size = 100;
        this.nFrms = n; // Number of frames in animation & number of states in FSM
        this.anim = imgs; // Frames array for cells of animation
        this.curF = 0; // Current frame number in animation, also State variable for FSM
        

        this.transTab = [];

        this.transTab = [
            [0, 1, 4],
            [0, 2, 5],
            [0, 0, 3],
            [0, 1, 4],
            [0, 2, 5],
            [0, 0, 3]
          ];
        
        this.arr = [];
        
        for(let i=0;i<7;i++){
            this.arr.push([0])
            for(let j=0; j<10; j++){
                this.arr[i][j] = 0;
            }
        }
    }
    
    isThereObstacle(x, y){
        if(this.arr[x][y] == 1){
            return true;
        }
        return false;
    }
    
    // Transition current frame to next frame by mapping input to inType number
    // and then doing a table lookup in transTab with curFrm & inType
    transition() {
        let inputType;

        if (keyIsDown(65)) {
            if (this.col > 0) { //checks if cat is on the page
                //prevents moving onto rocks
                if(!this.isThereObstacle(this.row,(this.col - 1))){
                    this.col -= 1; //moves cat left
                }
            }
            inputType = 1;

        } else if (keyIsDown(68)) {
            if (this.col < cols - 1) {
                //checks if uni is on the page
                if(!this.isThereObstacle(this.row,(this.col + 1))){
                    this.col += 1; //moves cat left
                }
            }
            inputType = 2; //runs walking right animation


        } else if (keyIsDown(87)) {
            if (this.row >= 1) {
                //checks if uni is on the page
                if(!this.isThereObstacle((this.row - 1),this.col)){
                    this.row -= 1; //moves uni up
                }
            }
            inputType = 0; //runs idle animation

        } else if (keyIsDown(83)) {
            if (this.row < rows - 1) {
                //checks if uni is on the page
                if(!this.isThereObstacle((this.row + 1),this.col)){
                    this.row += 1; //moves uni up
                }
            }

            inputType = 0; //runs idle animation

        } else {
            inputType = 0; //runs idle animation
        }

        // Table lookup - No "if" statements needed!
        this.curF = this.transTab[this.curF][inputType]; // Transition to next state
    }

    display() {
        image(this.anim[this.curF], (this.col+0.5) * this.size, (this.row+0.5) * this.size, this.size, this.size); // State variable is frame number

    }
    
    
    addObstacle(x, y){
        this.arr[x][y] = 1;
    }


}
