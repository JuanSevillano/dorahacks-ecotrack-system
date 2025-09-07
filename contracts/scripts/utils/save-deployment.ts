import fs from "fs";
import path from "path";

export const saveDeployment = (network: string, deployed: Record<string, string>) => {
  const deploymentsDir = path.join(__dirname, "./deployments");
  if (!fs.existsSync(deploymentsDir)) fs.mkdirSync(deploymentsDir);
  const filePath = path.join(deploymentsDir, `${network}.json`);
  fs.writeFileSync(filePath, JSON.stringify(deployed, null, 2));
  console.log(`💾 Saved deployment at ${filePath}`);
}
