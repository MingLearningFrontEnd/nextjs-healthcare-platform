"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF, Environment } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { useRouter } from "next/navigation";

// Mapping of teeth to treatments (this should ideally come from your backend)
const teethTreatments = {
  Tooth_1: { id: 1, treatment: "Filling", date: "2025-01-20" },
  Tooth_16: { id: 2, treatment: "Crown", date: "2024-11-15" },
  // Add more teeth and their treatments as needed
};

function TeethModel() {
  const group = useRef(null);
  const { nodes, materials } = useGLTF(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dental_Anatomy_Model_0123050828-qZMZGpGlwvlC0qGncMunuNTKFQWh6K.glb"
  );
  const [hovered, setHovered] = useState(null);
  const [selectedTooth, setSelectedTooth] = useState(null);
  const router = useRouter();

  const teethMaterials = useMemo(() => {
    const materials = {};
    Object.keys(teethTreatments).forEach((toothName) => {
      materials[toothName] = new MeshStandardMaterial({ color: "#ffffff" });
    });
    return materials;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 4) / 4;
  });

  const handlePointerOver = useCallback((e) => {
    e.stopPropagation();
    const name = e.object.name;
    if (teethTreatments[name]) {
      setHovered(name);
      document.body.style.cursor = "pointer";
    }
  }, []);

  const handlePointerOut = useCallback(() => {
    setHovered(null);
    document.body.style.cursor = "default";
  }, []);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      const name = e.object.name;
      if (teethTreatments[name]) {
        setSelectedTooth(name);
        router.push(`/patient-portal/record/${teethTreatments[name].id}?tooth=${name}`);
      }
    },
    [router]
  );

  return (
    <group ref={group} dispose={null}>
      {Object.entries(nodes).map(([name, node]) => {
        if (node.isMesh) {
          const isTreatedTooth = teethTreatments[name] !== undefined;
          const material = isTreatedTooth ? teethMaterials[name] : node.material;

          if (isTreatedTooth) {
            if (name === hovered) {
              material.color.set("#ffff00"); // Yellow for hover
            } else if (name === selectedTooth) {
              material.color.set("#00ff00"); // Green for selected
            } else {
              material.color.set("#ffffff"); // White for treated teeth
            }
          }

          return (
            <mesh
              key={name}
              name={name}
              geometry={node.geometry}
              material={material}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
              onClick={handleClick}
            />
          );
        }
        return null;
      })}
    </group>
  );
}

export default function TeethModel3D() {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
        <OrbitControls enableZoom={true} enablePan={true} minPolarAngle={0} maxPolarAngle={Math.PI} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.3} castShadow />

        <Environment preset="studio" />

        <TeethModel />
      </Canvas>
    </div>
  );
}

useGLTF.preload(
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dental_Anatomy_Model_0123050828-qZMZGpGlwvlC0qGncMunuNTKFQWh6K.glb"
);
