import { providers, Contract } from "ethers";

import { address, abi } from "@/contract";

export const getFileCids = async (getProviderOrSigner, folder) => {
    try {
        const provider = await getProviderOrSigner();
        const contract = new Contract(address, abi, provider);
        const signer = await provider.getSigner();
        const data = await contract.getFiles(await signer.getAddress(), folder);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

export const getFolderCids = async (getProviderOrSigner, folder) => {
    try {
        const provider = await getProviderOrSigner();
        const contract = new Contract(address, abi, provider);
        const signer = await provider.getSigner();
        const data = await contract.getFolders(
            await signer.getAddress(),
            folder
        );
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};
