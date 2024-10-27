import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        console.log("hello1");
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        // const image = ???
        // const metadata = {
        //     name: "hellogene",
        //     symbol: "GEN",
        //     desciption: "Gene is a generative art project that creates unique images using a neural network.",
        //     image: "https://devnet.irys.xyz/D61NhW9td1DBw9vHCDYWjCEJfXbE5HVMcypKtWhs8Txj",
        //     attributes: [
        //         {trait_type: 'rarity', value: 'common'},
        //         {trait_type: 'background', value: 'pink'},
        //         {trait_type: 'color', value: 'red'}
        //     ],
        //     properties: {
        //         files: [
        //             {
        //                 type: "image/png",
        //                 uri: "https://devnet.irys.xyz/JBWY9P7x6VVhQNiNw83YQdpbKuBRrbwkPsmbkpti8jQy",

        //             },
        //         ],
        //     },
        //     creators: [],
        // };

        const metadata = {
            name: "hellogene",
            symbol: "GEN",
            description: "Gene is a generative art project that creates unique images using a neural network.",
            image: "https://devnet.irys.xyz/D61NhW9td1DBw9vHCDYWjCEJfXbE5HVMcypKtWhs8Txj",
            attributes: [
                {trait_type: 'rarity', value: 'common'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://devnet.irys.xyz/D61NhW9td1DBw9vHCDYWjCEJfXbE5HVMcypKtWhs8Txj"
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
