import { WebGLProgramWrapper } from "./WebGLProgram";
import { Object3D } from "../../core/Object3D";
import { Material } from "../../materials/Material";
import { Geometry } from "../../core/Geometry";
import { BufferGeometry } from "../../core/BufferGeometry";
import { BufferAttribute } from "../../core/BufferAttribute";

export class WebGLMorphtargets {
    protected context: WebGLRenderingContext = null;
    protected influencesList: { [key: number]: Array<[number, number]> } = {};
    protected morphInfluences: Float32Array = new Float32Array(8);

    constructor(context: WebGLRenderingContext) {
        this.context = context;
    }

    public update(
        object: Object3D,
        geometry: BufferGeometry,
        material: Material,
        program: WebGLProgramWrapper,
    ) {
        /**
         * Another not well designed
         */
        const objectInfluences = (object as any).morphTargetInfluences;
        const length: number = objectInfluences.length;
        let influences: Array<[number, number]> = this.influencesList[
            geometry.id
        ];
        if (influences === undefined) {
            // initialise list
            influences = [];
            for (let i: number = 0; i < length; i++) {
                influences[i] = [i, 0];
            }
            this.influencesList[geometry.id] = influences;
        }
        const morphTargets: BufferAttribute[] =
            material.morphTargets && geometry.morphAttributes.position;
        const morphNormals: BufferAttribute[] =
            material.morphNormals && geometry.morphAttributes.normal;
        // Remove current morphAttributes
        for (let i: number = 0; i < length; i++) {
            var influence = influences[i];
            if (influence[1] !== 0) {
                if (morphTargets) geometry.removeAttribute("morphTarget" + i);
                if (morphNormals) geometry.removeAttribute("morphNormal" + i);
            }
        }
        // Collect influences
        for (let i: number = 0; i < length; i++) {
            var influence = influences[i];
            influence[0] = i;
            influence[1] = objectInfluences[i];
        }
        influences.sort((a: [number, number], b: [number, number]): number => {
            return Math.abs(b[1]) - Math.abs(a[1]);
        });
        // Add morphAttributes
        for (var i = 0; i < 8; i++) {
            var influence = influences[i];
            if (influence) {
                var index = influence[0];
                var value = influence[1];
                if (value) {
                    if (morphTargets)
                        geometry.addAttribute(
                            "morphTarget" + i,
                            morphTargets[index],
                        );
                    if (morphNormals)
                        geometry.addAttribute(
                            "morphNormal" + i,
                            morphNormals[index],
                        );
                    this.morphInfluences[i] = value;
                    continue;
                }
            }
            this.morphInfluences[i] = 0;
        }
        program
            .getUniforms()
            .setValue("morphTargetInfluences", this.morphInfluences);
    }
}
