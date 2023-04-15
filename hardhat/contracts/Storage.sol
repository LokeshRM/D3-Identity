// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Storage {
    mapping(address => mapping(string => string[])) public cidFile;
    mapping(address => mapping(string => string[])) public cidFolder;

    mapping(address => mapping(string => mapping(string => uint)))
        public indexFile;
    mapping(address => mapping(string => mapping(string => uint)))
        public indexFolder;

    function addFile(string memory _cid, string memory _folder) external {
        require(indexFile[msg.sender][_folder][_cid] == 0, "already cid Added");
        indexFile[msg.sender][_folder][_cid] =
            cidFile[msg.sender][_folder].length +
            1;
        cidFile[msg.sender][_folder].push(_cid);
    }

    function addFolder(string memory _cid, string memory _folder) external {
        require(
            indexFolder[msg.sender][_folder][_cid] == 0,
            "already cid Added"
        );
        indexFolder[msg.sender][_folder][_cid] =
            cidFolder[msg.sender][_folder].length +
            1;
        cidFolder[msg.sender][_folder].push(_cid);
    }

    function getFiles(
        address _user,
        string memory _folder
    ) external view returns (string[] memory) {
        return cidFile[_user][_folder];
    }

    function getFolders(
        address _user,
        string memory _folder
    ) external view returns (string[] memory) {
        return cidFolder[_user][_folder];
    }

    receive() external payable {}

    fallback() external payable {}
}
