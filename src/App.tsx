import React, { FunctionComponent, useContext, useEffect, useRef } from 'react'
import { createBreakpoint, useWindowSize } from 'react-use'
import * as THREE from 'three'
import * as d3 from 'd3'
import ForceGraph from '3d-force-graph'
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing'

import testData from './testData'

import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

const useBreakpoint = createBreakpoint()

const App: FunctionComponent = () => {
  const graphParent = useRef<HTMLDivElement>(null)
  const breakpoint = useBreakpoint()

  let Graph
  let graphControls
  let nodeRotateInterval

  let first = true

  const { width, height } = useWindowSize()

  function handleReset() {
    if (Graph) {
      Graph.zoomToFit(200, 0)
    }
  }

  function createSpriteNode(node: any): THREE.Object3D {
    const imgTexture = new THREE.TextureLoader().load(node.image)
    const material = new THREE.SpriteMaterial({ map: imgTexture })

    const sprite = new THREE.Sprite(material)

    if (node.image.includes('memory')) {
      sprite.scale.set(100, 100, 1)
    } else {
      sprite.scale.set(20, 20, 1)
    }

    if (node.id.includes('Complete')) {
      sprite.scale.set(30, 30, 1)
    }

    if (node.id.includes('Main')) {
      sprite.scale.set(150, 150, 1)
    }

    return sprite
  }

  function zoomCameraToNode(node: any): void {
    // Aim at node from outside it
    const distance = 70
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

    Graph.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      1500, // ms transition duration
    )

    // let angle = 0
    // setTimeout(() => {
    //   nodeRotateInterval = setInterval(() => {
    //     // @ts-expect-error - dont wrry bout it bb
    //     Graph.cameraPosition({
    //       x: distance * Math.sin(angle),
    //       z: distance * Math.cos(angle),
    //     })
    //     angle += Math.PI / 300
    //   }, 10)
    // }, 2000)
  }

  useEffect(() => {
    if (graphParent.current !== null) {
      // build the graph
      Graph = ForceGraph()(graphParent.current)
        .graphData(testData)
        .width(breakpoint.includes('laptop') ? width * 0.8 : width)
        .linkColor('color')
        .linkWidth(1)
        .linkResolution(10)
        .linkCurvature('curve')
        .linkOpacity(1)
        .linkCurveRotation('rotation')
        .nodeVisibility('visible')
        .linkVisibility('visible')
        .linkDirectionalParticles(5)
        .linkOpacity(0.7)
        .linkDirectionalParticleWidth((link: any) => (link.target.includes('Complete') ? 3 : 0))
        .linkDirectionalParticleSpeed(5 * 0.001)
        .nodeColor('color')
        .cooldownTicks(200)
        .d3VelocityDecay(0.8)
        .onNodeClick((node) => zoomCameraToNode(node))
        .nodeThreeObject((node) => createSpriteNode(node))

      // Set link force
      // Maybe we need a ref to linkForce later
      const linkforce = Graph.d3Force('link')?.distance((link: any) => (link.target.id.includes('Complete') ? 90 : 30))

      // post
      // @ts-expect-error // shhh
      const bloomPass = new UnrealBloomPass()
      bloomPass.strength = 0.36
      bloomPass.radius = 1.5
      bloomPass.threshold = 0.1

      Graph.postProcessingComposer().addPass(bloomPass)

      Graph.onEngineStop(() => {
        if (first) {
          Graph.zoomToFit(300, 0)
          first = false
          return
        }
      })

      Graph.renderer().setPixelRatio(window.devicePixelRatio)

      // Control Settings
      graphControls = Graph.controls()

      graphControls.maxDistance = 1000

      graphControls.noPan = true

      graphControls.rotateSpeed = 0.5

      graphControls.zoomSpeed = 0.5
    }
  }, [graphParent.current, breakpoint])

  return (
    <div className="container">
      {breakpoint.includes('laptop') && <div className="rail"></div>}
      <div id="3d-graph" className="graph" ref={graphParent}></div>
      {breakpoint.includes('laptop') && (
        <div className="rail">
          <button
            onClick={() => handleReset()}
            style={{ marginTop: '12rem', padding: '1.5rem', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
          >
            RESET
          </button>
        </div>
      )}
    </div>
  )
}

export default App
