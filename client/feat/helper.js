import { providers, Contract } from "ethers";

import { address, abi } from "@/contract";

export const deleteFile = async(getProviderOrSigner, folder, cid)=>{
    try {
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer );
        const tx = await contract.deleteFile(cid, folder);
        await tx.wait();
        console.log("deleted file!");
        return true;
    } catch (err) {
        console.log(err);
    }
}

export const deleteHomeFile = async(getProviderOrSigner, folder, cid)=>{
    try {
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer );
        const tx = await contract.deleteFile(cid, await signer.getAddress());
        await tx.wait();
        console.log("deleted file!");
        return true;
    } catch (err) {
        console.log(err);
    }
}

export const deleteFolder = async(getProviderOrSigner, folder, cid)=>{
    try {
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer );
        const tx = await contract.deleteFolder(cid, folder);
        await tx.wait();
        console.log("deleted folder!");
        return true;
    } catch (err) {
        console.log(err);
    }
}

export const deleteHomeFolder = async(getProviderOrSigner, folder, cid)=>{
    try {
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer );
        const tx = await contract.deleteFolder(cid, await signer.getAddress());
        await tx.wait();
        console.log("deleted folder!");
        return true;
    } catch (err) {
        console.log(err);
    }
}


export const giveAccessFile = async(getProviderOrSigner, user, cid)=>{
    try {
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer );
        const tx = await contract.giveAccessFile(user, cid);
        await tx.wait();
        console.log("given access file!");
        return true;
    } catch (err) {
        console.log(err);
    }
}



export const giveAccessFolder = async(getProviderOrSigner, user, cid)=>{
    try {
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer );
        const tx = await contract.giveAccessFolder(user, cid);
        await tx.wait();
        console.log("given access folder!");
        return true;
    } catch (err) {
        console.log(err);
    }
}




export const revokeAccessFile = async(getProviderOrSigner, user, cid)=>{
    try {
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer );
        const tx = await contract.revokeAccessFile(user, cid);
        await tx.wait();
        console.log("revoked access file!");
        return true;
    } catch (err) {
        console.log(err);
    }
}

export const revokeAccessFolder = async(getProviderOrSigner, user, cid)=>{
    try {
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(address, abi, signer );
        const tx = await contract.revokeAccessFolder(user, cid);
        await tx.wait();
        console.log("revoked access folder!");
        return true;
    } catch (err) {
        console.log(err);
    }
}

export const getSharedFiles = async(getProviderOrSigner, cid)=>{
    try {
        const provider = await getProviderOrSigner();
        const contract = new Contract(address, abi, provider );
        const signer = await provider.getSigner();
        const data = await contract.getSharedFiles(await signer.getAddress(), cid);
        console.log("got users who has access to these file!");
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}
 

export const getSharedFolders = async(getProviderOrSigner, cid)=>{
    try {
        const provider = await getProviderOrSigner();
        const contract = new Contract(address, abi, provider );
        const signer = await provider.getSigner();
        const data = await contract.getSharedFolders(await signer.getAddress(), cid);
        console.log("got users who has access to these folder!");
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

