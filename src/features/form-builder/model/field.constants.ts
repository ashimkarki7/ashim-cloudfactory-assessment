export const FIELD_TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    GROUP: 'group',
} as const;

export type FieldType =
    (typeof FIELD_TYPE)[keyof typeof FIELD_TYPE];

export const MOVE_DIRECTION = {
    UP: 'up',
    DOWN: 'down',
} as const;

export type MoveDirection =
    (typeof MOVE_DIRECTION)[keyof typeof MOVE_DIRECTION];