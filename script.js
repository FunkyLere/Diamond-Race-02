// The code at this point faces one desing question:
// Is the diamond representation going to be part of RaceParticipant,
// is going to be in the RaceControler or be in another class?
// First I'll try to create another class to deal with it

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
    set newScore(number) {
        this.#score = number;
    }
    get id() {
        return this.#id;
    }
    /** Increment participant's score by 1 */
    progress = () => {
        // console.log(`In progress: this = ${this}`);
        // console.log(`this.score = ${this.score}`);
        return this.newScore = this.score +1;
        // console.log(`this.score = ${this.score}`);
    };
    /** Reset participant's score to 0 */
    reset() {
        this.score = 0;
    }
}
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
            console.log(this.#participants[`${i}`]);
        }
        this.#winner = -1;
    }
    get canvas() {
        return this.#canvas;
    }
    get participantsList() {
        return this.#participants;
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
        this.#diamonds = [];
        this.#rectagles = [];
        for (let i = 0; i < Object.keys(this.#participants).length; ++i) {
            console.log(`In representParticipants: this = ${this}`);
            this.diamond = document.createElement("div");
            this.diamond.className = "diamond";
            this.diamond.dataset.id = `${i}`;
            this.canvas.insertAdjacentElement("afterend", this.diamond);
            this.diamond.addEventListener ("click", this.moveDiamond);
            this.diamond.style.background = this.#participants[`${i}`].color;
            this.diamond.style.left = `${(50*this.#participants[i].score)+109}px`;
            this.diamond.style.top = `${(60*i)+103}px`;

            this.rect = document.createElement("div");
            this.rect.setAttribute("class","rectangle");
            this.rect.setAttribute("id", this.#participants[`${i}`].color);
            this.canvas.insertAdjacentElement("afterend", this.rect);
            this.rect.style.background = this.#participants[`${i}`].color;
            this.rect.style.left = `${700}px`;
            this.rect.style.top = `${(20*i)+175}px`; 

            this.box = document.createElement("div");
            this.box.setAttribute("class","scoreBox");
            this.box.innerHTML = this.#participants[`${i}`].score;
            this.canvas.insertAdjacentElement("afterend", this.box);
            this.box.style.left = `${700}px`;
            this.box.style.top = `${(20*i)+175}px`;

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
        if (this.participants[`${id}`]) {
            return this.participants[`${id}`].partColor;
        }
        return null;
    }
    /**
     * Given a participant's id returns the partipant's score else null 
     * @returns {strig|null}
    */
    getParticipantScore(id) {
        if (this.participants[`${id}`]) {
            return this.participants[`${id}`].score;
        }
        return null;
    }
    /** Given a partipant's id increment its score by 1 */
    moveDiamond () {
        // Try to use target to know wich one is clicked
        // from the RaceControler class.

       
        console.log(this);
        // console.log(this.diamond.dataset.id);
        // const temp = this.participantsList[this.diamond.dataset.id].progress();
        // this.diamond.style.left = `${(50*temp)+109}px`;

        // Acces to the diamond data set
        // Get the id and call progress using the id as an argument.
        const temp = this.dataset.id;
        // console.log(this.participantsList);
        console.log(this.participantsList[temp].progress());
      
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