App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access if needed
        App.accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(window.ethereum);
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    App.account = App.accounts[0];
    console.log(App.account);
  },

  loadContract: async () => {
    // Create JavaScript version of smart contract
    const todoList = await $.getJSON('TodoList.json');
    App.contracts.TodoList = TruffleContract(todoList);
    App.contracts.TodoList.setProvider(App.web3Provider);

    // Hydrate the smart contract with the values from blockchain
    App.todoList = await App.contracts.TodoList.deployed();
  },

  render: async () => {
    if(App.loading) {
      return;
    }

    App.setLoading(true);

    // Render Account
    $('#account').html(App.account);

    // Render Tasks
    await App.renderTasks();

    App.setLoading(false);
  },

  renderTasks: async () => {
    // Load the total task count from blockchain
    const taskCount = await App.todoList.taskCount();
    console.log("Task Count: " + taskCount);
    const $taskTemplate = $('.taskTemplate');

    // Render out each task with a new task template
    for(let i=1; i <= taskCount; i++) {
      const $newTaskTemplate = $taskTemplate.clone();
      
      const task = await App.todoList.tasks(i);
      const taskId = task[0].toNumber();
      const taskContent = task[1];
      const taskCompleted = task[2];

      $newTaskTemplate.find('.content').html(taskContent);
      $newTaskTemplate.find('input')
                      .prop('name', taskId)
                      .prop('checked', taskCompleted)
                      // .on('click', App.toggleCompleted)
      
      // Put the task in correct list
      if(taskCompleted) {
        $('#completedTaskList').append($newTaskTemplate);
      } else {
        $('#taskList').append($newTaskTemplate);
      }
      
      // Show the task
      $newTaskTemplate.show();
    }
  },

  createTask: async () => {
    App.setLoading(true);

    const content = $("#newTask").val();
    await App.todoList.createTask(content, {from: App.account});
    window.location.reload();
  },

  setLoading: (isLoading) => {
    App.loading = isLoading;
    const loader = $('#loader');
    const content = $('#content');

    if(isLoading) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load();
  })
})
