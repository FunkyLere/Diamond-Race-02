/** A participant's data.*/
class Participant {

    /**@type {string} */
    #color;
    /**@type {number} */
    #id; 
    /** @type {Element} */
    #canvas;
    /**@type {number} */
    #score;
    /**@type {Object} */
    #representation;
    
    /**
     * Create a participant
     * @param {string} color - Participant's color.
     * @param {string} id - Participant's id.
     * @param {Element} canvas - Canvas element where the race takes place.
     * @param {number} [score = 0] - Participant's current points.
     */
    constructor(color, id, canvas) {
        this.#color = color;
        this.#id = id;
        this.#canvas = canvas;
        this.#score = 0;
        this.#representation = new Representation(this.color, this.id, this.canvas);
    }
    /**
     * Get participant's color.
     * @return {string} The participant's color as a CSS recognizable string.  
     */
    get color() {
        return this.#color;
    }
    /** Get participant's id
     * @return {number} The participant's id
     */
    get id() {
        return this.#id;
    }
    /**
     * Get race canvas.
     * @param {Element} - The canvas where the race will take place.
     */
    get canvas() {
        return this.#canvas;
    }
    /**
     * Get participant's score.
     * @return {number} The score value.
     */
    get score() {
        return this.#score;
    }
    /**
     * Set participant's score.
     * @param {number} - Participant's new score.
     */
    set newScore(number) {
        this.#score = number;
    }
    /**
     * Get participant's representation.
     * @return {Object} - Participant's representation.
     */
    get representation() {
        return this.#representation;
    }
    /** Increment participant's score by 1 */
    progress() {
        return this.newScore = this.score +1;
    }
    /** Reset participant's score to 0 */
    reset() {
        this.newScore = 0;
    }
}
/** 
* Class to represent a participant graphically in the race
* drawing the diamond, the rectagle and the score box.
*/
class Representation{
    /** @type {string} */
    #color;
    /** @type {number} */
    #id;
    /** @type {number} */
    #score;
    /** @type {Element} */
    #canvas;
    /** @type {Element} */
    #diamond;
    /** @type {Element} */  
    #rectangle;
    /** @type {Element} */
    #box;

    /**
     * Create a participant representation consisting in a diamond, a rectangle besides the score and the score.
     * @param {string} color - Representation's color
     * @param {number} id - Representation's id
     * @param {Element} canvas - Canvas element where the race takes place.
     */
    constructor(color, id, canvas){
        
        this.#color = color;
        this.#id = id;
        this.#score = 0;
        this.#canvas = canvas;
        this.#diamond = document.createElement("div");
        this.#diamond.className = "diamond";
        this.#diamond.dataset.id = `${this.#id}`;
        this.#canvas.insertAdjacentElement("afterend", this.#diamond);
        this.#diamond.style.background = this.#color;
        this.#diamond.style.left = `${(50*this.#score)+109}px`;
        this.#diamond.style.top = `${(60*this.#id)+103}px`;

        this.#rectangle = document.createElement("div");
        this.#rectangle.setAttribute("class","rectangle");
        this.#rectangle.setAttribute("id", this.#color);
        this.#canvas.insertAdjacentElement("afterend", this.#rectangle);
        this.#rectangle.style.background = this.#color;
        this.#rectangle.style.left = `${700}px`;
        this.#rectangle.style.top = `${(20*this.#id)+175}px`;

        this.#box = document.createElement("div");
        this.#box.setAttribute("class","scoreBox");
        this.#box.innerHTML = this.#score;
        this.#canvas.insertAdjacentElement("afterend", this.#box);
        this.#box.style.left = `${700}px`;
        this.#box.style.top = `${(20*this.#id)+174}px`;
    }
    /**
     * Get the diamond div element.
     * @return {Element} The div element representing the diamond.
     */
    get diamond() {
        return this.#diamond;
    }
    /**
     * Get the rectangle div element besides the score.
     * @return {Element} The div element besides the score.
     */
    get rectangle() {
        return this.#rectangle;
    }    
    /**
     * Get the div element containing the score.
     * @return {Element} The div element containing the score.
     */
    get box() {
        return this.#box;
    }
}

/** Class to manage the race */
class RaceControler {
    
    /** @type {string[]} */
    #colors;
    /** @type {Element} */
    #canvas;
    /** @type {Object[]} */
    #participants;
    /** @type {number} */
    #winner;
    /** @type {function} */
    #controlerMove;

    /** 
     * Create a race.
     * @param {string[]} colors - The participants' colors.
     * @param {Element} canvas - the html element where the start and finish line are draw.
     */
    constructor(colors, canvas) {

        this.#colors = colors;
        this.#canvas = canvas;
        this.#participants = [];
        this.#winner = -1;
        this.#controlerMove = this.moveDiamond.bind(this);

        for (let i = 0; i < this.colors.length; ++i) {
            const color = colors[i];
            const id = i;
            this.participantsList.push(new Participant(color, id, this.canvas));

            // The Event Listener is declared here because 
            // by doing so "this" refers to the RaceControler instance.
            
            this.participantsList[i].representation.diamond.addEventListener("click", this.move);
        }
    }
    /**
     * Get race canvas.
     * @param {Element} - The canvas where the race will take place.
     */
    get canvas() {
        return this.#canvas;
    }
    /**
     * Get race colors.
     * @param {string[]} - An array with the participants' colors
     */
    get colors() {
        return this.#colors;
    }
    /**
     * Get the map containing the participants data and representation.
     * @param {Object[]} -The map with the participants data and representation.
     */
    get participantsList() {
        return this.#participants;
    }
    /**
     * Get winner value.
     * @param {number} - The id of the race's winner or -1 if there is none.
     */
    get winner() {
        return this.#winner;
    }
    /**
     * Set winner value.
     * @param {number} - The winner variable new value.
     */
    set newWinner(number) {
        this.#winner = number;
    }
    /**
     * Get controlerMove function
     * @param {function} - The moveDiamond method pointing to the RaceControler instance in the global scope.
     */
    get move() {
        return this.#controlerMove;
    }
    /** Draws a rectangle.
     * @param {number} xPos - The x coordinate where the rectangle starts.
     * @param {number} yPos - The y coordinate where the rectangle starts.
     * @param {number} width - The rectangle's width in pixels.
     * @param {number} height - The rectangle's height in pixels.
     * @param {string} context - The canvas context's name.
     */
    drawLine(xPos,yPos, width, height, context) {
        context.fillRect(xPos,yPos, width, height);
    }
    /** Write a message in a position in the canvas (context) 
     * @param {string} message - The text to be writen.
     * @param {number} xPos - The x coordinate where the message starts.
     * @param {number} yPos - The y coordinate where the message starts.
     * @param {string} context - The canvas context's name.
     */
    writeText(message, xPos, yPos, context) {
        context.font = "bold 12pt times";
        context.fillText(message, xPos, yPos);  
    }
    /** Create a button with the resetRace method associated
     * @param {number} xPos - The x coordinate where the button is going to be.
     * @param {number} yPos - The y coordinate where the button is going to be.
     */
    createButton(xPos, yPos) {
        this.resetButton = document.createElement("button");
        this.resetButton.textContent = "Reset";
        this.resetButton.style.left = `${xPos}px`;
        this.resetButton.style.top = `${yPos}px`;
        this.canvas.insertAdjacentElement("afterend", this.resetButton);
        this.resetButton.addEventListener("click", this.resetRace.bind(this));
    }
    /** Reset a participant to score = 0 
     * @param {number} index - The index (id) of the participant to be reseted.
    */
    backToStart(index) {
        this.participantsList[index].reset();
        const scoreReseted = this.participantsList[index].score;
        this.participantsList[index].representation.diamond.style.left = `${(50*scoreReseted)+109}px`;
        this.participantsList[index].representation.box.innerHTML = scoreReseted;
    }
    /** Reset all the participants score to 0 and bring back event listeners if removed*/
    resetRace() {
        if (this.winner > -1) {
            this.participantsList[this.winner].representation.box.style.color = "black";
            this.newWinner = -1;
            for (let i = 0; i < this.colors.length; ++i) {
                this.backToStart(i);
                this.participantsList[i].representation.diamond.addEventListener("click", this.move);
            }
        } else {
            for (let i = 0; i < this.colors.length; ++i) {
                this.backToStart(i);
            }
        }
    }
    /**
     * Increase a participant score in 1 point, 
     * move the diamond and change the score accordingly. 
     * @param {MouseEvent} - A mouse click on a diamond.
     */
    moveDiamond(event) {    
        const index = event.target.dataset.id;
        const step = this.participantsList[index].progress();

        this.participantsList[index].representation.diamond.style.left = `${(50*step)+109}px`;
        this.participantsList[index].representation.box.innerHTML = step;
    
        if (step === 10) {         
            this.participantsList[index].representation.box.style.color = "red";
            this.freezeDiamonds();
            this.newWinner = index;
        }      
    }
    /** Removes the Event Listener from the diamonds */
    freezeDiamonds() {
        for (const participant of this.participantsList) {
            participant.representation.diamond.removeEventListener("click", this.move);
        }
    }
}


window.onload = function init() {
    
    const canvas1 = document.getElementById("race_track");
    const ctx = canvas1.getContext("2d");

    const diamondRace1 = new RaceControler(["red", "blue", "green", "yellow"], canvas1);
    diamondRace1.drawLine(17, 17, 2, 252.32, ctx);
    diamondRace1.drawLine(517, 17, 2,252.32, ctx);
    diamondRace1.writeText("Start", 0, 12, ctx);
    diamondRace1.writeText("End", 503, 12, ctx);
    diamondRace1.writeText("Score Board", 594, 95, ctx);
    diamondRace1.createButton(700,100);
};