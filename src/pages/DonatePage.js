import React, { useState } from 'react'
import { prepare, request, getResult } from 'klip-sdk'
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import './DonatePage.scss'

export default function DonatePage() {
  const [SEND_REQUEST, SHOW_LOADING, SHOW_RESULT] = [1, 2, 3]

  const [step, setStep] = useState(SEND_REQUEST)

  const to = '0x61f9e95Fa5DC71218Bb4FEbDa2Bb35522EAD7Dd3'
  const bappName = '후원하기 앱'
  const amount = '1'

  const sendPrepareRequest = async () => {
    const res = await prepare.sendKLAY({ bappName, to, amount })

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
    <div className='donate-page'>
      {step === SEND_REQUEST &&
        (<>
          <div className='title'>1KLAY를<br /> 아래 주소로 후원</div>
          <div className='address'>{to}</div>
          <Button onClick={sendPrepareRequest}>KLAY 후원하기</Button>
        </>)}
      {step === SHOW_LOADING && (
        <Spinner />
      )}
      {step === SHOW_RESULT && (
        <div className='result'> 후원이 완료되었습니다!!</div>
      )}
    </div>
  )
}
