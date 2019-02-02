pragma solidity 0.4.25;

contract Projects{
    
    struct Project {
        
        string title;
        string idea;
        
    }
    
    mapping(address => Project) public Projectmap;
    uint public projectCount;
    
    function setProject(string t,string i) public{
        Projectmap[msg.sender] = Project(t,i);
    }
    
    function getProject() public view returns(string,string){
        return (Projectmap[msg.sender].title,Projectmap[msg.sender].idea);
    }
    
}