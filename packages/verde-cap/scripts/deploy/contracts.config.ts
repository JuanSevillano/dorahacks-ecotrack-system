import { Address } from 'viem';
import BiokeysCollection from '../../artifacts/contracts/BiokeyCollection.sol/BioKeysCollection.json';

type VerdeCapContractsType = Record<string, {
    address: Address,
    contract: typeof BiokeysCollection
}>

export const VerdeCapContracts: VerdeCapContractsType = {
    biokeyCollection: {
        address: '0x76001badbcf9995697ca223a2be7729226e31f33', // TODO: reach out from deployments reference
        contract: BiokeysCollection
    }
}
