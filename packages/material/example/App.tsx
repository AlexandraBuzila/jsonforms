import React from 'react';
import { JsonForms } from '@jsonforms/react';
import {
  materialCells,
  materialRenderers,
} from '../src/index';
import { JsonSchema, NOT_APPLICABLE } from '@jsonforms/core';


export const schema = {
  type: 'object',
  properties: {
    comments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            format: 'date'
          },
          message: {
            type: 'string',
            maxLength: 5
          },
          enum: {
            type: 'string',
            const: 'foo'
          }
        }
      }
    }
  }
};

export const uischema = {
         type: 'Group',
         label: 'comments!',
         elements: [
           {
             type: 'Control',
             scope: '#/properties/comments',
             options: {
               detail: {
                 type: 'VerticalLayout',
                 elements: [
                   { type: 'Label', text: 'Detail' },
                  //  { type: 'Control', scope: '#' }
                 ]
               }
             }
           }
         ]
       };

const uischemas = [
  {
    tester: (_jsonSchema: JsonSchema, schemaPath: string) => {
      console.log(':: tested', schemaPath);
      return schemaPath === '#/properties/comments' ? 10 : NOT_APPLICABLE;
    },
    uischema: {
      type: 'Group',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/enum'
        }
      ]
    }
  }
];
const UISchemasExample = () => {
  return (
    <div>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={{}}
        renderers={materialRenderers}
        cells={materialCells}
        uischemas={uischemas}
      />
    </div>
  );
};

export default UISchemasExample;
