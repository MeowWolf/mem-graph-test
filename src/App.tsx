import React, { FunctionComponent, useContext, useEffect } from 'react'
import { Platform, ConfigContext } from '@meowwolf/react-platform-connection'

const App: FunctionComponent = () => {
  // if (
  //   !process.env.REACT_APP_MESSAGE_BUS_LOCATION ||
  //   !process.env.REACT_APP_PLATFORM_LOCATION ||
  //   !process.env.REACT_APP_CORE_API_PORT ||
  //   !process.env.REACT_APP_MESSAGE_BUS_PORT ||
  //   !process.env.REACT_APP_PLATFORM_TOKEN ||
  //   !process.env.REACT_APP_CORE_API_PORT
  // )
  //   return null
  console.log(process.env)
  return (
    // <Platform
    //   messageBusPort={parseInt(process.env.REACT_APP_MESSAGE_BUS_PORT)}
    //   messageBusLocation={process.env.REACT_APP_MESSAGE_BUS_LOCATION}
    //   platformToken={process.env.REACT_APP_PLATFORM_TOKEN}
    //   platformIP={process.env.REACT_APP_PLATFORM_LOCATION}
    //   coreAPIPort={parseInt(process.env.REACT_APP_CORE_API_PORT)}
    // >
    //   <Tester />
    // </Platform>
    <div>sup, bud?</div>
  )
}

const Tester: FunctionComponent = () => {
  const config = useContext(ConfigContext)
  useEffect(() => {
    console.log(config)
  }, [config])
  return <p>Loaded Config. Things seem good to go.</p>
}

export default App
