export const CarSchema = {
    name: 'Car',
    primaryKey: 'model',
    properties: {
        model: 'string',
        miles: {type: 'int', default: 0}
    }
};