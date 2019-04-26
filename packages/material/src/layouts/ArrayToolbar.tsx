import { Grid, Hidden, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import ValidationIcon from '../complex/ValidationIcon';
import { JsonSchema } from '@jsonforms/core';
export interface ArrayLayoutToolbarProps {
  label: string;
  errors: string;
  path: string;
  schema: JsonSchema;
  addItem(path: string, data: any, schema?: JsonSchema): () => void;
  createDefault(): any;
}
export const ArrayLayoutToolbar = React.memo(
  ({
    label,
    errors,
    addItem,
    schema,
    path,
    createDefault
  }: ArrayLayoutToolbarProps) => {
    return (
      <Toolbar>
        <Grid container alignItems='center' justify='space-between'>
          <Grid item>
            <Typography variant={'h6'}>{label}</Typography>
          </Grid>
          <Hidden smUp={errors.length === 0}>
            <Grid item>
              <ValidationIcon id='tooltip-validation' errorMessages={errors} />
            </Grid>
          </Hidden>
          <Grid item>
            <Grid container>
              <Grid item>
                <Tooltip
                  id='tooltip-add'
                  title={`Add to ${label}`}
                  placement='bottom'
                >
                  <IconButton
                    aria-label={`Add to ${label}`}
                    onClick={addItem(path, createDefault(), schema)}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    );
  }
);
