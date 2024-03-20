import { Web3Storage } from "web3.storage";
const web3storage_key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMxMjBjZWQxZTY5NjFBNDVhRmQwMTBGMzNkQ0MwOUMzNEE5ODhEZTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODE1NTM5NDAzNzQsIm5hbWUiOiJnZXRmaWxlIn0.B2zq3OPm1_YWEdxPdeuDpv1AsLZ5DiB6klTBO5TKLZQ";
const JWT = "";
function GetAccessToken() {
    return web3storage_key;
}

function makeStorageClient() {
    return new Web3Storage({ token: GetAccessToken() });
}

export const getFile = async (cid) => {
    // const client = makeStorageClient();
    // const res = await client.get(cid);
    // console.log(`Got a response! [${res.status}] ${res.statusText}`);
    // if (!res.ok) {
    //     throw new Error(`failed to get ${cid}`);
    // }
    // const files = await res.files();
    // const data = files.map((file) => {
    //     return {
    //         name: file.name,
    //         cid : cid,
    //         link: `https://${cid}.ipfs.w3s.link/${file.name}`,
    //     };
    // });
    const res = await fetch("https://api.pinata.cloud/data/pinList", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
        },
    });
    const data = await res.json();
    const pinnedItem = data.rows.filter(
        (item) => item.ipfs_pin_hash === cid
    )[0];
    return [
        {
            name: pinnedItem.metadata.name || "Name not available",
            cid: cid,
            link:
                "https://sapphire-wonderful-manatee-412.mypinata.cloud/ipfs/" +
                cid,
        },
    ];
};

export const getFolder = async (cid) => {
    let name;
    await fetch(
        "https://sapphire-wonderful-manatee-412.mypinata.cloud/ipfs/" + cid
    )
        .then((res) => {
            return res.json();
        })
        .then((data) => (name = data.folder_name));
    return { name: name, cid: cid };
};
