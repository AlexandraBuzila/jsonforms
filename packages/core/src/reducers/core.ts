/*
  The MIT License
  
  Copyright (c) 2018 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import * as _ from 'lodash';
import { ErrorObject, ValidateFunction } from 'ajv';
import {
  INIT,
  InitAction,
  SET_AJV,
  SET_SCHEMA,
  SET_UISCHEMA,
  SetAjvAction,
  SetSchemaAction,
  SetUISchemaAction,
  UPDATE_DATA,
  UpdateAction
} from '../actions';
import { createAjv } from '../util/validator';
import { JsonSchema, UISchemaElement } from '..';

const ajv = createAjv();
const validate = (validator: ValidateFunction, data: any): ErrorObject[] => {
  const valid = validator(data);
  if (valid) {
    return [];
  }

  return validator.errors;
};

const sanitizeErrors = (validator: ValidateFunction, data: any) =>
  validate(validator, data).map(error => {
    error.dataPath = error.dataPath.replace(/\//g, '.').substr(1);

    return error;
  });

const alwaysValid: ValidateFunction = () => true;

export interface JsonFormsCore {
  data: any;
  schema: JsonSchema;
  uischema: UISchemaElement;
  errors?: ErrorObject[];
  validator?: ValidateFunction;
}

const initState: JsonFormsCore = {
  data: {},
  schema: {},
  uischema: undefined,
  errors: [],
  validator: alwaysValid
};

type ValidCoreActions =
  InitAction | UpdateAction | SetAjvAction | SetSchemaAction | SetUISchemaAction;

export const coreReducer = (
  state: JsonFormsCore = initState,
  action: ValidCoreActions) => {

  switch (action.type) {
    case INIT: {

      const thisAjv = action.ajv ? action.ajv : ajv;
      const v = thisAjv.compile(action.schema);
      const e = sanitizeErrors(v, action.data);

      return {
        data: action.data,
        schema: action.schema,
        uischema: action.uischema,
        validator: v,
        errors: e
      };
    }
    case SET_AJV: {
      const currentAjv = action.ajv;
      const validator = currentAjv.compile(state.schema);
      const errors = sanitizeErrors(validator, state.data);
      return {
        ...state,
        validator,
        errors
      };
    }
    case SET_SCHEMA: {
      return {
        ...state,
        schema: action.schema
      };
    }
    case SET_UISCHEMA: {
      return {
        ...state,
        uischema: action.uischema
      };
    }
    case UPDATE_DATA: {

      if (action.path === undefined || action.path === null) {
        return state;
      } else if (action.path === '') {
        // empty path is ok
        const result = action.updater(_.cloneDeep(state.data));

        if (result === undefined || result === null) {
          return {
            data: state.data,
            uischema: state.uischema,
            schema: state.schema
          };
        }

        const errors = sanitizeErrors(state.validator, result);

        return {
          data: result,
          uischema: state.uischema,
          schema: state.schema,
          validator: state.validator,
          errors
        };
      } else {
        const oldData: any = _.get(state.data, action.path);
        const newData = action.updater(oldData);
        const newState: any = _.set(_.cloneDeep(state.data), action.path, newData);
        const errors = sanitizeErrors(state.validator, newState);

        return {
          data: newState,
          uischema: state.uischema,
          schema: state.schema,
          validator: state.validator,
          errors
        };
      }
    }
    default:
      return state;
  }
};

export const extractData = (state: JsonFormsCore) => _.get(state, 'data');
export const extractSchema = (state: JsonFormsCore) => _.get(state, 'schema');
export const extractUiSchema = (state: JsonFormsCore) => _.get(state, 'uischema');
export const errorAt = (instancePath: string) => (state: JsonFormsCore): any[] => {
  return _.filter(state.errors, (error: ErrorObject) => error.dataPath === instancePath);
};
export const subErrorsAt = (instancePath: string) => (state: JsonFormsCore): any[] => {
  const path = `${instancePath}.`;

  return _.filter(state.errors, (error: ErrorObject) => error.dataPath.startsWith(path));
};
