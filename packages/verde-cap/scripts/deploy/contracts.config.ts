import { Address } from 'viem';
import BiokeysCollection from '../../artifacts/contracts/BiokeyCollection.sol/BioKeysCollection.json';

type VerdeCapContractsType = Record<string, {
    address: Address,
    contract: typeof BiokeysCollection
}>

export const VerdeCapContracts: VerdeCapContractsType = {
    biokeyCollection: {
        address: '0xe7CF295D4446a726F4932386eE33Db41827aC5d6', // TODO: reach out from deployments reference
        contract: BiokeysCollection
    }
}
