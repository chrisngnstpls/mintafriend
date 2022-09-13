let web3
if (window.ethereum != null) {
    web3 = new Web3(window.ethereum)
    try {

      await window.ethereum.enable()

    } catch (error) {
      console.error(error)
    }
  }

export default web3