export const TASKS = {
  level1: [
    {
      id: 1,
      title: "Blockchain Basics",
      reward: 5,
      questions: [
        {
          q: "What is Blockchain?",
          options: ["Database", "Distributed Ledger", "Server", "API"],
          answer: 1
        },
        {
          q: "What is Wallet?",
          options: ["Bank", "Crypto Storage", "Browser", "App"],
          answer: 1
        },
        {
          q: "Private Key is?",
          options: ["Password", "Secret Key", "Address", "Hash"],
          answer: 1
        }
      ]
    },
    {
      id: 2,
      title: "Crypto Basics",
      reward: 5,
      questions: [
        {
          q: "What is Bitcoin?",
          options: ["Coin", "Crypto Currency", "App", "Wallet"],
          answer: 1
        },
        {
          q: "What is Ethereum?",
          options: ["Blockchain", "Token", "Coin", "Exchange"],
          answer: 0
        },
        {
          q: "Gas Fee is?",
          options: ["Charge", "Reward", "Token", "Wallet"],
          answer: 0
        }
      ]
    },
    {
      id: 3,
      title: "Web3 Basics",
      reward: 5,
      questions: [
        {
          q: "What is Web3?",
          options: ["Internet", "Decentralized Web", "App", "Wallet"],
          answer: 1
        },
        {
          q: "What is dApp?",
          options: ["App", "Decentralized App", "Wallet", "Token"],
          answer: 1
        },
        {
          q: "What is Token?",
          options: ["Coin", "Asset", "Reward", "All"],
          answer: 3
        }
      ]
    }
  ],

  level2: [
    {
      id: 4,
      title: "Connect Wallet",
      reward: 10,
      description: "Connect your Freighter wallet"
    },
    {
      id: 5,
      title: "Send Transaction",
      reward: 15,
      description: "Send a testnet transaction"
    },
    {
      id: 6,
      title: "Check Balance",
      reward: 10,
      description: "Fetch token balance"
    }
  ],

  level3: [
    {
      id: 7,
      title: "Deploy Contract",
      reward: 25,
      description: "Deploy smart contract"
    },
    {
      id: 8,
      title: "Interact Contract",
      reward: 20,
      description: "Call contract function"
    },
    {
      id: 9,
      title: "Earn NFT Badge",
      reward: 30,
      description: "Unlock achievement NFT"
    }
  ]
}