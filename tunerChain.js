// Create Has Function
const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

// Create A Block
class Block {

    constructor(timestamp = "", data = []) {
        this.timestamp = timestamp;
        // Data -> contains info like transaction = send/receive, smart-contracts, etc
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = ""; // Previous Parent block's hash
        this.nonce = 0;
    }

    getHash() { return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce); }

    mine(difficulty) {
        console.log("Mining has begun!");
        // Basically, loops until the substring of the hash with length of 0 is equal to the string 0...
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            // We increases our nonce so that we can get a whole different hash.
            this.nonce++;
            console.log(this.hash);
            console.log(this.getHash());
            console.log("_________________________");
            console.log(this.hash.substring(0, difficulty) - Array(difficulty + 1).join("0"));
            // Update our new hash with the new nonce value.
            this.hash = this.getHash();
        }
    }
}

// Create the TunerChain
class Blockchain {

    constructor() {
        // Create our genesis block (Parent)
        this.chain = [new Block(Date.now().toString(), [{ message: "I am the parent of the blockchain -- Tuner Genesis"}])];
        this.difficulty = 1; // based on how many blocks mined!
    }

    getLastBlock() { return this.chain[ this.chain.length - 1 ]; }

    addBlock(block) {
        // Since we are adding a new block, prevHas (parent) will be the hash of old latest block
        block.prevHash = this.getLastBlock().hash;
        // Since now prevHash has a value, we must reset the block's hash
        block.hash = block.getHash();
        block.mine(this.difficulty);
        this.chain.push(block);
    }

    isValid() {
        // Iterate over the chain - every child -> parent -> genesis need to be validated everytime a block is updated or created!
        for (let i = 0; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[ i - 1 ];

            // Check Validation
            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }
        }

        return true;
    }
}

const TunerChain = new Blockchain();

module.exports.Block = Block;
module.exports.Blockchain = Blockchain;
module.exports.TunerChain = TunerChain;