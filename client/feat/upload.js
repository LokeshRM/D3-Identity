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

function makeFileObjects(name) {
    const obj = { name: name };
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

    const files = [new File([blob], "folder.json")];
    return files;
}

export const HomeUploadFile = async (file, getProviderOrSigner) => {
    try {
        console.log("Uploading files to IPFS with web3.storage....");
        const client = MakeStorageClient();
        const cid = await client.put(file);
        console.log("cid", cid);
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer);
        const tx = await contract.addFile(cid, await signer.getAddress());
        await tx.wait();
        console.log("done uploaded home file!");
        return true;
    } catch (err) {
        console.log(err);
    }
};

export const HomeUploadFolder = async (folder, getProviderOrSigner) => {
    try {
        console.log("Uploading files to IPFS with web3.storage....");
        const client = MakeStorageClient();
        const file = makeFileObjects(folder);
        const cid = await client.put(file);
        console.log("cid", cid);
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer);
        const tx = await contract.addFolder(cid, await signer.getAddress());
        await tx.wait();
        console.log("done uploaded folder !");
        return true;
    } catch (err) {
        console.log(err);
    }
};

export const UploadFile = async (file, folder, getProviderOrSigner) => {
    try {
        console.log("Uploading files to IPFS with web3.storage....");
        const client = MakeStorageClient();
        const cid = await client.put(file);
        console.log("cid", cid);
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer);
        const tx = await contract.addFile(cid, folder);
        await tx.wait();
        console.log("done uploaded file!");
        return true;
    } catch (err) {
        console.log(err);
    }
};

export const UploadFolder = async (folder, parent, getProviderOrSigner) => {
    try {
        console.log("Uploading files to IPFS with web3.storage....");
        const client = MakeStorageClient();
        const file = makeFileObjects(folder);
        const cid = await client.put(file);
        console.log("cid", cid);
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer);
        const tx = await contract.addFolder(cid, parent);
        await tx.wait();
        console.log("done uploaded folder !");
        return true;
    } catch (err) {
        console.log(err);
    }
};
