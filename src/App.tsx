import React, { FunctionComponent, useContext, useEffect, useRef } from 'react'
import { Platform, ConfigContext } from '@meowwolf/react-platform-connection'
import ForceGraph from '3d-force-graph'

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

  // Might need a useeffect or layout hook
  const graphParent = useRef<HTMLDivElement>(null)
  let Graph

  useEffect(() => {
    if (graphParent.current !== null) {
      Graph = ForceGraph()(graphParent.current)
    }
    // return () => {
    //   cleanup
    // }
  }, [graphParent.current])

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
    <div id="3d-graph" ref={graphParent}>
      sup, bud?
    </div>
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
