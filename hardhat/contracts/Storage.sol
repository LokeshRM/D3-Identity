// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Storage {
    struct Permission {
        address user;
        bool access;
    }

    mapping(address => string[]) cids;
    mapping(address => mapping(string => uint)) indexOwner;
    mapping(address => mapping(string => Permission[])) list;
    mapping(address => mapping(address => mapping(string => bool))) existList;

    mapping(address => string[]) trackShared;
    mapping(address => mapping(string => uint)) index;

    function add(string memory _cid) external {
        require(indexOwner[msg.sender][_cid] == 0, "already cid Added");
        indexOwner[msg.sender][_cid] = trackShared[msg.sender].length + 1;
        cids[msg.sender].push(_cid);
    }

    function remove(uint _index, address _user) private {
        require(_index < trackShared[_user].length, "index out of bound");
        for (uint i = _index; i < trackShared[_user].length - 1; i++) {
            trackShared[_user][i] = trackShared[_user][i + 1];
        }
        trackShared[_user].pop();
    }

    function removeCid(string memory _cid) external {
        require(indexOwner[msg.sender][_cid] > 0, "Already  cid  deleted!");
        uint _index = indexOwner[msg.sender][_cid] - 1;
        indexOwner[msg.sender][_cid] = 0;
        for (uint i = _index; i < cids[msg.sender].length - 1; i++) {
            cids[msg.sender][i] = cids[msg.sender][i + 1];
        }
        cids[msg.sender].pop();
        for (uint i = 0; i < list[msg.sender][_cid].length; i++) {
            if (index[list[msg.sender][_cid][i].user][_cid] > 0) {
                remove(
                    index[list[msg.sender][_cid][i].user][_cid] - 1,
                    list[msg.sender][_cid][i].user
                );
            }
            existList[msg.sender][list[msg.sender][_cid][i].user][_cid] = false;
        }
        delete list[msg.sender][_cid];
    }

    function grantAccess(address _user, string memory _cid) external {
        require(indexOwner[msg.sender][_cid] > 0, "you dont own file");
        require(index[_user][_cid] == 0, "already access granted");

        index[_user][_cid] = trackShared[_user].length + 1;
        trackShared[_user].push(_cid);

        if (existList[msg.sender][_user][_cid]) {
            for (uint j = 0; j < list[msg.sender][_cid].length; j++) {
                if (list[msg.sender][_cid][j].user == _user) {
                    list[msg.sender][_cid][j].access = true;
                }
            }
        } else {
            list[msg.sender][_cid].push(Permission(_user, true));
            existList[msg.sender][_user][_cid] = true;
        }
    }

    function refuseAccess(address _user, string memory _cid) public {
        require(indexOwner[msg.sender][_cid] > 0, "you dont own file");
        require(index[_user][_cid] > 0, "Already access denied!");
        remove(index[_user][_cid] - 1, _user);
        index[_user][_cid] = 0;
        for (uint i = 0; i < list[msg.sender][_cid].length; i++) {
            if (list[msg.sender][_cid][i].user == _user) {
                list[msg.sender][_cid][i].access = false;
            }
        }
    }

    function getCids(address _user) external view returns (string[] memory) {
        return cids[_user];
    }

    function sharedAccess(
        address _user,
        string memory _cid
    ) public view returns (Permission[] memory) {
        return list[_user][_cid];
    }

    function grantedAccess(
        address _user
    ) public view returns (string[] memory) {
        return trackShared[_user];
    }

    receive() external payable {}

    fallback() external payable {}
}
