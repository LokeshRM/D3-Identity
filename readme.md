
# Decentralized Identity Management

This project is a decentralized digital solution that empowers users to securely `control and manage` their personal data, documents, files, and pictures without dependence on centralized intermediaries.

## Description

Decentralized solutions provide greater control and security over personal data. A decentralized storage network, built on `blockchain technology`, allows for secure and decentralized storage and management of data without a centralized intermediary.

## Idea of Implementation
#### Generating the CID
Generate a content-based unique identifier (CID) for a file using  IPFS libraries such as ipfs-api or ipfs-http-client.
#### Smart Contract Integration
Store the generated CID in a smart contract on a blockchain like Ethereum, which can contain a mapping between the user's address and their corresponding CID to track access.
#### Access Control
The smart contract can have functions to grant or revoke access to the CID by verifying the user's authorization to access it.
#### Sharing
The smart contract can also have functions to allow users to temporarily share their CID with others by granting them access for verification purposes.
#### Security
Ensure secure coding practices, such as input validation and error handling, to prevent attacks like buffer overflows or injection attacks. Use external security tools to identify potential vulnerabilities in the smart contract.


## Features

- Secure and decentralized storage of files using `IPFS` , `Ethereum blockchain` and  `Tezos`
- User-friendly interface for uploading and downloading files
- High level of security and decentralization
- Specify access control for files and revoke access at any time
- Alternative to traditional database file storage systems.
 
## Installation

To install the application, follow these steps:

1. `Clone` the repository
2. Install the required dependencies
```
npm i
```
3. Run the application
```
npm run dev
```

## Usage

To use the application, follow these steps:

1. Upload a file to the system using the user-friendly interface
2. The file is encrypted, split into small pieces, and distributed across the network for secure and decentralized storage
3. Specify access control for the file and revoke access at any time
4. Download files by requesting the file hash through the frontend, which retrieves the metadata from the Ethereum smart contract and uses the IPFS hash to retrieve the file data from IPFS.

## Video Description
Link-> https://www.youtube.com/embed/DYUjfQajAhY

#### Screenshot of the user interface for our application:
<img src="https://user-images.githubusercontent.com/77018574/232341775-a758f44f-3e5c-48b6-a1fb-fc7c25514587.png" width=50% height=50%>
<img src="https://user-images.githubusercontent.com/77018574/232341779-da4f8175-390a-46d3-927f-93ce31640f41.png" width=50% height=50%>
<img src="https://user-images.githubusercontent.com/77018574/232341782-f06e0ddd-5538-48ff-ac11-e314a140950d.png" width=50% height=50%>




## Team

This project is created by `The Hack Squad`:

- [Lokesh Reddy Meda](https://github.com/LokeshRM)
- [Rahul Kumar](https://github.com/Rahul917-Kumar)
- [Abhishek Mishra](https://github.com/abhishekiiitr)

## License

This project is licensed under the [MIT License](LICENSE).


