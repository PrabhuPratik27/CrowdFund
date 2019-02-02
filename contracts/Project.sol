pragma solidity 0.4.25;

// import "./Team.sol";

contract Projects {
    
    struct Project {
        
        string title;
        string idea;
        uint fund;
        
    }
    
    mapping(address => Project) public Projectmap;
    uint public projectCount;
    
    function setProject(string t,string i,uint f) public {
        Projectmap[msg.sender] = Project(t,i,f);
    }
    
    function getProject() public view returns(string,string,uint){
        return (Projectmap[msg.sender].title,Projectmap[msg.sender].idea,Projectmap[msg.sender].fund);
    }

    function getProjectbyaddress(address a) public view returns(string,string,uint){
        return (Projectmap[a].title,Projectmap[a].idea,Projectmap[a].fund);
    }
    
}