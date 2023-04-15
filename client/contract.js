export const address = "0xEF0763ABC2F3C4aF5D9f75a33bec25DAbD708f1D";
export const abi = [
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_cid",
                type: "string",
            },
            {
                internalType: "string",
                name: "_folder",
                type: "string",
            },
        ],
        name: "addFile",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_cid",
                type: "string",
            },
            {
                internalType: "string",
                name: "_folder",
                type: "string",
            },
        ],
        name: "addFolder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "cidFile",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "cidFolder",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
            {
                internalType: "string",
                name: "_folder",
                type: "string",
            },
        ],
        name: "getFiles",
        outputs: [
            {
                internalType: "string[]",
                name: "",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
            {
                internalType: "string",
                name: "_folder",
                type: "string",
            },
        ],
        name: "getFolders",
        outputs: [
            {
                internalType: "string[]",
                name: "",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        name: "indexFile",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        name: "indexFolder",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];
