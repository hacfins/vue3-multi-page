import type { StrictModifiers } from '@popperjs/core';
interface ModifierProps {
    offset?: number;
    arrow?: HTMLElement;
    arrowOffset?: number;
    gpuAcceleration?: boolean;
}
export default function buildModifier(props: ModifierProps, externalModifiers?: StrictModifiers[]): StrictModifiers[];
export {};
