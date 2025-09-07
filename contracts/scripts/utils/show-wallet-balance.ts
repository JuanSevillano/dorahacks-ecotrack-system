import { formatEther } from "viem";
import { publicClient, walletClient } from "../../utilts/clients";

export async function showWalletBalance() {
  if (!walletClient.account) {
    console.log("⚠️  No se encontró ninguna cuenta configurada en el walletClient.");
    return;
  }

  const address = walletClient.account.address;
  const balance = await publicClient.getBalance({ address });

  console.log(`\n💰 Wallet balance: ${formatEther(balance)} POL (${address})\n`);
}