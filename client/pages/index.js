import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { getFileCids, getFolderCids } from "@/feat/getcids";
import ShowFiles from "@/components/ShowFiles";
import ShowFolder from "@/components/ShowFolder";
import { getFile,getFolder } from "@/feat/getfile";
import { useLoaderModal } from "@/store/modal_store";
import useFileStoreModal from "@/store/filesStore";
import Loader from "@/components/Loader";
import { getFilesSharedMe, getFoldersSharedMe } from "@/feat/helper";

export default function Home(props) {
    const [fetchedFiles, setfetchfiles] = useState([]);
    const [fetchedFolders, setfetchfolders] = useState([]);
    const [state, setState] = useState(false);
    const [stateFolder, setStateFolder] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [load, setLoad] = useState(false)
    const { count1, count2, count3, count4 } = useLoaderModal((state) => ({
      count1: state.count1,
      count2: state.count2,
      count3: state.count3,
      count4: state.count4,
    }));

    const { setFiles, setFolder, files, folder } = useFileStoreModal((state)=>({
        setFiles:state.setFiles,
        setFolder:state.setFolder,
        files:state.files,
        folder:state.folder
    }))

    const web3ModalRef = useRef();

    //  to reset the values
    const resetValues = ()=>{
        setfetchfiles([])
        setfetchfolders([])
        setState(false)
        setStateFolder(false)
        setWalletConnected(false)
        
    }

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
        setLoad(true)
      if (!walletConnected) {
        web3ModalRef.current = new Web3Modal({
          network: "sepolia",
          providerOptions: {},
          disableInjectedProvider: false,
        });
      }
      connectWallet();
    }, [walletConnected, count2, count1, count3, count4]);

    const getFiles = async () => {
        const signer = await getProviderOrSigner(true);
        getFileCids(
            getProviderOrSigner,
            await signer.getAddress()
        ).then((res) => {
            const newArray = []
            if(res){
                res.forEach((cid) => {
                    getFile(cid).then((val) => {
                        newArray.push(val[0])
                    });
                });
            }
            console.log("printing new Array",newArray);
            setfetchfiles(newArray)

            // just checking values are changing or not in real time global storage
            setFiles(newArray)
            // logging out
            console.log("printing global storage", files)

            setTimeout(()=>{
                setState(true)
            },1800)
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
            if(res){
                res.forEach((cid) => {
                    getFolder(cid).then((val) => {
                        console.log(val);
                        newArray.push(val)
                    });
                });
            }
            // console.log(newArray);
            setfetchfolders(newArray)
            setTimeout(()=>{
                setStateFolder(true)
                setLoad(false);
            },1800)
        });
    };

    useEffect(() => {
        if (walletConnected) {
                getFiles();
                getFolders() 
                
        }
    }, [walletConnected,props.render]);

    return (
      <div>
        {load ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div>
            {props.openFiles == 0 ? (
              <div>
                <div>
                  {state && (
                    <ShowFiles
                      fetchedFiles={fetchedFiles}
                      getProviderOrSigner={getProviderOrSigner}
                    />
                  )}
                </div>
                <div>
                  {stateFolder && (
                    <ShowFolder
                      getProviderOrSigner={getProviderOrSigner}
                      fetchedFolders={fetchedFolders}
                      resetValues={resetValues}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div>
                {
                  <button
                    className="p-4 bg-blue-500 hover:bg-blue-300"
                    onClick={() => {
                      getFilesSharedMe(getProviderOrSigner);
                      getFoldersSharedMe(getProviderOrSigner);
                    }}
                  >
                    GET files in
                  </button>
                }
              </div>
            )}
          </div>
        )}
      </div>
    );
}
