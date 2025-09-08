import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { execSync } from 'child_process';

// Directorios
const CONTRACTS_DIR = join(__dirname, '..', 'contracts');
const OUT_DIR = join(__dirname, '..', 'dist');
const ABI_DIR = join(OUT_DIR, 'abis');
const TYPES_DIR = join(OUT_DIR, 'types');

// Crear directorios de salida
if (!existsSync(ABI_DIR)) mkdirSync(ABI_DIR, { recursive: true });
if (!existsSync(TYPES_DIR)) mkdirSync(TYPES_DIR, { recursive: true });

// Obtener lista de contratos compilados
function getContractNames(): string[] {
    try {
        // Para Foundry
        const foundryArtifacts = join(__dirname, '..', 'out');
        if (existsSync(foundryArtifacts)) {
            const files = execSync('find out -name "*.json" | grep -v dbg.json').toString().split('\n');
            return files
                .filter(file => file.includes('.json') && !file.includes('.dbg.json'))
                .map(file => file.split('/').pop()?.replace('.json', '') || '')
                .filter(name => name);
        }

        // Para Hardhat
        const hardhatArtifacts = join(__dirname, '..', 'artifacts', 'contracts');
        if (existsSync(hardhatArtifacts)) {
            const files = execSync('find artifacts/contracts -name "*.json" | grep -v dbg.json').toString().split('\n');
            return files
                .filter(file => file.includes('.json') && !file.includes('.dbg.json'))
                .map(file => {
                    const parts = file.split('/');
                    return parts[parts.length - 1].replace('.json', '');
                })
                .filter(name => name);
        }
    } catch (error) {
        console.error('Error getting contract names:', error);
    }

    return [];
}

// Generar archivos de artefactos
function generateArtifacts() {
    const contractNames = getContractNames();
    const abiIndex: string[] = [];
    const typeIndex: string[] = [];

    contractNames.forEach(contractName => {
        try {
            // Buscar ABI en diferentes ubicaciones
            let abiPath;
            const possiblePaths = [
                join('out', `${contractName}.sol`, `${contractName}.json`),
                join('artifacts', 'contracts', `${contractName}.sol`, `${contractName}.json`),
                join('artifacts', `${contractName}.json`)
            ];

            for (const path of possiblePaths) {
                if (existsSync(join(__dirname, '..', path))) {
                    abiPath = path;
                    break;
                }
            }

            if (!abiPath) {
                console.warn(`No ABI found for ${contractName}`);
                return;
            }

            const artifact = JSON.parse(readFileSync(join(__dirname, '..', abiPath), 'utf8'));
            const abi = artifact.abi || artifact;

            // Guardar ABI
            writeFileSync(join(ABI_DIR, `${contractName}.json`), JSON.stringify(abi, null, 2));
            abiIndex.push(`export { default as ${contractName} } from './${contractName}.json';`);

            // Generar tipos TypeScript
            const typeContent = `import { Abi } from 'abitype';\n\nexport const ${contractName}Abi = ${JSON.stringify(abi, null, 2)} as const;\n\nexport type ${contractName}Abi = typeof ${contractName}Abi;`;
            writeFileSync(join(TYPES_DIR, `${contractName}.ts`), typeContent);
            typeIndex.push(`export * from './${contractName}';`);

        } catch (error) {
            console.error(`Error processing ${contractName}:`, error);
        }
    });

    // Crear archivos índice
    writeFileSync(join(ABI_DIR, 'index.ts'), abiIndex.join('\n'));
    writeFileSync(join(TYPES_DIR, 'index.ts'), typeIndex.join('\n'));

    console.log('Artifacts generated successfully!');
    console.log(`Contracts processed: ${contractNames.length}`);
}

generateArtifacts();