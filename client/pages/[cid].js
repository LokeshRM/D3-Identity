import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { getFileCids, getFolderCids } from "@/feat/getcids";
import ShowFiles from "@/components/ShowFiles";
import ShowFolder from "@/components/ShowFolder";
import { getFile, getFolder } from "@/feat/getfile";
import { useLoaderModal } from "@/store/modal_store";
const FolderStructure = (props) => {
    const [presentCid, setCid] = useState();
    const router = useRouter();
    const { count1,count2, count3, count4 } = useLoaderModal((state)=>({
      count1:state.count1,
      count2:state.count2,
      count3:state.count3,
      count4:state.count4,
    }))

    const [fetchedFiles, setfetchfiles] = useState([]);
    const [fetchedFolders, setfetchfolders] = useState([]);
    const [state, setState] = useState(false);
    const [stateFolder, setStateFolder] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState();
    const web3ModalRef = useRef();

    const resetValues = () => {
      setfetchfiles([]);
      setfetchfolders([]);
      setState(false);
      setStateFolder(false);
      setWalletConnected(false);
    };


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
      console.log("hello world inside cid file");

      if (!walletConnected) {
        web3ModalRef.current = new Web3Modal({
          network: "sepolia",
          providerOptions: {},
          disableInjectedProvider: false,
        });
      }
      connectWallet();
    }, [walletConnected, fetchedFiles, router.query.slug, count2, count1, count3, count4]);

    useEffect(() => {
      if (router.isReady) {
        const { cid } = router.query;
        console.log(cid);
        setCid(cid);
        if (walletConnected) {
          getFiles(cid);
          getFolders(cid);
        }
      }
      connectWallet();
    }, [walletConnected, router.query.slug, count2, count1, count3, count4]);

    const getFiles = async (cid) => {
        getFileCids(getProviderOrSigner, cid).then(
            (res) => {
                const newArray = [];
                if(res){
                    res.forEach((cid) => {
                        getFile(cid).then((val) => {
                            newArray.push(val[0])
                        });
                    });
                }
                console.log(newArray);
                setfetchfiles(newArray);
                setTimeout(() => {
                    setState(true);
                }, 1000);
            }
        );
    };

    const getFolders = async (cid) => {
        console.log(cid)
        getFolderCids(getProviderOrSigner, cid).then(
            (res) => {
                const newArray = [];
                if(res){
                    res.forEach((cid) => {
                        getFolder(cid).then((val) => {
                            console.log(val);
                            newArray.push(val)
                        });
                    });
                }
                console.log(newArray);
                setfetchfolders(newArray);
                setTimeout(()=>{
                    setStateFolder(true)
                },1000)
            }
        );
    };

   
    return (
      <>
        {props.openFiles == 0 ? (
          <div>
            <div>{state && <ShowFiles fetchedFiles={fetchedFiles} />}</div>
            <div>
              {stateFolder && (
                <ShowFolder
                  fetchedFolders={fetchedFolders}
                  resetValues={resetValues}
                />
              )}
            </div>
          </div>
        ) : (
          <div>{}</div>
        )}
      </>
    );
};

export default FolderStructure;
