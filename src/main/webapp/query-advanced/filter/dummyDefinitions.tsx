export type MetacardType =
  | 'STRING'
  | 'XML'
  | 'DATE'
  | 'LOCATION'
  | 'BOOLEAN'
  | 'INTEGER'
  | 'SHORT'
  | 'LONG'
  | 'FLOAT'
  | 'DOUBLE'

  export const sampleMetacardDefinitions = [
    { id: 'metadata', type: 'XML', __typename: 'MetacardType' },
    { id: 'thumbnail', type: 'BINARY', __typename: 'MetacardType' },
    { id: 'phonetics', type: 'BOOLEAN', __typename: 'MetacardType' },
    { id: 'created', type: 'DATE', __typename: 'MetacardType' },
    { id: 'media.bit-rate', type: 'DOUBLE', __typename: 'MetacardType' },
    { id: 'media.width-pixels', type: 'INTEGER', __typename: 'MetacardType' },
    { id: 'ext.population', type: 'LONG', __typename: 'MetacardType' },
    { id: 'location', type: 'GEOMETRY', __typename: 'MetacardType' },
    { id: 'topic.vocabulary', type: 'STRING', __typename: 'MetacardType' },
  ]
