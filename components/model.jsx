import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, extend } from "react-three-fiber";
import {
    useFrame,
    useThree,
    NoToneMapping,
    lookAt,
} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'
import { useMemo, useEffect } from 'react'
import randomWord from 'random-words'
import { Float } from "@react-three/drei";


// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });


function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (

        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered && 'hotpink'} />
        </mesh>
    )
}


function Cloud({ count, radius, hover, hovered }) {
    // Cloud Function Forked from https://codesandbox.io/s/spherical-word-cloud-forked-jt3cou?file=/src/App.js:475-520    
    const images = ['logos/apple.png', 'logos/ardiuno.png', 'logos/blender.png', 'logos/c.png', 'logos/css.png', 'logos/firebase.png', 'logos/funsion360.png', 'logos/git.png', 'logos/github.png', 'logos/google.png', 'logos/homeAssistant.png', 'logos/html.png', 'logos/JavaScript-logo.png', 'logos/jquery.png', 'logos/JSON.png', 'logos/jupyter.png', 'logos/linux.png', 'logos/mongodb.png', 'logos/mpcnc.png', 'logos/mysql.png', 'logos/node.png', 'logos/Notepad++.png', 'logos/npm.png', 'logos/octoprint.png', 'logos/prusa.webp', 'logos/python.png', 'logos/raspberryPi.png', 'logos/React.png', 'logos/reprap.webp', 'logos/three.png', 'logos/unity.png', 'logos/vercel.svg', 'logos/vsCode.png', 'logos/windows.png', 'logos/YAML.png', 'logos/chrome.png']
    const words = useMemo(() => {
        const temp = []
        radius = radius - 1
        const spherical = new THREE.Spherical()
        const phiSpan = Math.PI / (count + 1)
        const thetaSpan = (Math.PI * 2) / (radius + 1)
        let l = 0
        for (let i = 1; i < count + 1; i++)
            for (let j = 0; j < radius + 1; j++) {
                temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), l])
                l += 1
            }
        return temp
    }, [count, radius])
    return words.map(([pos, Image], index) => <Element key={index} position={pos} image={images[Image]} hover={hover} hovered={hovered} scale={1.5} />)

}


function Element(props) {
    const { hover, hovered, scale } = props
    const ref = useRef()
    const color = new THREE.Color()
    let previousCamera = undefined
    let currentCamera = undefined
    let ran = false
    useFrame(({ camera }) => {
        // Make text face the camer
        if (hovered.hovered && ref == hovered.object && !ran) {
            !ran && (scale *= 2)
            ran = true
        }

        ref.current.scale.set(1.0 * scale, (tex.image.height / tex.image.width) * scale, (1.0) * scale);
        currentCamera = camera.quaternion
        //ref.current.quaternion.copy(currentCamera)
        ref.current.lookAt(camera.position)
    })
    const tex = useLoader(TextureLoader, props.image);
    const runhover = () => {
        console.log("hi", ref)
        hover({ hovered: true, object: ref })
    }
    return (
        <mesh
            onPointerOver={(event) => runhover()}
            onPointerOut={(event) => hover({ hovered: false, object: null })}
            ref={ref}
            position={props.position}
        >
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial encoding="srgb" attach="material" map={tex} transparent={true} />
        </mesh >
    )

}


const CameraControls = () => {
    const {
        camera,
        gl: { domElement },
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame((state) => {
        controls.current.update()
        controls.current.enableZoom = false
        controls.current.enablePan = false
    }
    );
return <orbitControls enableZoom={false} enablePan={false} ref={controls} args={[camera, domElement]} />;
};

const Model = (scale) => {
    scale = scale.scale.scale
    const [hovered, hover] = useState({ hovered: false, object: null })
    const model = React.useRef()
    useFrame(() => {
        !hovered.hovered && (model.current.rotation.y += .001)
    })
    return (
        < group ref={model} scale={[3*scale, 3*scale, 3*scale]} >
            <Cloud count={5} radius={7} hover={hover} hovered={hovered} />
        </group >
    )
}

export default function model( scale ) {
    return (
        <>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                overflow: 'visible'
            }}>
                <Canvas style={{width: '40vw', height:'40vw', overflow: 'visible'}} gl={{ antialias: true, toneMapping: NoToneMapping }} linear  dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
                    <ambientLight />
                    <Model scale={scale} style={{overflow: 'visible'}}/>
                    <CameraControls />
                </Canvas>
            </div>
        </>
    );
}