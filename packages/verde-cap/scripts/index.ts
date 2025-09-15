
import { NFTBase } from '@ecotrack/types/src';
import fs from 'fs'

const main = async () => {
    console.log('Cheking this ts file is executed properly !');

    const verdeCapMetada: NFTBase = {
        id: 1,
        name: 'NFT name base',
        description: 'NFT Description base',
        image: 'IPFS:imgurl',
        hash: 'Created when mitend? or IFC hash ?' as `0x${string}`,
        external_url: 'https://ecotrack.com',
        attributes: [{
            trait_type: 'Home area',
            value: 218.17
        }]
    };

    const path = './assets/metadata/verde-cap-metadata.json';
    const parsedFile = JSON.stringify(verdeCapMetada, null, 0);
    console.log('Writing file to: ', parsedFile);
     fs.writeFileSync(path, parsedFile, (err: Error) => err && console.log(err));

}

main();
