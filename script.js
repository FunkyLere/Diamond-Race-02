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
     * @param {number} score - Participant's current points.
     */
    constructor(color, id){
        this.#color = color;
        this.#id = id;
        this.#score = 0;
    }
    get partColor() {
        return this.#color;
    }
    get partScore() {
        return this.#score;
    }
    get partId() {
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
/** Class to construct and represent a diamond in the race */
class Diamond {
    /** @type {string}*/
    #color;
    /** @type {number} */
    #id;
    /** @type {number} */
    #score;
    
}
/** Class to manage and represent the Diamond Race */
class RaceStatus {
    /** @type {RaceParticipant[]} */
    #participants = {};
    /** @type {number} */
    #winner;
    /** 
     * @param {string[]} colors
     */
    constructor(colors) {
        for (let i = 0; i < colors.length; ++i) {
            const color = colors[i];
            const id = `${i}`;
            this.participants[`${i}`] = new RaceParticipant(color, id);
        }
        this.#winner = -1;
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
            if (participant.partScore == 10) {
                return participant.partId;
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
            return this.#participants[`${id}`].partScore;
        }
        return null;
    }
    /** Given a partipant's id increment its score by 1 */
    moveParticipant(id) {
        this.#participants[`${id}`].progress();
    }
}