/** Class to save one participant's data.*/
class ParticipantData {

    /**@type {string} */
    #color;
    /**@type {number} */
    #id; 
    /**@type {number} */
    #score;
    
    /**
     * Create a participant
     * @param {string} color - Participant's color.
     * @param {string} id - Participant's id.
     * @param {number} [score = 0] - Participant's current points.
     */
    constructor(color, id) {
        this.#color = color;
        this.#id = id;
        this.#score = 0;
    }
    /**
     * Get the participant's color.
     * @return {string} The participant's color as a CSS recognizable string.  
     */
    get color() {
        return this.#color;
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
    /** Increment participant's score by 1 */
    progress() {
        return this.newScore = this.score +1;
    }
    /** Reset participant's score to 0 */
    reset() {
        this.newScore = 0;
    }
}
/** Class to manage the race */
class RaceControler {
    
    /** @type {Map<string, Object>} */
    #participants;
    /** @type {Element} */
    #canvas;
    /** @type {number} */
    #winner;

    /** 
     * Create a race.
     * @param {string[]} colors - The participants' colors.
     * @param {Element} canvas - the html element where the start and finish line are draw.
     */
    constructor(colors, canvas) {

        this.#canvas = canvas;
        this.#participants = new Map;
        this.#winner = -1;

        for (let i = 0; i < colors.length; ++i) {
            const color = colors[i];
            const id = i;
            this.participantsList.set(`${i}`,{
                data: new ParticipantData(color, id), 
                representation: new ParticipantRepresentation(color, id, this.canvas)});

            // The Event Listener is declared here because 
            // by doing so "this" refers to the RaceControler instance.
            this.participantsList.get(`${i}`)["representation"].diamond.addEventListener("click", this.moveDiamond);
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
     * Get the map containing the participants data and representation.
     * @param {Map} -The map with the participants data and representation.
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
    /** Draws a filled rectangle starting (xPos, yPos) with size width and height in a canvas(context) */
    drawLine = (xPos,yPos, width, height, context) => {
        context.fillRect(xPos,yPos, width, height);
    };
    /** Write a message in a position in the canvas (context) */
    writeText = (message, xPos, yPos, context) => {
        context.font = "bold 12pt times";
        context.fillText(message, xPos, yPos);  
    };
    /** Create a button with the resetRace method associated */
    createButton = (xPos, yPos) => {
        this.resetButton = document.createElement("button");
        this.resetButton.textContent = "Reset";
        this.resetButton.style.left = `${xPos}px`;
        this.resetButton.style.top = `${yPos}px`;
        this.canvas.insertAdjacentElement("afterend", this.resetButton);
        this.resetButton.addEventListener("click", this.resetRace);
    };
    /** Reset all the participants score to 0 */
    resetRace = () => {
        for (const participant of this.participantsList) {
            participant[1]["data"].reset();
            const scoreReseted = participant[1]["data"].score;
            participant[1]["representation"].diamond.style.left = `${(50*scoreReseted)+109}px`;
            participant[1]["representation"].box.innerHTML = scoreReseted;
        }
        if (this.winner > -1) {
            this.participantsList.get(`${this.winner}`)["representation"].box.style.color = "black";
            this.unfreezeDiamonds();
            this.newWinner = -1;
        }
    };
    /**
     * Increase a participant score in 1 point, move the diamond and change the score accordingly. 
     * @function
     * @instance
     * */
    moveDiamond =(e)=> {    
        const index = e.target.dataset.id;
        const step = this.participantsList.get(`${index}`)["data"].progress();

        this.participantsList.get(`${index}`)["representation"].diamond.style.left = `${(50*step)+109}px`;
        this.participantsList.get(`${index}`)["representation"].box.innerHTML = step;

        if (step === 10) {
            this.participantsList.get(`${index}`)["representation"].box.style.color = "red";
            this.freezeDiamonds();
            this.newWinner = index;
        }      
    };
    /** Removes the Event Listener from the diamonds */
    freezeDiamonds() {
        for (const participant of this.participantsList) {
            participant[1]["representation"].diamond.removeEventListener("click", this.moveDiamond);
        }
    }
    /** Brings back the original Event Listener to the diamonds */
    unfreezeDiamonds() {
        for (const participant of this.#participants) {
            participant[1]["representation"].diamond.addEventListener("click", this.moveDiamond);        }
    }
}
/** 
* Class to represent a participant graphically in the race
* drawing the diamond, the rectagle and the score box.
*/
class ParticipantRepresentation{
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