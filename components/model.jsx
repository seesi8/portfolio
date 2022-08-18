import React, { useRef } from "react";
import { Canvas, useLoader, extend } from "react-three-fiber";
import {
    useFrame,
    useThree,
    NoToneMapping,
} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useState } from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'
import { useMemo } from 'react'


// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });


const CameraControls = () => {
    const {
        camera,
        gl: { domElement },
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame((state) => {
        controls.current.update()
        //make it so that you cannot move the model
        controls.current.enableZoom = false
        controls.current.enablePan = false
    }
    );
    return <orbitControls enableZoom={false} enablePan={false} ref={controls} args={[camera, domElement]} />;
};

function Element(props) {

    const { hover, hovered, scale } = props
    
    const ref = useRef()

    //init camera to be used in frame to have images look at camera
    let currentCamera = undefined

    //init ran to make sure that the object does not continue to grow while it is hovered
    let ran = false
    
    useFrame(({ camera }) => {

        //check if something is hovered and see if they are the hoved object
        if (hovered.hovered && ref == hovered.object && !ran) {

            // if it has not be scaled make it scaled
            !ran && (scale *= 2)
            ran = true
        }

        // Make text face the camera
        ref.current.scale.set(1.0 * scale, (tex.image.height / tex.image.width) * scale, (1.0) * scale);
        currentCamera = camera.quaternion
        ref.current.lookAt(camera.position)
    })

    const tex = useLoader(TextureLoader, props.image);

    //used to create a hover event for the object
    const runhover = () => {
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

function Cloud({ count, radius, hover, hovered }) {
    // Cloud Function Forked from https://codesandbox.io/s/spherical-word-cloud-forked-jt3cou?file=/src/App.js:475-520    
    
    //image list generated from pytho script based on folder
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

    //hover and hovered are not used here and are just here to pass to children
    return words.map(([pos, Image], index) => <Element key={index} position={pos} image={images[Image]} hover={hover} hovered={hovered} scale={1.5} />)

}


const Model = (scale) => {
    //becasue of prop drilling scale is a nested array
    scale = scale.scale.scale

    const [hovered, hover] = useState({ hovered: false, object: null })
    const model = React.useRef()

    //rotate model if it is not hovered
    useFrame(() => {
        !hovered.hovered && (model.current.rotation.y += .001)
    })

    //hover and hovered need to be passed down to each individual image to detect if they are the ones being hovered
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