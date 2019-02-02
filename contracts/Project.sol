pragma solidity <= 0.4.25;

// import "./Team.sol";

contract Projects {
    
    struct Project {
        
        string title;
        string idea;
        uint fund;
        // string teamleader; 
        
    }
    
    mapping(address => Project) public Projectmap;
    mapping(uint => address) public Ati;
    uint public projectCount;
    
    function setProject(string t,string i,uint f) public {
        projectCount++;
        Ati[projectCount]=msg.sender;
        Projectmap[msg.sender] = Project(t,i,f);
    }

    function getProjectbyaddress(address a) public view returns(string,string,uint){
        return (Projectmap[a].title,Projectmap[a].idea,Projectmap[a].fund);
    }
    
}