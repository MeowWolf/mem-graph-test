import React, { FunctionComponent, useContext, useEffect, useRef } from 'react'
//import { Platform, ConfigContext } from '@meowwolf/react-platform-connection'
import { useWindowSize } from 'react-use'
import ForceGraph from '3d-force-graph'

import testData from './testData'
import * as THREE from 'three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

const HERO_MEM = {
  id: 'mem_hero_01a.png',
  //memory: 'memory01',
  name: 'Hero 01 A',
  color: '#2BACE2 ',
  visible: true,
}

const EMPTY_NODE = {
  id: 'empty',
}

// if no links then create mem tendrils

// build links then nodes for now. Nodes are not dynamic

function initialHeroMemLinks(heroMem: any) {
  const links = []
  for (let i = 0; i < 8; i++) {
    links.push({
      source: heroMem.id,
      target: `${heroMem.id}-empty${i}`,
      //length
      value: 1,
      color: '#2BACE2 ',
      curve: 0.5,
      rotation: -Math.PI * (i / 6),
    })
  }

  return links
}

function emptyNodes(heroMem: any) {
  const nodes = []
  for (let i = 0; i < 8; i++) {
    nodes.push({
      id: `${heroMem.id}-empty${i}`,
      name: 'empty',
      visible: false,
    })
  }

  return nodes
}

const NEW_HERO_MEM = {
  nodes: [HERO_MEM, ...emptyNodes(HERO_MEM)],
  links: initialHeroMemLinks(HERO_MEM),
}

const test = {
  nodes: [...NEW_HERO_MEM.nodes],
  links: [...NEW_HERO_MEM.links],
}

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

  // Might need a useeffect or layout hook
  const graphParent = useRef<HTMLDivElement>(null)
  // @ts-expect-error // shhh
  let Graph
  let linkForce

  let first = true

  const { width, height } = useWindowSize()

  function handleReset() {
    // @ts-expect-error // shhh
    if (Graph) {
      // @ts-expect-error // shhh
      Graph.zoomToFit(200, 0)
    }
  }

  useEffect(() => {
    if (graphParent.current !== null) {
      // build the graph
      //
      Graph = ForceGraph()(graphParent.current)
        .graphData(testData)
        .width(width * 0.8)
        .backgroundColor('#201C2D')
        .linkColor('color')
        .linkWidth(1)
        .linkResolution(8)
        .linkCurvature('curve')
        .linkOpacity(0.7)
        .linkCurveRotation('rotation')
        .nodeVisibility('visible')
        .linkVisibility('visible')
        .nodeColor('color')
        .cooldownTicks(100)
        .onNodeClick((node: any) => {
          // Aim at node from outside it
          const distance = 70
          const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

          // @ts-expect-error - dont wrry bout it bb
          Graph.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            2000, // ms transition duration
          )
        })
        .nodeThreeObject((node: any) => {
          const imgTexture = new THREE.TextureLoader().load(node.image)
          const material = new THREE.SpriteMaterial({ map: imgTexture })
          const sprite = new THREE.Sprite(material)
          sprite.scale.set(20, 20, 1)
          return sprite
        })

      // post
      // @ts-expect-error // shhh
      const bloomPass = new UnrealBloomPass()
      bloomPass.strength = 0.35
      bloomPass.radius = 1.5
      bloomPass.threshold = 0.1
      Graph.postProcessingComposer().addPass(bloomPass)

      Graph.onEngineStop(() => {
        if (first) {
          // @ts-expect-error // shhh
          Graph.zoomToFit(300, 0)
          first = false
          return
        }
      })
    }
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
    <div className="container">
      <div className="rail"></div>
      <div id="3d-graph" className="graph" ref={graphParent}></div>
      <div className="rail">
        <button onClick={() => handleReset()}>RESET</button>
      </div>
    </div>
  )
}

// const Tester: FunctionComponent = () => {
//   const config = useContext(ConfigContext)
//   useEffect(() => {
//     console.log(config)
//   }, [config])
//   return <p>Loaded Config. Things seem good to go.</p>
// }

export default App
