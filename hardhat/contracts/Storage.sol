// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Storage {
    struct Permission {
        address user;
        bool access;
    }

    mapping(address => mapping(string => string[])) cidFile;
    mapping(address => mapping(string => string[])) cidFolder;

    mapping(address => mapping(string => mapping(string => uint))) indexFile;
    mapping(address => mapping(string => mapping(string => uint))) indexFolder;

    mapping(address => string[]) sharedFile;
    mapping(address => string[]) sharedFolder;

    mapping(address => mapping(string => Permission[])) trackFile;
    mapping(address => mapping(string => Permission[])) trackFolder;

    mapping(address => mapping(string => uint)) isharedFile;
    mapping(address => mapping(string => uint)) isharedFolder;

    function addFile(string memory _cid, string memory _folder) external {
        require(indexFile[msg.sender][_folder][_cid] == 0, "already cid Added");
        indexFile[msg.sender][_folder][_cid] =
            cidFile[msg.sender][_folder].length +
            1;
        cidFile[msg.sender][_folder].push(_cid);
    }

    function removeOwnerFile(
        uint _index,
        address _user,
        string memory _folder
    ) private {
        require(_index < cidFile[_user][_folder].length, "index out of bound");
        for (uint i = _index; i < cidFile[_user][_folder].length - 1; i++) {
            cidFile[_user][_folder][i] = cidFile[_user][_folder][i + 1];
        }
        cidFile[_user][_folder].pop();
    }

    function deleteFile(string memory _cid, string memory _folder) external {
        require(
            indexFile[msg.sender][_folder][_cid] > 0,
            "already cid deleted"
        );
        removeOwnerFile(
            indexFile[msg.sender][_folder][_cid]-1,
            msg.sender,
            _folder
        );
        for (uint i = 0; i < trackFile[msg.sender][_cid].length; i++) {
            if (isharedFile[trackFile[msg.sender][_cid][i].user][_cid] > 0) {
                revokeAccessFile(trackFile[msg.sender][_cid][i].user, _cid);
            }
        }
        delete trackFile[msg.sender][_cid];
        indexFile[msg.sender][_folder][_cid] = 0;
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

    function removeOwnerFolder(
        uint _index,
        address _user,
        string memory _folder
    ) private {
        require(
            _index < cidFolder[_user][_folder].length,
            "index out of bound"
        );
        for (uint i = _index; i < cidFolder[_user][_folder].length - 1; i++) {
            cidFolder[_user][_folder][i] = cidFolder[_user][_folder][i + 1];
        }
        cidFolder[_user][_folder].pop();
    }

    function deleteFolder(string memory _cid, string memory _folder) external {
        require(
            indexFolder[msg.sender][_folder][_cid] > 0,
            "already cid deleted"
        );
        removeOwnerFolder(
            indexFolder[msg.sender][_folder][_cid]-1,
            msg.sender,
            _folder
        );
        for (uint i = 0; i < trackFolder[msg.sender][_cid].length; i++) {
            if (isharedFile[trackFolder[msg.sender][_cid][i].user][_cid] > 0) {
                revokeAccessFolder(trackFolder[msg.sender][_cid][i].user, _cid);
            }
        }
        delete trackFolder[msg.sender][_cid];
        indexFolder[msg.sender][_folder][_cid] = 0;
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

    function giveAccessFile(address _user, string memory _file) external {
        require(isharedFile[_user][_file] == 0, "already given");
        isharedFile[_user][_file] = sharedFile[_user].length + 1;
        trackFile[msg.sender][_file].push(Permission(_user, true));
        sharedFile[_user].push(_file);
    }

    function removeFile(uint _index, address _user) private {
        require(_index < sharedFile[_user].length, "index out of bound");
        for (uint i = _index; i < sharedFile[_user].length - 1; i++) {
            sharedFile[_user][i] = sharedFile[_user][i + 1];
        }
        sharedFile[_user].pop();
    }

    function revokeAccessFile(address _user, string memory _file) public {
        require(isharedFile[_user][_file] > 0, "already access revoked");
        removeFile(isharedFile[_user][_file], _user);
        for (uint i = 0; i < trackFile[msg.sender][_file].length; i++) {
            if (trackFile[msg.sender][_file][i].user == _user) {
                trackFile[msg.sender][_file][i].access = false;
                break;
            }
        }
        isharedFile[_user][_file] = 0;
    }

    function giveAccessFolder(address _user, string memory _file) external {
        require(isharedFolder[_user][_file] == 0, "already given access");
        isharedFolder[_user][_file] = sharedFolder[_user].length + 1;
        trackFolder[msg.sender][_file].push(Permission(_user, true));
        sharedFolder[_user].push(_file);
    }

    function removeFolder(uint _index, address _user) private {
        require(_index < sharedFolder[_user].length, "index out of bound");
        for (uint i = _index; i < sharedFolder[_user].length - 1; i++) {
            sharedFolder[_user][i] = sharedFolder[_user][i + 1];
        }
        sharedFolder[_user].pop();
    }

    function revokeAccessFolder(address _user, string memory _file) public {
        require(isharedFolder[_user][_file] > 0, "already access revoked");
        removeFolder(isharedFolder[_user][_file], _user);
        for (uint i = 0; i < trackFolder[msg.sender][_file].length; i++) {
            if (trackFolder[msg.sender][_file][i].user == _user) {
                trackFolder[msg.sender][_file][i].access = false;
                break;
            }
        }
        isharedFolder[_user][_file] = 0;
    }

    function getSharedFiles(
        address _user,
        string memory _cid
    ) external view returns (Permission[] memory) {
        return trackFile[_user][_cid];
    }

    function getSharedFolders(
        address _user,
        string memory _cid
    ) external view returns (Permission[] memory) {
        return trackFolder[_user][_cid];
    }

    receive() external payable {}

    fallback() external payable {}
}
