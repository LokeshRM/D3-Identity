export const address = "0x14eE49eEeF7D0318e0006E535Ee7C6c9233262d7";
export const abi = [
    {
        stateMutability: "payable",
        type: "fallback",
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
                name: "url",
                type: "string",
            },
        ],
        name: "add",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "getCids",
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
                name: "_url",
                type: "string",
            },
        ],
        name: "grantAccess",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "grantedAccess",
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
                name: "_url",
                type: "string",
            },
        ],
        name: "refuseAccess",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_url",
                type: "string",
            },
        ],
        name: "sharedAccess",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "user",
                        type: "address",
                    },
                    {
                        internalType: "bool",
                        name: "access",
                        type: "bool",
                    },
                ],
                internalType: "struct Storage.Permission[]",
                name: "",
                type: "tuple[]",
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
