import fs from 'fs'
import 'dotenv/config';
import { keccak256 } from 'viem'
import MerkleTree from 'merkletreejs';

/**
 * 
 * [] Merkle tree using Object.entries()
 *  const { tree, leaves, root } = createMerkleTree(myData);
 *  const leafToProve = leaves[1];
    const proof = tree.getHexProof(leafToProve);
 * []
 */

const main = async () => {
    console.log('Cheking this ts file is executed properly !');
    const path = './assets/metadata/verde-cap-metadata.json'

    const example = {
        name: "bombre del brobecto",
        tooConB: true,
        anotherOne: false,
        properpties: {
            trait_type: "explosiveness",
            value: 800
        }
    };

    const verdeCapMetadata = {

    }

    const stringFile = JSON.stringify(example, null, 0);
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(stringFile);
    console.log('EJEMPLO', example);
    console.log('Encoded data', encodedData);
    const myFile = new Uint8Array(encodedData)
    // const tree = new MerkleTree(leave)
    console.log('Hashed')

}

main();
