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

      // console.log("Inside init web3 function");
      

      return App.initContract();
    },
  
    initContract: function() {
      $.getJSON("Teams.json", function(teams) {
        // Instantiate a new truffle contract from the artifact
        App.contracts.Teams = TruffleContract(teams);

        // console.log(App.contracts.Teams);

        // Connect provider to interact with contract
        App.contracts.Teams.setProvider(App.web3Provider);
      });
    },


}