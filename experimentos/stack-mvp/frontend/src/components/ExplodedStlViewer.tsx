import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

type GadgetId = 'microduck_robot' | 'cutter_f1' | 'estuche_impermeable';

interface CadPartSpec {
  name: string;
  geometry: THREE.BufferGeometry;
  basePos: THREE.Vector3;
  explodeOffset: THREE.Vector3;
  baseRot?: THREE.Euler;
  explodeRot?: THREE.Euler;
  accent: boolean;
  edgeThreshold?: number;
}

function mergeGeometries(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = new THREE.BufferGeometry();
  const positions: number[] = [];
  const normals: number[] = [];

  for (const g of geos) {
    const nonIndexed = g.index ? g.toNonIndexed() : g;
    const pos = nonIndexed.getAttribute('position');
    nonIndexed.computeVertexNormals();
    const norm = nonIndexed.getAttribute('normal');
    for (let i = 0; i < pos.count; i++) {
      positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
      normals.push(norm.getX(i), norm.getY(i), norm.getZ(i));
    }
  }

  merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  return merged;
}

function createRoundedRectShape(w: number, d: number, r: number): THREE.Shape {
  const shape = new THREE.Shape();
  const hw = w / 2;
  const hd = d / 2;
  const rad = Math.min(r, hw - 0.005, hd - 0.005);

  shape.moveTo(-hw + rad, -hd);
  shape.lineTo(hw - rad, -hd);
  shape.absarc(hw - rad, -hd + rad, rad, -Math.PI / 2, 0, false);
  shape.lineTo(hw, hd - rad);
  shape.absarc(hw - rad, hd - rad, rad, 0, Math.PI / 2, false);
  shape.lineTo(-hw + rad, hd);
  shape.absarc(-hw + rad, hd - rad, rad, Math.PI / 2, Math.PI, false);
  shape.lineTo(-hw, -hd + rad);
  shape.absarc(-hw + rad, -hd + rad, rad, Math.PI, Math.PI * 1.5, false);
  return shape;
}

function createRoundedRectPath(w: number, d: number, r: number, cx = 0, cy = 0): THREE.Path {
  const path = new THREE.Path();
  const hw = w / 2;
  const hd = d / 2;
  const rad = Math.min(r, hw - 0.005, hd - 0.005);

  path.moveTo(cx - hw + rad, cy - hd);
  path.lineTo(cx + hw - rad, cy - hd);
  path.absarc(cx + hw - rad, cy - hd + rad, rad, -Math.PI / 2, 0, false);
  path.lineTo(cx + hw, cy + hd - rad);
  path.absarc(cx + hw - rad, cy + hd - rad, rad, 0, Math.PI / 2, false);
  path.lineTo(cx - hw + rad, cy + hd);
  path.absarc(cx - hw + rad, cy + hd - rad, rad, Math.PI / 2, Math.PI, false);
  path.lineTo(cx - hw, cy - hd + rad);
  path.absarc(cx - hw + rad, cy - hd + rad, rad, Math.PI, Math.PI * 1.5, false);
  return path;
}

/**
 * Silueta tipo domo D-shape del cabezal de MicroDuck Robot (plano abajo, domo curvo arriba)
 */
function createDuckHeadShape(w: number, hTotal: number, bottomRadius = 0.14): THREE.Shape {
  const shape = new THREE.Shape();
  const hw = w / 2;
  const hh = hTotal / 2;
  const rBot = Math.min(bottomRadius, hw * 0.35);
  const archCenterY = -hh + hTotal * 0.36;
  const archRadiusY = hh - archCenterY;

  shape.moveTo(-hw + rBot, -hh);
  shape.lineTo(hw - rBot, -hh);
  shape.absarc(hw - rBot, -hh + rBot, rBot, -Math.PI / 2, 0, false);
  shape.lineTo(hw, archCenterY);

  // Arco superior tipo domo suave
  const steps = 32;
  for (let i = 1; i <= steps; i++) {
    const theta = (i / steps) * Math.PI;
    const x = Math.cos(theta) * hw;
    const y = archCenterY + Math.sin(theta) * archRadiusY;
    shape.lineTo(x, y);
  }

  shape.lineTo(-hw, -hh + rBot);
  shape.absarc(-hw + rBot, -hh + rBot, rBot, Math.PI, Math.PI * 1.5, false);
  return shape;
}

function createDuckHeadHolePath(w: number, hTotal: number, bottomRadius = 0.10): THREE.Path {
  const path = new THREE.Path();
  const hw = w / 2;
  const hh = hTotal / 2;
  const rBot = Math.min(bottomRadius, hw * 0.35);
  const archCenterY = -hh + hTotal * 0.36;
  const archRadiusY = hh - archCenterY;

  path.moveTo(-hw + rBot, -hh);
  path.lineTo(hw - rBot, -hh);
  path.absarc(hw - rBot, -hh + rBot, rBot, -Math.PI / 2, 0, false);
  path.lineTo(hw, archCenterY);

  const steps = 32;
  for (let i = 1; i <= steps; i++) {
    const theta = (i / steps) * Math.PI;
    const x = Math.cos(theta) * hw;
    const y = archCenterY + Math.sin(theta) * archRadiusY;
    path.lineTo(x, y);
  }

  path.lineTo(-hw, -hh + rBot);
  path.absarc(-hw + rBot, -hh + rBot, rBot, Math.PI, Math.PI * 1.5, false);
  return path;
}

function extrudeAlongY(shape: THREE.Shape, height: number, bevel = 0.025): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2,
    curveSegments: 28,
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, -height / 2, 0);
  geo.computeVertexNormals();
  return geo;
}

function extrudeAlongZ(shape: THREE.Shape, depth: number, bevel = 0.025): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2,
    curveSegments: 28,
  });
  geo.translate(0, 0, -depth / 2);
  geo.computeVertexNormals();
  return geo;
}

function extrudeAlongX(shape: THREE.Shape, width: number, bevel = 0.025): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: width,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2,
    curveSegments: 28,
  });
  geo.rotateY(Math.PI / 2);
  geo.translate(-width / 2, 0, 0);
  geo.computeVertexNormals();
  return geo;
}

// ============================================================================
// 1. MICRODUCK ROBOT (Réplica CAD del bípedo de escritorio de MakerWorld #3501114)
//    Cabezal Domo + Visor y Lente Óptico + Cuello Articulado + Torso/Pelvis
//    + Muslos Servo Izq/Der + Piernas y Pies Estabilizadores Izq/Der
// ============================================================================
function buildMicroDuckRobotParts(): CadPartSpec[] {
  // --- 1. CARCASA DEL CABEZAL DOMO (Gris humo) ---
  const headMainShape = createDuckHeadShape(1.58, 1.02, 0.15);
  const headBackBody = extrudeAlongZ(headMainShape, 0.78, 0.04);

  // Marco frontal con cavidad para el visor
  const headRimShape = createDuckHeadShape(1.58, 1.02, 0.15);
  headRimShape.holes.push(createDuckHeadHolePath(1.32, 0.78, 0.10));
  const headFrontRim = extrudeAlongZ(headRimShape, 0.18, 0.02);
  headFrontRim.translate(0, 0, 0.44);

  // Orejas / tapas laterales del cabezal
  const earShape = createRoundedRectShape(0.32, 0.38, 0.08);
  const leftEar = extrudeAlongX(earShape, 0.12, 0.015);
  leftEar.translate(-0.82, -0.14, 0.02);
  const rightEar = extrudeAlongX(earShape, 0.12, 0.015);
  rightEar.translate(0.82, -0.14, 0.02);

  const headShellGeo = mergeGeometries([headBackBody, headFrontRim, leftEar, rightEar]);

  // --- 2. VISOR FRONTAL + LENTE ÓPTICO CENTRAL (Naranja Vértice, sale hacia +Z y +Y) ---
  const visorPlateShape = createDuckHeadShape(1.28, 0.74, 0.09);
  const visorPlate = extrudeAlongZ(visorPlateShape, 0.08, 0.012);

  // Anillo exterior de la cámara / ojo central
  const eyeRingShape = new THREE.Shape();
  eyeRingShape.absarc(0, 0.04, 0.24, 0, Math.PI * 2, false);
  const eyeRingHole = new THREE.Path();
  eyeRingHole.absarc(0, 0.04, 0.14, 0, Math.PI * 2, false);
  eyeRingShape.holes.push(eyeRingHole);
  const eyeRing = extrudeAlongZ(eyeRingShape, 0.14, 0.015);
  eyeRing.translate(0, 0, 0.07);

  // Lente interior central
  const eyeCoreShape = new THREE.Shape();
  eyeCoreShape.absarc(0, 0.04, 0.11, 0, Math.PI * 2, false);
  const eyeCore = extrudeAlongZ(eyeCoreShape, 0.10, 0.02);
  eyeCore.translate(0, 0, 0.06);

  // Pequeño sensor secundario abajo a la izquierda del visor (como en el modelo original)
  const sensorDotShape = new THREE.Shape();
  sensorDotShape.absarc(-0.36, -0.14, 0.065, 0, Math.PI * 2, false);
  const sensorDot = extrudeAlongZ(sensorDotShape, 0.10, 0.01);
  sensorDot.translate(0, 0, 0.05);

  const headVisorGeo = mergeGeometries([visorPlate, eyeRing, eyeCore, sensorDot]);

  // --- 3. CUELLO ROBÓTICO ARTICULADO (Naranja Vértice) ---
  // Columna vertical del cuello + articulaciones servo superior/inferior + guía de cable lateral
  const neckColShape = createRoundedRectShape(0.28, 0.30, 0.06);
  const neckCol = extrudeAlongY(neckColShape, 0.68, 0.015);

  // Cilindro servo superior del cuello
  const servoJointShape = new THREE.Shape();
  servoJointShape.absarc(0, 0, 0.16, 0, Math.PI * 2, false);
  const servoHole = new THREE.Path();
  servoHole.absarc(0, 0, 0.06, 0, Math.PI * 2, false);
  servoJointShape.holes.push(servoHole);

  const upperNeckJoint = extrudeAlongX(servoJointShape, 0.42, 0.015);
  upperNeckJoint.translate(0, 0.22, 0);

  const lowerNeckJoint = extrudeAlongX(servoJointShape, 0.44, 0.015);
  lowerNeckJoint.translate(0, -0.22, 0);

  // Pequeño clip lateral izquierdo del cuello (fiel a la foto de MakerWorld)
  const cableClipShape = createRoundedRectShape(0.18, 0.16, 0.04);
  const cableClip = extrudeAlongZ(cableClipShape, 0.18, 0.01);
  cableClip.translate(-0.20, 0.02, 0);

  const neckGeo = mergeGeometries([neckCol, upperNeckJoint, lowerNeckJoint, cableClip]);

  // --- 4. TORSO Y PUENTE PÉLVICO CENTRAL (Gris humo — núcleo fijo) ---
  // Pecho superior redondeado con 2 detalles circulares frontales
  const chestShape = createRoundedRectShape(0.86, 0.56, 0.12);
  const chestBlock = extrudeAlongZ(chestShape, 0.64, 0.025);
  chestBlock.translate(0, 0.22, 0);

  // Detalles frontales del pecho (dos botones/sensores circulares)
  const chestBoltShape = new THREE.Shape();
  chestBoltShape.absarc(0, 0, 0.065, 0, Math.PI * 2, false);
  const boltL = extrudeAlongZ(chestBoltShape, 0.08, 0.01);
  boltL.translate(-0.24, 0.26, 0.34);
  const boltR = extrudeAlongZ(chestBoltShape, 0.08, 0.01);
  boltR.translate(0.24, 0.26, 0.34);

  // Bloque pélvico inferior más ancho
  const pelvisShape = createRoundedRectShape(1.18, 0.44, 0.10);
  const pelvisBlock = extrudeAlongZ(pelvisShape, 0.60, 0.025);
  pelvisBlock.translate(0, -0.22, 0);

  // Eje transversal de cadera que conecta ambos muslos
  const hipAxleShape = new THREE.Shape();
  hipAxleShape.absarc(0, 0, 0.13, 0, Math.PI * 2, false);
  const hipAxleHole = new THREE.Path();
  hipAxleHole.absarc(0, 0, 0.05, 0, Math.PI * 2, false);
  hipAxleShape.holes.push(hipAxleHole);
  const hipAxle = extrudeAlongX(hipAxleShape, 1.56, 0.015);
  hipAxle.translate(0, -0.22, 0);

  const torsoGeo = mergeGeometries([chestBlock, boltL, boltR, pelvisBlock, hipAxle]);

  // --- 5. MUSLOS / SERVOS DE CADERA IZQUIERDO Y DERECHO (Naranja Vértice — abren hacia -X / +X) ---
  function createThighGeo(side: -1 | 1): THREE.BufferGeometry {
    const thighMainShape = createRoundedRectShape(0.36, 0.68, 0.07);
    const thighBody = extrudeAlongZ(thighMainShape, 0.52, 0.02);

    // Horquilla inferior de rodilla
    const kneeBracketShape = createRoundedRectShape(0.40, 0.28, 0.06);
    const kneeBracket = extrudeAlongZ(kneeBracketShape, 0.44, 0.015);
    kneeBracket.translate(0, -0.32, 0.04);

    // Tapa lateral redonda del servo de cadera
    const capShape = new THREE.Shape();
    capShape.absarc(0, 0, 0.15, 0, Math.PI * 2, false);
    const cap = extrudeAlongX(capShape, 0.08, 0.01);
    cap.translate(side * 0.21, 0.12, 0);

    return mergeGeometries([thighBody, kneeBracket, cap]);
  }

  const leftThighGeo = createThighGeo(-1);
  const rightThighGeo = createThighGeo(1);

  // --- 6. PIERNAS INFERIORES + PIES ESTABILIZADORES DE PATO (Gris humo — bajan hacia -Y y abren) ---
  function createLowerLegAndFootGeo(): THREE.BufferGeometry {
    // Tibia / columna inferior de la pierna
    const shinShape = createRoundedRectShape(0.28, 0.66, 0.05);
    const shin = extrudeAlongZ(shinShape, 0.40, 0.018);
    shin.translate(0, 0.22, 0);

    // Pin de articulación de rodilla
    const kneePinShape = new THREE.Shape();
    kneePinShape.absarc(0, 0, 0.11, 0, Math.PI * 2, false);
    const kneePin = extrudeAlongX(kneePinShape, 0.36, 0.01);
    kneePin.translate(0, 0.50, 0.02);

    // Base ancha del pie de pato (plantilla inferior)
    const footSoleShape = createRoundedRectShape(0.56, 0.84, 0.12);
    const footSole = extrudeAlongY(footSoleShape, 0.18, 0.02);
    footSole.translate(0, -0.22, 0.10);

    // Empeine / puente superior del pie
    const footBridgeShape = createRoundedRectShape(0.44, 0.58, 0.09);
    const footBridge = extrudeAlongY(footBridgeShape, 0.16, 0.018);
    footBridge.translate(0, -0.08, 0.06);

    return mergeGeometries([shin, kneePin, footSole, footBridge]);
  }

  const leftFootGeo = createLowerLegAndFootGeo();
  const rightFootGeo = createLowerLegAndFootGeo();

  return [
    {
      name: 'Carcasa del Cabezal (PLA/PETG)',
      geometry: headShellGeo,
      basePos: new THREE.Vector3(0, 1.32, 0),
      explodeOffset: new THREE.Vector3(0, 0.82, -0.18),
      explodeRot: new THREE.Euler(-0.08, 0, 0),
      accent: false,
      edgeThreshold: 22,
    },
    {
      name: 'Visor + Lente Óptico (Acento Naranja)',
      geometry: headVisorGeo,
      basePos: new THREE.Vector3(0, 1.32, 0.42),
      explodeOffset: new THREE.Vector3(0, 0.92, 0.72),
      explodeRot: new THREE.Euler(0.06, 0, 0),
      accent: true,
      edgeThreshold: 22,
    },
    {
      name: 'Cuello Articulado Servo',
      geometry: neckGeo,
      basePos: new THREE.Vector3(0, 0.62, 0),
      explodeOffset: new THREE.Vector3(0, 0.36, 0.12),
      accent: true,
      edgeThreshold: 22,
    },
    {
      name: 'Torso + Chasis Pélvico',
      geometry: torsoGeo,
      basePos: new THREE.Vector3(0, -0.05, 0),
      explodeOffset: new THREE.Vector3(0, 0, 0),
      accent: false,
      edgeThreshold: 22,
    },
    {
      name: 'Muslo / Servo Cadera Izquierdo',
      geometry: leftThighGeo,
      basePos: new THREE.Vector3(-0.78, -0.42, 0),
      explodeOffset: new THREE.Vector3(-0.68, -0.10, 0.14),
      explodeRot: new THREE.Euler(0, 0, 0.12),
      accent: true,
      edgeThreshold: 22,
    },
    {
      name: 'Muslo / Servo Cadera Derecho',
      geometry: rightThighGeo,
      basePos: new THREE.Vector3(0.78, -0.42, 0),
      explodeOffset: new THREE.Vector3(0.68, -0.10, 0.14),
      explodeRot: new THREE.Euler(0, 0, -0.12),
      accent: true,
      edgeThreshold: 22,
    },
    {
      name: 'Pierna + Pie Estabilizador Izquierdo',
      geometry: leftFootGeo,
      basePos: new THREE.Vector3(-0.78, -1.16, 0),
      explodeOffset: new THREE.Vector3(-0.48, -0.78, -0.08),
      accent: false,
      edgeThreshold: 22,
    },
    {
      name: 'Pierna + Pie Estabilizador Derecho',
      geometry: rightFootGeo,
      basePos: new THREE.Vector3(0.78, -1.16, 0),
      explodeOffset: new THREE.Vector3(0.48, -0.78, -0.08),
      accent: false,
      edgeThreshold: 22,
    },
  ];
}

// ============================================================================
// 2. CUTTER RETRÁCTIL EDC (Utility Knife F1 — Cacha Sup + Portahoja y Bisturí + Botón Slider + Cacha Inf)
// ============================================================================
function buildUtilityKnifeParts(): CadPartSpec[] {
  // 1. Cacha superior con ventana de corredera
  const topScaleShape = createRoundedRectShape(3.10, 0.96, 0.24);
  topScaleShape.holes.push(createRoundedRectPath(1.45, 0.24, 0.08, 0.15, 0));
  const LanyardHole1 = new THREE.Path();
  LanyardHole1.absarc(-1.24, 0, 0.14, 0, Math.PI * 2, false);
  topScaleShape.holes.push(LanyardHole1);
  const topScaleGeo = extrudeAlongY(topScaleShape, 0.18, 0.025);

  // 2. Botón Deslizador Táctil (Slider) en Naranja
  const sliderBaseShape = createRoundedRectShape(0.62, 0.48, 0.10);
  const sliderBase = extrudeAlongY(sliderBaseShape, 0.14, 0.015);
  const sliderStemShape = createRoundedRectShape(0.42, 0.20, 0.05);
  const sliderStem = extrudeAlongY(sliderStemShape, 0.22, 0.01);
  sliderStem.translate(0, -0.14, 0);
  const sliderGeo = mergeGeometries([sliderBase, sliderStem]);

  // 3. Portahoja Interno + Hoja Trapezoidal de Bisturí (Naranja Vértice)
  const carrierShape = createRoundedRectShape(1.85, 0.68, 0.10);
  const carrierBody = extrudeAlongY(carrierShape, 0.14, 0.012);
  carrierBody.translate(-0.20, 0, 0);

  // Hoja trapezoidal clásica de cutter
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0.30, -0.28);
  bladeShape.lineTo(1.75, -0.28); // Filo inferior
  bladeShape.lineTo(1.32, 0.26);  // Punta angulada de bisturí
  bladeShape.lineTo(0.30, 0.26);
  bladeShape.closePath();
  const notch = new THREE.Path();
  notch.absarc(0.85, 0.16, 0.07, 0, Math.PI * 2, false);
  bladeShape.holes.push(notch);
  const bladeGeo = extrudeAlongY(bladeShape, 0.05, 0.005);

  const bladeAssemblyGeo = mergeGeometries([carrierBody, bladeGeo]);

  // 4. Cacha base inferior con riel guía y ojal de llavero
  const botOuterShape = createRoundedRectShape(3.10, 0.96, 0.24);
  const LanyardHole2 = new THREE.Path();
  LanyardHole2.absarc(-1.24, 0, 0.14, 0, Math.PI * 2, false);
  botOuterShape.holes.push(LanyardHole2);
  const botPlate = extrudeAlongY(botOuterShape, 0.16, 0.025);
  botPlate.translate(0, -0.08, 0);

  const botWallShape = createRoundedRectShape(3.10, 0.96, 0.24);
  botWallShape.holes.push(createRoundedRectPath(2.75, 0.72, 0.14, 0.15, 0));
  botWallShape.holes.push(LanyardHole2);
  const botWalls = extrudeAlongY(botWallShape, 0.18, 0.015);
  botWalls.translate(0, 0.08, 0);

  const bottomScaleGeo = mergeGeometries([botPlate, botWalls]);

  return [
    {
      name: 'Botón Slider Táctil (PETG Naranja)',
      geometry: sliderGeo,
      basePos: new THREE.Vector3(0.20, 0.34, 0),
      explodeOffset: new THREE.Vector3(0.15, 1.08, 0),
      accent: true,
      edgeThreshold: 22,
    },
    {
      name: 'Cacha Superior con Riel Guía (ASA)',
      geometry: topScaleGeo,
      basePos: new THREE.Vector3(0, 0.18, 0),
      explodeOffset: new THREE.Vector3(0, 0.56, 0),
      accent: false,
      edgeThreshold: 22,
    },
    {
      name: 'Portahoja + Hoja Trapezoidal',
      geometry: bladeAssemblyGeo,
      basePos: new THREE.Vector3(0.25, 0.02, 0),
      explodeOffset: new THREE.Vector3(0.75, 0.05, 0.15),
      accent: true,
      edgeThreshold: 22,
    },
    {
      name: 'Chasis Base + Ojal EDC (ASA)',
      geometry: bottomScaleGeo,
      basePos: new THREE.Vector3(0, -0.16, 0),
      explodeOffset: new THREE.Vector3(0, -0.68, 0),
      accent: false,
      edgeThreshold: 22,
    },
  ];
}

// ============================================================================
// 3. ESTUCHE TÉCNICO IMPERMEABLE #A-01 (Aprobado para proteger equipos/tarjetas)
// ============================================================================
function buildRuggedCaseParts(): CadPartSpec[] {
  const W = 2.75;
  const D = 1.85;
  const R = 0.28;

  // 1. TAPA SUPERIOR
  const lidCeilingShape = createRoundedRectShape(W, D, R);
  const lidCeiling = extrudeAlongY(lidCeilingShape, 0.14, 0.03);
  lidCeiling.translate(0, 0.16, 0);

  const lidSkirtShape = createRoundedRectShape(W, D, R);
  lidSkirtShape.holes.push(createRoundedRectPath(W - 0.26, D - 0.26, R - 0.09));
  const lidSkirt = extrudeAlongY(lidSkirtShape, 0.26, 0.015);
  lidSkirt.translate(0, -0.02, 0);

  const ribShape = createRoundedRectShape(0.26, D - 0.36, 0.05);
  const ribL = extrudeAlongY(ribShape, 0.06, 0.01);
  ribL.translate(-0.74, 0.25, 0);
  const ribR = extrudeAlongY(ribShape, 0.06, 0.01);
  ribR.translate(0.74, 0.25, 0);

  const lidGeo = mergeGeometries([lidCeiling, lidSkirt, ribL, ribR]);

  // 2. SELLO PERIMETRAL TPU (Naranja)
  const sealShape = createRoundedRectShape(W - 0.16, D - 0.16, R - 0.05);
  sealShape.holes.push(createRoundedRectPath(W - 0.40, D - 0.40, R - 0.12));
  const sealGeo = extrudeAlongY(sealShape, 0.11, 0.025);

  // 3. BANDEJA ORGANIZADORA INTERNA (Naranja)
  const trayOuterW = W - 0.38;
  const trayOuterD = D - 0.38;
  const trayShape = createRoundedRectShape(trayOuterW, trayOuterD, R - 0.11);
  trayShape.holes.push(createRoundedRectPath(0.94, trayOuterD - 0.24, 0.10, -0.58, 0));
  trayShape.holes.push(createRoundedRectPath(1.04, (trayOuterD - 0.32) / 2, 0.08, 0.52, 0.34));
  trayShape.holes.push(createRoundedRectPath(1.04, (trayOuterD - 0.32) / 2, 0.08, 0.52, -0.34));
  const trayWalls = extrudeAlongY(trayShape, 0.34, 0.015);

  const trayFloorShape = createRoundedRectShape(trayOuterW, trayOuterD, R - 0.11);
  const trayFloor = extrudeAlongY(trayFloorShape, 0.06, 0.01);
  trayFloor.translate(0, -0.15, 0);
  const trayGeo = mergeGeometries([trayWalls, trayFloor]);

  // 4. BASE INFERIOR
  const baseFloorShape = createRoundedRectShape(W, D, R);
  const baseFloor = extrudeAlongY(baseFloorShape, 0.16, 0.03);
  baseFloor.translate(0, -0.38, 0);

  const baseWallShape = createRoundedRectShape(W, D, R);
  baseWallShape.holes.push(createRoundedRectPath(W - 0.28, D - 0.28, R - 0.10));
  const baseWalls = extrudeAlongY(baseWallShape, 0.68, 0.02);
  baseWalls.translate(0, 0.02, 0);

  const mountShape = createRoundedRectShape(0.42, 0.10, 0.02);
  const mountL = extrudeAlongY(mountShape, 0.34, 0.01);
  mountL.translate(-0.66, 0.05, D / 2 + 0.04);
  const mountR = extrudeAlongY(mountShape, 0.34, 0.01);
  mountR.translate(0.66, 0.05, D / 2 + 0.04);

  const baseGeo = mergeGeometries([baseFloor, baseWalls, mountL, mountR]);

  // 5. BROCHES FRONTALES (Naranja)
  const latchProfile = new THREE.Shape();
  latchProfile.moveTo(0, -0.26);
  latchProfile.lineTo(0.14, -0.26);
  latchProfile.lineTo(0.14, 0.26);
  latchProfile.lineTo(-0.05, 0.26);
  latchProfile.lineTo(-0.05, 0.16);
  latchProfile.lineTo(0.05, 0.16);
  latchProfile.lineTo(0.05, -0.16);
  latchProfile.lineTo(-0.05, -0.16);
  latchProfile.lineTo(-0.05, -0.26);

  const latchSingle = new THREE.ExtrudeGeometry(latchProfile, {
    depth: 0.34,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 2,
  });
  latchSingle.rotateY(-Math.PI / 2);
  latchSingle.translate(0.17, 0, 0);
  latchSingle.computeVertexNormals();

  const latchL = latchSingle.clone();
  latchL.translate(-0.66, 0, 0);
  const latchR = latchSingle.clone();
  latchR.translate(0.66, 0, 0);
  const latchesGeo = mergeGeometries([latchL, latchR]);

  return [
    {
      name: 'Tapa Superior Reforzada (ASA)',
      geometry: lidGeo,
      basePos: new THREE.Vector3(0, 0.52, 0),
      explodeOffset: new THREE.Vector3(0, 1.02, 0),
      accent: false,
      edgeThreshold: 24,
    },
    {
      name: 'Empaque Impermeable (TPU 95A)',
      geometry: sealGeo,
      basePos: new THREE.Vector3(0, 0.36, 0),
      explodeOffset: new THREE.Vector3(0, 0.50, 0),
      accent: true,
      edgeThreshold: 24,
    },
    {
      name: 'Bandeja Organizadora (PETG)',
      geometry: trayGeo,
      basePos: new THREE.Vector3(0, 0.14, 0),
      explodeOffset: new THREE.Vector3(0, 0.04, 0),
      accent: true,
      edgeThreshold: 24,
    },
    {
      name: 'Cuerpo Base de Impacto (ASA)',
      geometry: baseGeo,
      basePos: new THREE.Vector3(0, -0.22, 0),
      explodeOffset: new THREE.Vector3(0, -0.66, 0),
      accent: false,
      edgeThreshold: 24,
    },
    {
      name: 'Broches de Cierre a Presión',
      geometry: latchesGeo,
      basePos: new THREE.Vector3(0, 0.15, D / 2 + 0.08),
      explodeOffset: new THREE.Vector3(0, 0.08, 0.72),
      accent: true,
      edgeThreshold: 20,
    },
  ];
}

export function ExplodedStlViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeGadget, setActiveGadget] = useState<GadgetId>('microduck_robot');
  const [manualExplode, setManualExplode] = useState<number | null>(null);
  const manualExplodeRef = useRef<number | null>(null);

  useEffect(() => {
    manualExplodeRef.current = manualExplode;
  }, [manualExplode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      34,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.25, 8.2);
    camera.lookAt(0, 0.05, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff6a1f, 2.4);
    rimLight.position.set(-6, -3, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xd4d4d8, 1.1);
    fillLight.position.set(0, -6, 5);
    scene.add(fillLight);

    const assemblyGroup = new THREE.Group();
    if (activeGadget === 'microduck_robot') {
      assemblyGroup.rotation.set(0.14, -0.42, 0);
    } else if (activeGadget === 'cutter_f1') {
      assemblyGroup.rotation.set(0.46, -0.52, 0.08);
    } else {
      assemblyGroup.rotation.set(0.34, -0.58, 0);
    }
    scene.add(assemblyGroup);

    const darkBodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#27272c'),
      roughness: 0.32,
      metalness: 0.18,
      transparent: true,
      opacity: 0.90,
      depthWrite: true,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    const orangeBodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c84b12'),
      emissive: new THREE.Color('#ff6a1f'),
      emissiveIntensity: 0.16,
      roughness: 0.28,
      metalness: 0.12,
      transparent: true,
      opacity: 0.92,
      depthWrite: true,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    const whiteEdgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#e4e4e7'),
      transparent: true,
      opacity: 0.68,
    });

    const orangeEdgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#ff8b4d'),
      transparent: true,
      opacity: 0.95,
    });

    let specs: CadPartSpec[];
    if (activeGadget === 'microduck_robot') {
      specs = buildMicroDuckRobotParts();
    } else if (activeGadget === 'cutter_f1') {
      specs = buildUtilityKnifeParts();
    } else {
      specs = buildRuggedCaseParts();
    }

    const partNodes: {
      group: THREE.Group;
      basePos: THREE.Vector3;
      explodeOffset: THREE.Vector3;
      baseRot: THREE.Euler;
      explodeRot: THREE.Euler;
    }[] = [];

    const disposables: THREE.BufferGeometry[] = [];

    for (const spec of specs) {
      disposables.push(spec.geometry);
      const partGroup = new THREE.Group();
      partGroup.position.copy(spec.basePos);
      const bRot = spec.baseRot ?? new THREE.Euler(0, 0, 0);
      const eRot = spec.explodeRot ?? new THREE.Euler(0, 0, 0);
      partGroup.rotation.copy(bRot);

      const solidMesh = new THREE.Mesh(
        spec.geometry,
        spec.accent ? orangeBodyMat : darkBodyMat
      );
      partGroup.add(solidMesh);

      const edgesGeo = new THREE.EdgesGeometry(spec.geometry, spec.edgeThreshold ?? 22);
      disposables.push(edgesGeo);
      const edgesMesh = new THREE.LineSegments(
        edgesGeo,
        spec.accent ? orangeEdgeMat : whiteEdgeMat
      );
      partGroup.add(edgesMesh);

      assemblyGroup.add(partGroup);
      partNodes.push({
        group: partGroup,
        basePos: spec.basePos.clone(),
        explodeOffset: spec.explodeOffset.clone(),
        baseRot: bRot,
        explodeRot: eRot,
      });
    }

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      assemblyGroup.rotation.y += dx * 0.008;
      assemblyGroup.rotation.x = Math.max(
        -0.55,
        Math.min(0.85, assemblyGroup.rotation.x + dy * 0.008)
      );
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let scrollExplode = 0.72;
    let currentExplode = 0.72;

    const handleScroll = () => {
      const track = container.closest('[data-stl-track="true"]') as HTMLElement | null;
      if (track) {
        const rect = track.getBoundingClientRect();
        const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        scrollExplode = Math.min(1, Math.max(0.18, progress * 1.25));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let reqId = 0;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const target =
        manualExplodeRef.current !== null ? manualExplodeRef.current : scrollExplode;
      currentExplode += (target - currentExplode) * 0.09;

      if (!isDragging) {
        assemblyGroup.rotation.y += 0.0028;
      }

      for (const node of partNodes) {
        node.group.position.x = node.basePos.x + node.explodeOffset.x * currentExplode;
        node.group.position.y = node.basePos.y + node.explodeOffset.y * currentExplode;
        node.group.position.z = node.basePos.z + node.explodeOffset.z * currentExplode;

        node.group.rotation.x = node.baseRot.x + node.explodeRot.x * currentExplode;
        node.group.rotation.y = node.baseRot.y + node.explodeRot.y * currentExplode;
        node.group.rotation.z = node.baseRot.z + node.explodeRot.z * currentExplode;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      disposables.forEach((d) => d.dispose());
      darkBodyMat.dispose();
      orangeBodyMat.dispose();
      whiteEdgeMat.dispose();
      orangeEdgeMat.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, [activeGadget]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Selector superior de modelos 3D */}
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 z-10">
        {(
          [
            { id: 'microduck_robot', label: '1 · MicroDuck Robot' },
            { id: 'cutter_f1', label: '2 · Cutter Retráctil F1' },
            { id: 'estuche_impermeable', label: '3 · Estuche Técnico #A-01' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveGadget(tab.id);
              setManualExplode(null);
            }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
              activeGadget === tab.id
                ? 'bg-[#ff6a1f] text-white'
                : 'bg-[#1e1e22] text-zinc-300 hover:bg-[#27272c] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lienzo 3D amplio sin recortes */}
      <div
        ref={mountRef}
        className="h-[460px] w-full max-w-[600px] cursor-grab active:cursor-grabbing md:h-[540px]"
        title="Arrastra para rotar el ensamble 3D o haz scroll para separar sus piezas"
      />

      {/* Pie discreto con indicador y botón manual */}
      <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
        <p className="text-center text-xs text-zinc-500">
          {activeGadget === 'microduck_robot' &&
            'MicroDuck Robot (Cabezal Domo + Lente Óptico + Cuello Servo + Torso + Piernas Articuladas) · Arrastra para rotar'}
          {activeGadget === 'cutter_f1' &&
            'Cutter Retráctil F1 (Botón Slider + Cacha Superior + Portahoja y Bisturí + Chasis EDC) · Arrastra para rotar'}
          {activeGadget === 'estuche_impermeable' &&
            'Estuche Técnico #A-01 (Tapa ASA + Sello TPU + Bandeja PETG + Broches) · Arrastra para rotar'}
        </p>
        <button
          type="button"
          onClick={() =>
            setManualExplode((prev) => (prev === null || prev > 0.4 ? 0 : 0.85))
          }
          className="rounded-full bg-[#1e1e22] px-3 py-1 text-xs font-semibold text-zinc-300 transition hover:bg-[#27272c] hover:text-white cursor-pointer"
        >
          {manualExplode !== null && manualExplode < 0.2 ? 'Separar piezas ↕' : 'Ver armado'}
        </button>
      </div>
    </div>
  );
}

export default ExplodedStlViewer;

