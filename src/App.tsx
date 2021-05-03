import React, { FunctionComponent, useContext, useEffect, useRef } from 'react'
import { Platform, ConfigContext } from '@meowwolf/react-platform-connection'
import ForceGraph from '3d-force-graph'

import testData from './testData'
import * as THREE from 'three'

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
  let graph
  let linkForce

  console.log()

  useEffect(() => {
    if (graphParent.current !== null) {
      // build the graph
      //
      graph = ForceGraph()(graphParent.current)
        .graphData(testData)
        .linkColor('color')
        .linkWidth(1)
        .linkCurvature('curve')
        .linkOpacity(0.7)
        .linkCurveRotation('rotation')
        .nodeVisibility('visible')
        .linkVisibility('visible')
        .nodeColor('color')
        .nodeThreeObject((node: any) => {
          const imgTexture = new THREE.TextureLoader().load(node.image)
          const material = new THREE.SpriteMaterial({ map: imgTexture })
          const sprite = new THREE.Sprite(material)
          sprite.scale.set(20, 20, 1)
          return sprite
        })

      linkForce = graph.d3Force('link')

      // @ts-expect-error // This matches the docs. its fine.
      linkForce?.distance((link: any) => {
        // hi

        return 75
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
    <>
      <div id="3d-graph" className="test" ref={graphParent}></div>
      <div className="test">sup, bud?</div>
    </>
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
