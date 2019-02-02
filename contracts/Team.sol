pragma solidity 0.4.25;

contract Teams {
    
    struct Team {
        string firstMemberName;
        string secondMemberName;
        string thirdMemberName;
        string fourthMemberName;
        uint firstcid;
        uint secondcid;
        uint thirdcid;
        uint fourthcid;
    }
    
    address private owner;
    
    mapping(uint => Team) public Teammapint;
    mapping(address => Team) public Teammap ;
    uint public teamcount;
    
    constructor() public {
        
        owner = msg.sender;
        
    }
    
    function setTeam(string fn,string sn, string tn,string ftn,uint fid,uint sid,uint tid,uint ftid) public {
        
        teamcount++;
        Teammapint[teamcount] = Team(fn,sn,tn,ftn,fid,sid,tid,ftid);
        Teammap[msg.sender] = Team(fn,sn,tn,ftn,fid,sid,tid,ftid);
        
    }
    
    function getTeam(address) public view returns (string,string,string,string,uint,uint,uint,uint){
           return (Teammap[msg.sender].firstMemberName,Teammap[msg.sender].secondMemberName,Teammap[msg.sender].thirdMemberName,Teammap[msg.sender].fourthMemberName,Teammap[msg.sender].firstcid,Teammap[msg.sender].secondcid,Teammap[msg.sender].thirdcid,Teammap[msg.sender].fourthcid);
    }
    
}