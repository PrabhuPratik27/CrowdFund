App = {

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
      return App.initContract();
    },
  
    initContract: function() {
      $.getJSON("Teams.json", function(teams) {
        // Instantiate a new truffle contract from the artifact
        App.contracts.Teams = TruffleContract(teams);
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

      App.contracts.Teams.deployed()
      .then(function(instance){
          return instance.setTeam(ten,fn,sn,tn,ftn,fid,sid,tid,ftid);
      })
      .then(function(result){
          console.log("Dekh abhi sucess hua hai");
      })
      .catch(function(err){
          console.log("error aaya bhai");
      });

    }



}

// $(function() {
//   $(window).load(function() {
//     App.init();
//   });
// });