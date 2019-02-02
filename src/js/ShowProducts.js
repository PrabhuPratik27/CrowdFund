App ={

    web3Provider: null,
    contracts: {},
    Projects : [],
    teamname: [],
    address : [],
  
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

        // console.log("This is projects",App.contracts.Projects);

        // Connect provider to interact with contract
        App.contracts.Projects.setProvider(App.web3Provider);
      });

      $.getJSON("Teams.json", function(teams) {
        // Instantiate a new truffle contract from the artifact
        App.contracts.Teams = TruffleContract(teams);

        // console.log("This is teams",App.contracts.Teams);

        // Connect provider to interact with contract
        App.contracts.Teams.setProvider(App.web3Provider);
      });

      setTimeout(App.store,1000);   
      
    },

    store: function(){

        App.contracts.Teams.deployed()
        .then(function(instance){
            return instance.teamcount();
        })
        .then(function(result){

            // console.log(result.toNumber());
            
            App.teamcount = result.toNumber();

            for(let i=1;i<=App.teamcount;i++){
                App.contracts.Teams.deployed()
                .then(function(instance){
                    return instance.getAddressbyint(i);
                })
                .then(function(result){
    
                    App.address.push(result);
                    
                })
                .catch(function(err){
                    console.log(err);
                    
                }) 

                App.contracts.Teams.deployed()
                .then(function(instance){
                    return instance.getTeambyint(i);
                })
                .then(function(result){
    
                    App.teamname.push(result)
                    
                })
                .catch(function(err){
                    console.log(err);
                    
                })

                App.contracts.Projects.deployed()
                .then(function(instance){

                    return instance.getProjectbyaddress(App.address[App.teamcount-i]);
                })
                .then(function(result){
                    
                    App.Projects.push(result);


                    
                })
                .catch(function(err){
                    console.log(err);
                    
                })

            }
    

        })
        .catch(function(err){
            console.log(err);
        })


        setTimeout(function(){
            var embedded = $('#embedded');
            embedded.empty();

            console.log(App.Projects);

            for(let i=1;i<=App.teamcount;i++){
                var extra = "<div class=col-md-4>\
                                    <div class=\"card text-white bg-dark  mb-3 border border-primary\" style=\"width:25rem\">\
                                        <img class=\"card-img-top p-3\" src=blockchain.jpg style=width:100%>\
                                        <div class=card-body>\
                                            <h4 class=card-title>this is title</h4>\
                                            <p class=card-body></p>\
                                            <p class=card-text>Quotation : $ </p>\
                                            <a href=# class=\"btn btn-success\">Fund Project</a>\
                                        </div>\
                                    </div>\
                                </div>";
                embedded.append(extra);
            }
        },1000);

    }
}