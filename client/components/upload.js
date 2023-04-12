import { Web3Storage } from "web3.storage";
const web3storage_key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMxMjBjZWQxZTY5NjFBNDVhRmQwMTBGMzNkQ0MwOUMzNEE5ODhEZTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODExODcxNzkyMDgsIm5hbWUiOiJwcm9qZWN0In0.VT1OBRLQVZY5sdEuqfC8Doba3ngYvIRGmsmGH014txw";

function GetAccessToken() {
    return web3storage_key;
}

function MakeStorageClient() {
    return new Web3Storage({ token: GetAccessToken() });
}

export const StoreContent = async (files) => {
    console.log("Uploading files to IPFS with web3.storage....");
    const client = MakeStorageClient();
    const cid = await client.put(files);
    console.log("Stored files with cid:", cid);
    return cid;
};
