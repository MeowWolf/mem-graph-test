/* eslint-disable react/prop-types */
import React, { FunctionComponent, useContext, useEffect, useRef } from 'react'
import FPSStats from 'react-fps-stats'
import { createBreakpoint, useWindowSize } from 'react-use'
import * as THREE from 'three'
import * as d3 from 'd3'
import ForceGraph from '3d-force-graph'
import { EffectComposer, EffectPass, RenderPass, ChromaticAberrationEffect } from 'postprocessing'

import testData from './testData'

import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'

const useBreakpoint = createBreakpoint()

interface Props {
  nodeFocusCameraRotationSpeed?: number
  nodeFocusBeginRotationTime?: number
  nodeFocusCameraPositionUpdateTime?: number
  detailViewOpen?: false
}

const App: FunctionComponent<Props> = ({
  nodeFocusCameraRotationSpeed = 2.0,
  nodeFocusBeginRotationTime = 2000,
  nodeFocusCameraPositionUpdateTime = 1500,
  detailViewOpen = false,
}) => {
  const graphParent = useRef<HTMLDivElement>(null)
  const breakpoint = useBreakpoint()

  let Graph
  let graphControls
  let nodeFocusTimeout
  let focused = false
  let zooming = false

  let first = true

  const loadingManager = new THREE.LoadingManager()

  loadingManager.onLoad = () => {
    console.log('loaded with no graph yet')
    if (Graph) {
      console.log('loaded with Graph')
      Graph.zoomToFit(200, 0)
    }
  }

  //TODO use size of parent ref & not window
  const { width, height } = useWindowSize()

  function handleReset() {
    graphControls.autoRotate = false
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
    focused = true
    zooming = true
    if (nodeFocusTimeout) window.clearTimeout(nodeFocusTimeout)

    // Aim at node from outside it
    const distance = 60
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

    Graph.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      nodeFocusCameraPositionUpdateTime, // ms transition duration
    )

    // Enable autorotate aftet x ms
    nodeFocusTimeout = setTimeout(() => {
      if (graphControls) {
        graphControls.autoRotate = true
        // TODO Renable after detail panel is implemented
        //graphControls.enabled = false
      }
      zooming = false
      // TODO on camera zoom or click set autorotate to false
    }, nodeFocusBeginRotationTime + nodeFocusCameraPositionUpdateTime)
  }

  function onCameraMove(e: any): void {
    // console.log(e)
    // if focused return to original position
    // TODO this will need to be refacored when detail pannel is implemented
    // if (focused) {
    //   graphControls.autoRotate = false
    //   if (Graph) {
    //     Graph.zoomToFit(200, 0)
    //   }
    // }
  }

  useEffect(() => {
    if (graphParent.current !== null) {
      // build the graph
      Graph = ForceGraph({ controlType: 'orbit' })(graphParent.current)
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
        // .cooldownTicks(100)
        .cooldownTime(Infinity)
        .d3VelocityDecay(0.8)
        // //@ts-expect-error - who knows
        // .d3Force('center', null)
        // //@ts-expect-error - who knows
        // .d3Force('charge', null)
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
      const camera = Graph.camera()

      // Config camera
      camera.autoRotateSpeed = nodeFocusCameraRotationSpeed

      const scene = Graph.scene()
      Graph.postProcessingComposer().addPass(bloomPass)

      const bokehPass = new BokehPass(scene, camera, {
        focus: 70,
        aperture: 0.00001,
        maxblur: 0.006,
      })

      bokehPass.needsSwap = true

      Graph.postProcessingComposer().addPass(bokehPass)

      // const chromaPass = new EffectPass(camera, new ChromaticAberrationEffect())
      // Graph.postProcessingComposer().addPass(chromaPass)

      // Graph.zoomToFit(300, 0)
      first = false

      Graph.renderer().setPixelRatio(window.devicePixelRatio)

      // Control Settings
      graphControls = Graph.controls()

      graphControls.maxDistance = 1000

      graphControls.enablePan = false

      graphControls.rotateSpeed = 0.5

      graphControls.zoomSpeed = 0.5

      graphControls.addEventListener('change', onCameraMove)
    }
  }, [graphParent.current, breakpoint])

  return (
    <div className="container">
      <FPSStats />
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
