import React, { useState } from 'react'
import { prepare, request, getResult } from 'klip-sdk'
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import './SendMessagePage.scss'

export default function SendMessagePage() {
  const [SEND_REQUEST, SHOW_LOADING, SHOW_RESULT] = [1, 2, 3]

  const [step, setStep] = useState(SEND_REQUEST)
  const [message, setMessage] = useState("")

  const sendPrepareRequest = async () => {
    const bappName = '후원하기 앱'
    const to = '0x2200164c4d78bc4e5e3CCAFA3bc7E006d345f3C0'
    const value = '0'
    const abi = JSON.stringify(
      {
        "constant": false,
        "inputs": [
          {
            "name": "message",
            "type": "string"
          }
        ],
        "name": "writeMessage",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    )
    const params = `[\"${message}\"]`
    const res = await prepare.executeContract({ bappName, to, value, abi, params })

    if (res.request_key) {
      setStep(SHOW_LOADING)
      request(res.request_key)
      startPollingResult(res.request_key)
    }
  }

  const startPollingResult = (requestKey) => {
    const id = setInterval(async () => {
      const res = await getResult(requestKey)
      if (res.status === 'completed') {
        clearTimeout(id)
        setStep(SHOW_RESULT)
      }
    }, 1000);
  }

  return (
    <div className='send-message-page'>
      {step === SEND_REQUEST &&
        (<>
          <div className='title'>후원 메시지를 적어주세요</div>
          <input type="text" onChange={(e) => setMessage(e.target.value)} />
          <Button onClick={sendPrepareRequest}>후원 메시지 보내기</Button>
        </>)}
      {step === SHOW_LOADING && (
        <Spinner />
      )}
      {step === SHOW_RESULT && (
        <div className='result'>
          <img src="https://klipwallet.com/img/home-klip-user-guide-event.png" />
          <div className='message'>
            후원 메시지가<br /> 블록체인에 기록되었습니다!!
        </div>
        </div>
      )}
    </div>
  )
}
