const { Block, Blockchain, TunerChain } = require("./tunerChain.js");

/* Features of TunerChain */
// Blockchain is the blockchain class, which means you can inherit this class and upgrade TunerChain if you want.
// TunerChain is a "Blockchain" object, which is ready to use.
// TunerChain.chain // The whole chain
// TunerChain.difficulty // The difficulty
// TunerChain.getLastBlock() // The latest block
// TunerChain.isValid() // "true" if chain is valid, "false" otherwise.
// new Block(timestamp /*string - "optional"*/, data /*array - "optional"*/) // Creates a new "Block" object.
// TunerChain.addBlock(block) // Mines the block and add the block to the chain.

console.log("Deploying...");

// A transaction example:
TunerChain.addBlock(new Block(Date.now().toString(), [{ from: "John", to: "Bob", amount: 100 }]));
TunerChain.addBlock(new Block(Date.now().toString(), [{ from: "nguyenphuminh", to: "girlfriend", amount: 100 }]));


console.log(TunerChain.chain);
console.log(TunerChain.chain[1].data);
console.log(TunerChain.chain[2].data);
