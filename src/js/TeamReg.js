App = {

    web3Provider: null,
    contracts: {},
  
    init: function() {
      console.log("Inside the init function");

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

      console.log("Inside init web3 function");
      

      return App.initContract();
    },
  
    initContract: function() {
      $.getJSON("Teams.json", function(teams) {
        // Instantiate a new truffle contract from the artifact
        App.contracts.Teams = TruffleContract(teams);

        console.log(App.contracts.Teams);

        // Connect provider to interact with contract
        App.contracts.Teams.setProvider(App.web3Provider);
      });
    },

    store : function() {

      var ten = document.querySelector('#tname').value;
      var fn = document.querySelector('#lname').value;
      var sn = document.querySelector('#name1').value;
      var tn = document.querySelector('#name2').value;
      var ftn = document.querySelector('#name3').value;
      var fid = document.querySelector('#idl').value;
      var sid = document.querySelector('#id1').value;
      var tid = document.querySelector('#id2').value;
      var ftid = document.querySelector('#id3').value;
      var pass = document.querySelector('#pwd').value;

      console.log(ten,fn,sn,tn,ftn,fid,sid,tid,ftid);

      console.log(App.contracts.Teams);
      

      App.contracts.Teams.deployed()
      .then(function(instance){
          return instance.setTeam(ten,fn,sn,tn,ftn,fid,sid,tid,ftid);
      })
      .then(function(result){
          

          App.contracts.Teams.deployed()
          .then(function(instance){
              return instance.getTeam();
          })
          .then(function(result){
              console.log(result);

              console.log(result[5].c[0]); 
          })
          .catch(function(err){
              console.log(err);
              
          });
          
          console.log("Dekh abhi sucess hua hai");
      })
      .catch(function(err){
          console.log("error aaya bhai");
      });

      App.contracts.deployed()
      .then(function(instance){
          return instance.setPassword(pass);
      })
      .then(function(result){
          console.log("Password store is a success");
          
      })
      .catch(function(err){
          console.log(err);
          
      });

    }

}
