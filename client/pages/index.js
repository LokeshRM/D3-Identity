import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { getFileCids, getFolderCids } from "@/feat/getcids";
import ShowFiles from "@/components/ShowFiles";
import ShowFolder from "@/components/ShowFolder";
import { getFile,getFolder } from "@/feat/getfile";

export default function Home(props) {
    const [fetchedFiles, setfetchfiles] = useState([]);
    const [fetchedFolders, setfetchfolders] = useState([]);
    const [state, setState] = useState(false);
    const [stateFolder, setStateFolder] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState();
    const web3ModalRef = useRef();

    const getProviderOrSigner = async (needSigner = false) => {
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);

        const { provider: ethereum } = web3Provider;
        ethereum.on("accountsChanged", connectWallet);
        ethereum.on("accountsChanged", connectWallet);

        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== 11155111) {
            window.alert("Change the network to sepolia");
            throw new Error("Change network to sepolia");
        }
        if (needSigner) {
            const signer = web3Provider.getSigner();
            return signer;
        }
        return web3Provider;
    };

    const connectWallet = async () => {
        try {
            const signer = await getProviderOrSigner(true);
            const userAddress = await signer.getAddress();
            setWalletAddress(userAddress.toString());
            setWalletConnected(true);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!walletConnected) {
            web3ModalRef.current = new Web3Modal({
                network: "sepolia",
                providerOptions: {},
                disableInjectedProvider: false,
            });
        }
        connectWallet();
    }, [walletConnected]);

    const getFiles = async () => {
        const signer = await getProviderOrSigner(true);
        getFileCids(
            getProviderOrSigner,
            await signer.getAddress()
        ).then((res) => {
            const newArray = []
            res.forEach((cid) => {
                getFile(cid).then((val) => {
                    newArray.push(val[0])
                });
            });
            console.log(newArray);
            setfetchfiles(newArray)
            setTimeout(()=>{
                setState(true)
            },1500)
        });
    };

    const getFolders = async () => {
        const signer = await getProviderOrSigner(true);
        getFolderCids(
            getProviderOrSigner,
            await signer.getAddress()
        ).then((res) => {
            const newArray = []
            console.log(res);
            res.forEach((cid) => {
                getFolder(cid).then((val) => {
                    console.log(val);
                    newArray.push(val)
                });
            });
            console.log(newArray);
            setfetchfolders(newArray)
            // setTimeout(()=>{
            //     setStateFolder(true)
            // },1500)
        });
    };

    useEffect(() => {
        if (walletConnected) {
            getFiles();
         getFolders()
        }
    }, [walletConnected]);

    return <>{props.openFiles == 0 ? <div> 
    <div>

    {
        state && <ShowFiles fetchedFiles={fetchedFiles} />
    }
    </div>
    <div>
        {
            state && <ShowFolder fetchedFolders={fetchedFolders} />
        }
    </div>
    </div> : <div>
       {}
    </div>}</>;
}
