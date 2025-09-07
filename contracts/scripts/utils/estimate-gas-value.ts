import { Address, formatUnits, Hex, parseUnits, Abi, encodeDeployData } from "viem";
import { publicClient, walletClient } from "../../utilts/clients";

const totalPriceStimated = {
    gasEstimate: 0n,
    matic: 0,
    usdc: 0
}

export const estimateGas = async (to: Address, data: Hex, value?: string) => {
    try {
        const gasEstimate = await publicClient.estimateGas({
            to,
            data,
            value: value ? parseUnits(value, 18) : undefined,
        });

        const gasPrice = await publicClient.getGasPrice();
        const costNative = gasEstimate * gasPrice;
        const costMATIC = Number(formatUnits(costNative, 18));

        // Simulación de conversión a USDC (precio ficticio o fetch real de API)
        // fetch precio real de matic 
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd');
        const maticdata = await response.json();
        const MATIC_USDC_PRICE = maticdata['matic-network'].usd;
        const costUSDC = costMATIC * MATIC_USDC_PRICE;

        console.log(`\nEstimación de gas: ${gasEstimate} units`);
        console.log(`Costo estimado en MATIC: ${costMATIC.toFixed(6)} MATIC`);
        console.log(`Costo estimado en USDC: ${costUSDC.toFixed(2)} USDC\n`);

        totalPriceStimated.gasEstimate += gasEstimate;
        totalPriceStimated.matic += costMATIC;
        totalPriceStimated.usdc += costUSDC;

        return gasEstimate;
    } catch (error) {
        console.log('Error estimating gas:', error);
    }
}

export const sendTransaction = async (to: Address, data: Hex, value?: string) => {
    try {
        const tx = await walletClient.sendTransaction({
            to,
            data,
            value: value ? parseUnits(value, 18) : undefined,
        });
        console.log('🚀 Transacción enviada:', tx);
        return tx;
    } catch (error) {
        console.log('Error sending transaction: ', error);
    }
}

export type EstimateGasDeployParams = {
    abi: Abi;
    bytecode: Hex;
    args?: any[];
    value?: string; // MATIC a enviar en deploy, opcional
};

export const estimateGasDeploy = async ({
    abi,
    bytecode,
    args = [],
    value,
}: EstimateGasDeployParams) => {
    // Encodeamos el bytecode con los argumentos del constructor
    const deployData = encodeDeployData({ abi, bytecode: bytecode, args });

    // Estimación de gas desde nuestra cuenta
    const gasEstimate = await publicClient.estimateGas({
        data: deployData,
        account: walletClient.account.address,
        value: value ? parseUnits(value, 18) : 0 as any
    });

    // Añadimos un buffer seguro del 20% usando bigint
    const gasWithBuffer = gasEstimate * 120n / 100n;
    // Obtener gasPrice actual && Costo estimado en MATIC
    const gasPrice = await publicClient.getGasPrice();
    const costNative = gasWithBuffer * gasPrice;
    const costMATIC = Number(formatUnits(costNative, 18));

    // Fetch precio MATIC → USDC
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd");
    const maticData = await response.json();
    const MATIC_USDC_PRICE = maticData["matic-network"].usd;
    const costUSDC = costMATIC * MATIC_USDC_PRICE;

    console.log(`\n🔹 Estimación de gas para deploy: ${gasEstimate} units`);
    console.log(`🔹 Gas con buffer 20%: ${gasWithBuffer} units`);
    console.log(`🔹 Costo estimado en MATIC: ${costMATIC.toFixed(6)} MATIC`);
    console.log(`🔹 Costo estimado en USDC: ${costUSDC.toFixed(2)} USDC\n`);

    return { gasEstimate, gasWithBuffer, costMATIC, costUSDC };
};