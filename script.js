/** Class to represent a participant.*/
class RaceParticipant {

    /**@type {number} */
    #id; 
    /**@type {number} */
    #score;
    /**@type {string} */
    #color;    

    /**
     * Create a participant
     * @param {string} color - Participant's color.
     * @param {string} id - Participant's id.
     * @param {number} [score = 0] - Participant's current points.
     */
    constructor(color, id){
        this.#color = color;
        this.#id = id;
        this.#score = 0;
    }
    get color() {
        return this.#color;
    }
    get score() {
        return this.#score;
    }
    get id() {
        return this.#id;
    }
    /** Increment participant's score by 1 */
    progress() {
        this.#score += 1;
    }
    /** Reset participant's score to 0 */
    reset() {
        this.#score = 0;
    }
}
// /** Class representing a participant in the race (a canvas element)*/
// class Representation {
//     /** @type {string}*/
//     #color;
//     /** @type {number} */
//     #id;
//     /** @type {number} */
//     #score;

//     /**
//      * Create a diamond.
//      * @param {string} color - The diamond's color.
//      * @param {number} id - The diamond's id.
//      * @param {number} score - The diamond's score.
//      */
//     constructor(color, id, score) {
//         this.#color = color;
//         this.#id = id;
//         this.#score = score;
//     }
//     represent(canvas) {
//         this.diamond = document.createElement("div");
//         this.diamond.className = "diamond";
//         canvas.insertAdjacentElement("afterend", this.diamond);
//         // this.diamond.addEventListener("click", function);
//         this.diamond.style.background = this.#color;
//         // this.diamond.style.left =  ;
//         // this.diamond.style.top =  ;

//     }
// }
/** Class to manage and represent the Diamond Race */
class RaceControler {
    /** @type {RaceParticipant[]} */
    #participants = {};
    /** @type {Element} */
    #canvas;
    /** @type {number} */
    #winner;
    /** 
     * @param {string[]} colors - The participants' colors.
     * @param {Element} canvas - the html element where the start and finish line are draw.
     */
    constructor(colors, canvas) {
        this.#canvas = canvas;
        for (let i = 0; i < colors.length; ++i) {
            const color = colors[i];
            const id = i;
            console.log(`color = ${color} and id = ${id}`);
            this.#participants[`${i}`] = new RaceParticipant(color, id);
        }
        this.#winner = -1;
    }
    get canvas(){
        return this.#canvas;
    }
    drawLine = (xPos,yPos, width, height, context) => {
        context.fillRect(xPos,yPos, width, height);
    };
    writeText = (message, xPos, yPos, context) => {
        context.font = "bold 12pt times";
        context.fillText(message, xPos, yPos);  
    };
    createButton = (xPos, yPos) => {
        this.resetButton = document.createElement("button");
        this.resetButton.textContent = "Reset";
        this.resetButton.style.left = `${xPos}px`;
        this.resetButton.style.top = `${yPos}px`;
        this.canvas.insertAdjacentElement("afterend", this.resetButton);
        this.resetButton.addEventListener("click", this.reset);
    };
    /** Represent the diamonds and scoring boxes of the race's participants. */
    representParticipants() {
        for (let i = 0; i < Object.keys(this.#participants).length; ++i) {
            this.diamond = document.createElement("div");
            this.diamond.className = "diamond";
            this.canvas.insertAdjacentElement("afterend", this.diamond);
            this.diamond.addEventListener("click", this.moveDiamond);
            this.diamond.style.background = this.#participants[`${i}`].color;
            // this.diamond.style.left =  participant.score;
            // this.diamond.style.top =  participant.id;

            this.rect = document.createElement("div");
            this.rect.setAttribute("class","rectangle");
            this.rect.setAttribute("id", this.#participants[`${i}`].color);
            this.canvas.insertAdjacentElement("afterend", this.rect);
            // this.rect.style.background = color;
            // this.rect.style.left = `${scoreXPos}px`;
            // this.rect.style.top = `${scoreYPos}px`; 

            this.box = document.createElement("div");
            this.box.setAttribute("class","scoreBox");
            this.box.innerHTML = this.#participants[`${i}`].score;
            this.canvas.insertAdjacentElement("afterend", this.box);
            // this.box.style.left = `${scoreXPos}px`;
            // this.box.style.top = `${scoreYPos-2}px`;

        }
    }
    /** Reset all the participant to score 0 */
    reset() {
        for (const participant of this.#participants) {
            participant.reset();
        }
    }
    /**
     * Check if there a participant with score equals 10.
     * @returns {string|null}
     */
    getWinnerId() {
        for (const participant of this.#participants) {
            if (participant.score == 10) {
                return participant.id;
            }
        }
        return null;
    }
    /** 
     * Given a participant id returns the participant's color else null.
     * @returns {string|null}
     */
    getParticipantColor(id) {      
        if (this.#participants[`${id}`]) {
            return this.#participants[`${id}`].partColor;
        }
        return null;
    }
    /**
     * Given a participant's id returns the partipant's score else null 
     * @returns {strig|null}
    */
    getParticipantScore(id) {
        if (this.#participants[`${id}`]) {
            return this.#participants[`${id}`].score;
        }
        return null;
    }
    /** Given a partipant's id increment its score by 1 */
    moveDiamond(id) {
        this.#participants[`${id}`].progress();
    }
    /** Removes the Event Listener from the diamonds */
    freezeDiamonds() {
        for (const participant of this.#participants) {
            participant.diamond.removeEventListener("click", this.moveDiamond);
        }
    }
    /** Brings back the original Event Listener to the diamonds */
    unfreezeDiamonds() {
        for (const participant of this.#participants) {
            participant.diamond.addEventListener("click", this.moveDiamond);        }
    }
}

window.onload = function init() {
    // ACCESING TO THE CANVAS ELEMENT IN THE DOM
    const canvas1 = document.getElementById("race_track");
    const ctx = canvas1.getContext("2d");

    const diamondRace1 = new RaceControler(["red", "blue", "green", "yellow"], canvas1);
    diamondRace1.drawLine(17, 17, 2, 252.32, ctx);
    diamondRace1.drawLine(517, 17, 2,252.32, ctx);
    diamondRace1.writeText("Start", 0, 12, ctx);
    diamondRace1.writeText("End", 503, 12, ctx);
    diamondRace1.writeText("Score Board", 594, 95, ctx);
    diamondRace1.createButton(700,100);
    diamondRace1.representParticipants();

};