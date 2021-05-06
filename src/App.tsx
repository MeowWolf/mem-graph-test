import React, { FunctionComponent, useContext, useEffect, useRef } from 'react'
//import { Platform, ConfigContext } from '@meowwolf/react-platform-connection'
import { useWindowSize } from 'react-use'
import ForceGraph from '3d-force-graph'

import testData from './testData'
import * as THREE from 'three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

const App: FunctionComponent = () => {
  const graphParent = useRef<HTMLDivElement>(null)
  // @ts-expect-error // shhh
  let Graph
  let graphControls

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
      Graph = ForceGraph()(graphParent.current)
        .graphData(testData)
        .width(width * 0.8)
        .linkColor('color')
        .linkWidth(1)
        .linkResolution(10)
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
      bloomPass.strength = 0.36
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

      Graph.renderer().setPixelRatio(window.devicePixelRatio)

      graphControls = Graph.controls()
      // @ts-expect-error // shhh
      graphControls.maxDistance = 1000
      // @ts-expect-error // shhh
      graphControls.noPan = true
      // @ts-expect-error // shhh
      graphControls.rotateSpeed = 0.5
      // @ts-expect-error // shhh
      graphControls.zoomSpeed = 0.5
    }
  }, [graphParent.current])

  return (
    <div className="container">
      <div className="rail"></div>
      <div id="3d-graph" className="graph" ref={graphParent}></div>
      <div className="rail">
        <button
          onClick={() => handleReset()}
          style={{ marginTop: '12rem', padding: '1.5rem', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
        >
          RESET
        </button>
      </div>
    </div>
  )
}

export default App
