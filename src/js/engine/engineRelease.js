/*
    LittleJS - Release Build
    MIT License - Copyright 2021 Frank Force
    
    - This file is used for release builds in place of engineDebug.js
    - Debug functionality will be disabled to lower size and increase performance
*/

'use strict';

export let showWatermark = 0;
export let godMode = 0;
export const debug = 0;
export const debugOverlay = 0;
export const debugPhysics = 0;
export const debugParticles = 0;
export const debugRaycast = 0;
export const debugGamepads = 0;
export const debugMedals = 0;

// debug commands are automatically removed from the final build
export const ASSERT          = ()=> {}
export const debugInit       = ()=> {}
export const debugUpdate     = ()=> {}
export const debugRender     = ()=> {}
export const debugRect       = ()=> {}
export const debugCircle     = ()=> {}
export const debugPoint      = ()=> {}
export const debugLine       = ()=> {}
export const debugAABB       = ()=> {}
export const debugText       = ()=> {}
export const debugClear      = ()=> {}
export const debugSaveCanvas = ()=> {}