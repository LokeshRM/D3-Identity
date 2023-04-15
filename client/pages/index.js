import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { StoreContent } from "@/helperfunction/upload";
import { getContent } from "@/helperfunction/getFiles";
import { address, abi } from "@/contract";
import Navbar from "@/components/navbar";
import { HomeUploadFile, HomeUploadFolder } from "@/feat/upload";
import { getFolder } from "@/feat/getfile";
import DropFileInput from "@/components/draganddrop";
import Modal from "@/components/Modal";

export default function Home() {
    const [selectedFile, setSelectedFile] = useState([]);
    const [uploadedFiles, setuploadedFles] = useState([]);
    const [state, setState] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const [cidSelected, setCidSelected] = useState();

    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState();
    const web3ModalRef = useRef();

    const inputRef = useRef();

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

    const getUserCids = async () => {
        try {
            const provider = await getProviderOrSigner();
            const contract = new Contract(address, abi, provider);
            const signer = await provider.getSigner();
            const data = await contract.getCids(await signer.getAddress());
            const file = await getContent(data);
            setState(false);
            console.log(file);
            console.log(file.length);
            setuploadedFles(file);
            setTimeout(() => {
                setState(true);
            }, 1000);
        } catch (err) {
            console.log(err);
        }
    };

    const shareFile = async (user) => {
        try {
            const signer = await getProviderOrSigner(true);
            const contract = new Contract(address, abi, signer);
            const tx = await contract.grantAccess(user, cidSelected);
            await tx.wait();
            console.log("shared access");
        } catch (err) {
            console.log(err);
        }
    };

    const deleteCid = async () => {
        try {
            const signer = await getProviderOrSigner(true);
            const contract = new Contract(address, abi, signer);
            const tx = await contract.removeCid(cidSelected);
            await tx.wait();
            console.log("removed Cid");
        } catch (err) {
            console.log(err);
        }
    };

    const getSharedAccess = async () => {
        try {
            const provider = await getProviderOrSigner();
            const contract = new Contract(address, abi, provider);
            const signer = await provider.getSigner();
            const data = await contract.sharedAccess(
                await signer.getAddress(),
                cidSelected
            );
            console.log(data);
            console.log("data been shared");
        } catch (err) {
            console.log(err);
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
    }, [walletConnected]);

    // useEffect(() => {
    //     if (walletConnected) {
    //         getUserCids();
    //     }
    // }, [walletConnected]);

    const uploadit = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            try {
                const status = await StoreContent(
                    selectedFile,
                    getProviderOrSigner
                );
                console.log(status);
                setSelectedFile([]);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("file not selected");
        }
    };

    return (
        <>
            {/* navbar */}

            <div className="mb-20">
                <Navbar
                    walletConnected={walletConnected}
                    currentAccount={walletAddress}
                    connectWallet={connectWallet}
                    disconnect={(x) => {
                        setWalletConnected(x);
                        setState(x);
                    }}
                />
            </div>

            <input ref={inputRef} type="text" id="message" name="message" />

            <button
                className="p-5 bg-gray-500"
                onClick={() => {
                    HomeUploadFolder(
                        inputRef.current.value,
                        getProviderOrSigner
                    );
                }}
            >
                {" "}
                new folder
            </button>

            <input
                type="file"
                onChange={(e) => {
                    const newFile = e.target.files[0];
                    if (newFile) {
                        const updatedList = [newFile];
                        setSelectedFile(updatedList);
                    }
                }}
            />

            <button
                onClick={() =>
                    HomeUploadFile(selectedFile, getProviderOrSigner)
                }
                className="my-5  flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                        font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
                Upload
            </button>

            {/* input element */}
            {/* <div> */}
            {/* <DropFileInput
                onFileChange={(files) => setSelectedFile(files)}
                onFilespresent={selectedFile}
            /> */}

            {/* display files */}

            {/* <div>
                    {selectedFile.map((file, i) => (
                        <div key={i}>{file.name}</div>
                    ))}
                </div> */}
            {/* upload elemnet */}
            {/* <div>
                    <button
                        onClick={uploadit}
                        type="submit"
                        className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                        font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                    >
                        Upload
                    </button>
                </div> */}

            {/* refresh element */}
            {/* 
                <div>
                    <button
                        onClick={getUserCids}
                        type="submit"
                        className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                        font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                    >
                        refresh
                    </button>
                </div> */}

            {/* display files that have been uploaded */}

            {/* <Modal
                    status={shareModal}
                    changeStatus={setShareModal}
                    addUser={shareFile}
                /> */}

            {/* {state &&
                    uploadedFiles.map((file, i) => (
                        <div className="p-4">
                            <div className="group relative">
                                <button
                                    type="button"
                                    key={i}
                                    onClick={() => {
                                        setCidSelected(file.cid);
                                        //setShareModal(true);
                                    }}
                                    className="bg-blue-200 text-black active:bg-blue-500 
        font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                >
                                    {file.cid}
                                </button>
                                <nav className="border border-2 bg-white invisible border-gray-800 rounded w-60 absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1">
                                    <ul className="py-1">
                                        <li key="1">
                                            <a
                                                href="#"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={() => {
                                                    setShareModal(true);
                                                }}
                                            >
                                                share
                                            </a>
                                        </li>
                                        <li key="2">
                                            <a
                                                href="#"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={deleteCid}
                                            >
                                                Delete
                                            </a>
                                        </li>
                                        <li key="3">
                                            <a
                                                href="#"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={getSharedAccess}
                                            >
                                                getSharedDetails
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    ))} */}
            {/* </div> */}
        </>
    );
}
