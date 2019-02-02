App ={

    web3Provider: null,
    contracts: {},
  
    init: function() {

      return App.initWeb3();
    },
  
    initWeb3: function() {
      // TODO: refactor conditional
      if (typeof web3 !== 'undefined') {
        // If a web3 instance is already provided by Meta Mask.
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
      } else {
        // Specify default instance if no web3 instance provided
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        web3 = new Web3(App.web3Provider);
      }

      // console.log("Inside init web3 function");
      

      return App.initContract();
    },
  
    initContract: function() {
      $.getJSON("Projects.json", function(projects) {
        // Instantiate a new truffle contract from the artifact
        App.contracts.Projects = TruffleContract(projects);

        // console.log(App.contracts.Teams);

        // Connect provider to interact with contract
        App.contracts.Projects.setProvider(App.web3Provider);
      });

      App.store();
    },

    store: function(){

        App.contract.Projects.deployed()
        .then(function(instance){
            var teamcount = instance.getCount();
        })
        .then(function(result){
            console.log("Dekh success aaya kaisa");
        })
        .catch(function(err){
            console.log("Error aaya hai bhai",err);
            
        })

        for(var i=0;i<teamcount;i++){
            App.contracts.Projects.deployed()
            .then(function(instance){
                var teamname = instance.getTeambyint(i);
                var address = instance.getAddressbyint(i)
                var Project = instace.getProjectbyaddress(address);
                return Project;
            })
            .then(function(result){
                console.log("Dekh success aaya kaisa");
            })
            .catch(function(err){
                console.log("Error aaya hai bhai",err);
                
            })
        }

        console.log(teamname,Project);
    }
}