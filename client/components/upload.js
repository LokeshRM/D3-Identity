import { Web3Storage } from "web3.storage";
import { providers, Contract } from "ethers";
import { abi, address } from "@/contract";
const web3storage_key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMxMjBjZWQxZTY5NjFBNDVhRmQwMTBGMzNkQ0MwOUMzNEE5ODhEZTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODExODcxNzkyMDgsIm5hbWUiOiJwcm9qZWN0In0.VT1OBRLQVZY5sdEuqfC8Doba3ngYvIRGmsmGH014txw";

function GetAccessToken() {
    return web3storage_key;
}

function MakeStorageClient() {
    return new Web3Storage({ token: GetAccessToken() });
}

export const StoreContent = async (files, getProviderOrSigner) => {
    try {
        console.log("Uploading files to IPFS with web3.storage....");
        const client = MakeStorageClient();
        const cid = await client.put(files);
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer);
        const tx = await contract.add(cid);
        await tx.wait();
        alert("done !");
        return true;
    } catch (err) {
        console.log(err);
    }
};
