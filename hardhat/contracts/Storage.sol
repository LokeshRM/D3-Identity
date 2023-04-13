// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Storage {
    struct Permission {
        address user;
        bool access;
    }

    mapping(address => string[]) cids;
    mapping(address => mapping(string => Permission[])) list;
    mapping(address => mapping(address => bool)) existList;

    mapping(address => string[]) trackShared;
    mapping(address => mapping(string => uint)) index;

    function add(string memory url) external {
        cids[msg.sender].push(url);
    }

    function remove(uint _index, address _user) private {
        require(_index < trackShared[_user].length, "index out of bound");
        for (uint i = _index; i < trackShared[_user].length - 1; i++) {
            trackShared[_user][i] = trackShared[_user][i + 1];
        }
        trackShared[_user].pop();
    }

    function grantAccess(address _user, string memory _url) external {
        require(index[_user][_url] == 0, "already access granted");

        index[_user][_url] = trackShared[_user].length + 1;
        trackShared[_user].push(_url);

        if (existList[msg.sender][_user]) {
            for (uint j = 0; j < list[msg.sender][_url].length; j++) {
                if (list[msg.sender][_url][j].user == _user) {
                    list[msg.sender][_url][j].access = true;
                }
            }
        } else {
            list[msg.sender][_url].push(Permission(_user, true));
            existList[msg.sender][_user] = true;
        }
    }

    function refuseAccess(address _user, string memory _url) public {
        require(index[_user][_url] > 0, "Already access denied!");
        remove(index[_user][_url] - 1, _user);
        index[_user][_url] = 0;
        for (uint i = 0; i < list[msg.sender][_url].length; i++) {
            if (list[msg.sender][_url][i].user == _user) {
                list[msg.sender][_url][i].access = false;
            }
        }
    }

    function getCids(address _user) external view returns (string[] memory) {
        return cids[_user];
    }

    function sharedAccess(
        string memory _url
    ) public view returns (Permission[] memory) {
        return list[msg.sender][_url];
    }

    function grantedAccess() public view returns (string[] memory) {
        return trackShared[msg.sender];
    }

    receive() external payable {}

    fallback() external payable {}
}
