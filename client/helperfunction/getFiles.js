import { Web3Storage } from "web3.storage";
const web3storage_key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMxMjBjZWQxZTY5NjFBNDVhRmQwMTBGMzNkQ0MwOUMzNEE5ODhEZTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODExODcxNzkyMDgsIm5hbWUiOiJwcm9qZWN0In0.VT1OBRLQVZY5sdEuqfC8Doba3ngYvIRGmsmGH014txw";

function GetAccessToken() {
    return web3storage_key;
}

function makeStorageClient() {
    return new Web3Storage({ token: GetAccessToken() });
}

export const getFun = async (cid) => {
    try {
        const client = makeStorageClient();
        const res = await client.get(cid);
        console.log(`Got a response! [${res.status}] ${res.statusText}`);
        if (!res.ok) {
          throw new Error(`failed to get ${cid}`);
        }
        const files = await res.files();
        const data = files.map((file) => {
          return {
            name: file.name,
            link: `https://${cid}.ipfs.w3s.link/${file.name}`,
          };
        });
        return data;
    } catch (error) {
        console.log(error)
    }
    
};

export const getContent = async (cids) => {
    const res = [];
    cids.forEach(async (cid) => {
        let t = await getFun(cid);
        if (t) {
            res.push({
                cid: cid,
                files: t,
            });
        }
    });
    return res;
};
