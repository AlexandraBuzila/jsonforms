/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
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
import React from 'react';
import { CellProps, WithClassname } from '@jsonforms/core';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { Hidden } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

export const MuiInputInteger = (props: CellProps & WithClassname) => {
  const {
    data,
    className,
    id,
    enabled,
    schema,
    uischema,
    path,
    handleChange
  } = props;
  const config = { step: '1' };

  return (
    <Input
      type="number"
      value={data || ''}
      onChange={ev => handleChange(path, parseInt(ev.target.value, 10), schema)}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      inputProps={config}
      fullWidth={true}
      endAdornment={
        <InputAdornment position="end">
          <Hidden xsUp={schema.default === undefined}>
            <IconButton
              aria-label="Clear input field"
              onClick={() => handleChange(path, undefined, schema)}
            >
              <Close />
            </IconButton>
          </Hidden>
        </InputAdornment>
      }
    />
  );
};
