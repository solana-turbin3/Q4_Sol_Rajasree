import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"



// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');
// const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        //2. Convert image to generic file.
        //3. Upload image
        const image = await readFile("/home/rajasree/solana-starter/ts/cluster1/generug.png");
        const genericImg = createGenericFile(image, "generug.png", {
            displayName: "generug",
            uniqueName: "generug", contentType: "image/png",
            extension: "png", tags: [{ name: "generug", value: "generug" }]
        });
        // const image = ???

        // const [myUri] = ??? 
        const [myUri] = await umi.uploader.upload([genericImg]);
        console.log("Your image URI: ", myUri);
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
