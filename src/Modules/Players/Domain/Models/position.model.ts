// Types
import { ID } from "src/types";
// Enums
import { PositionArea } from "src/Shared/Enums";


/**
 * Position on the pitch and its details
 */
export class Position {

    /**
     * @prop {ID} id
     */
    id: ID;

    /**
     * @prop {PositionArea} main
     */
    main: PositionArea;

    /**
     * @prop {string} detailed
     */
    detailed: string;

}