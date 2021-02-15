"use strict"
import delay from 'await-delay'

async function jobPayload() {
    console.log(Date.now(), ' payload starts');
    
    await delay(Math.random() * 2000); // random timeout in [0, 2000]ms
    console.log(Date.now(),' payload ends');
}

let terminated = false;

const asyncInterval = async (afunc, interval) => {
  
  const startTime = Date.now()
  await afunc();  
  const endTime = Date.now()

  const appliedInterval = (endTime - startTime) > interval ? 0 : interval - (endTime - startTime)
 
  if(!terminated) 
    setTimeout(() => asyncInterval(afunc, interval), appliedInterval);  

};

asyncInterval(jobPayload, 1000);

['SIGINT', 'SIGTERM']
  .forEach(signal => process.on(signal, () => terminated = true));