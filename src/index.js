
import axios from 'axios'
import './styles/main.scss'
import web3 from './getWeb3'
import { metadata } from './metadata'

let CONTRACT =( process.env.CONTRACT || "0x17cb5e9674b0b1b510b9cad518290fe18b7c5ccb")

const showAll = async () => {
        const config={
        method:'GET',
        url:'https://thentic.p.rapidapi.com/contracts',
        params:{key: process.env.API_KEY, chain_id: '4'},
        headers:{
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'thentic.p.rapidapi.com'            
        }
    }
    let contract = null;
    try{
        const response = await axios.request(config)
        console.log(response.data)
        contract = response.data.contracts[0].contract
    } catch(err){
        console.error(err)
    }
    return contract
}

const getNft = async () => {
    let nextId = null;
    const config={
        method:'GET',
        url:'https://thentic.p.rapidapi.com/nfts',
        params:{key: process.env.API_KEY, chain_id: '4'},
        headers:{
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'thentic.p.rapidapi.com'            
        }
    }
    try{
        const response = await axios.request(config)
        nextId = response.data.nfts.length
    }catch(err){
        console.error(err)
    }
    return nextId
}

const mintNft = async(_contract, _recipient, _id, _data) => {
        const config = {
        method:'POST',
        url: 'https://thentic.p.rapidapi.com/nfts/mint',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
          },
        data:`{"key":"${process.env.API_KEY}","chain_id":"4","contract":"${_contract}","nft_id":"${_id}","nft_data":"${_data}","to":"${_recipient}"}`
    }
    try{
        let response = await axios.request(config)
        if (response.status == 200){
            console.log(response)
            window.location.href = response.data.transaction_url
        }
        console.log(await response)
    }catch(err){
        console.error(err)
    }
}


const loadContent = async () => {
    let parent = document.getElementById('options')
    
    
    for (let option in metadata){
        let tr = document.createElement('tr')
        let image = document.createElement('img')
        image.src = metadata[option].link
        image.style.width='64px'
        let name = document.createElement('td')
        let trait_1 = document.createElement('td')
        let trait_2 = document.createElement('td')
        
        trait_1.innerText= metadata[option].traits.trait_1
        trait_2.innerText = metadata[option].traits.trait_2
        name.innerText = metadata[option].option
        tr.appendChild(image)
        tr.appendChild(name)
        tr.appendChild(trait_1)
        tr.appendChild(trait_2)
        tr.id=metadata[option].id
        parent.appendChild(tr)
    }

}

const main = async () => {

    let randomItem = metadata[Math.floor(Math.random()*metadata.length)]
    const contract = process.env.CONTRACT
    const id = await getNft()
    const makeBtn = document.getElementById('makeBtn')
    const myAddress = await web3.eth.getAccounts()
    document.getElementById('contract').innerHTML = 'Minting on contract : '  + CONTRACT
    document.getElementById('totalNfts').innerHTML = 'Next NFT id : ' + id
    makeBtn.addEventListener('click', function(){
        console.log(randomItem)
        mintNft(contract,myAddress, id.toString(), randomItem)
    })
    loadContent()
}

main()



