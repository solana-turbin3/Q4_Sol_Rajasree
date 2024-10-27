import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// import bs58, { decode } from 'bs58';

// const decodedPrivateKey = bs58.decode(wallet.private_key);
// console.log('Private Key:', decodedPrivateKey);
// const keypair = Keypair.fromSecretKey(decodedPrivateKey);

// console.log('Public Key:', keypair.publicKey.toBase58());
// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Start here
        // const mint = ???

        const mint = await createMint(connection, keypair, keypair.publicKey, null, 6);
        console.log('Mint Address:', mint.toBase58());
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
