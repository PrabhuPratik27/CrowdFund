pragma solidity <= 0.4.25;

// import "./Team.sol";

contract Projects {
    
    struct Project {
        
        string title;
        string idea;
        uint fund;
        string teamleader; 
        
    }
    
    mapping(uint => Project) public Projectmap;
    uint public projectCount;
    
    function setProject(string t,string i,uint f,string tl) public {
        projectCount++;
        Projectmap[projectCount] = Project(t,i,f,tl);
    }

    function getProjectbyaddress(uint a) public view returns(string,string,uint){
        return (Projectmap[a].title,Projectmap[a].idea,Projectmap[a].fund);
    }
    
}