import * as React from 'react'
import {
  Box,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core'
import {
  filterComponentStyle,
  withDivider,
  withRemoveButton,
} from './filter-utils'
import { AttributeMenu, ComparatorMenu } from './filter-dropdowns'
import { Map } from 'immutable'
import Location from '../../location'

export type FilterType = {
  attribute: string
  comparator: string
  value: any
}
type FilterProps = FilterType & {
  onChange: (value: FilterType) => void
  onRemove?: () => void
}

const onCard = (Component: any) => {
  return (props: any) => {
    return (
      <Card style={{backgroundColor:'rgba(0,0,0,0.1)'}}>
        <CardContent>
          <Component {...props} />
        </CardContent>
      </Card>
    )
  }
}

export const Filter = onCard(
  withRemoveButton((props: FilterProps) => {
    return (
      <Box
        style={{
          minWidth: '325px',
          maxWidth: '350px',
        }}
      >
        <Box style={{ width: '100%' }}>
          <AttributeMenu
            onChange={(val: string) => {
              const { comparator, value } = props
              props.onChange({ comparator, value, attribute: val })
            }}
            style={{ width: '48%', float: 'left', ...filterComponentStyle }}
            selected={props.attribute}
          />
          <ComparatorMenu
            onChange={(val: string) => {
              const { attribute, value } = props
              props.onChange({ attribute, value, comparator: val })
            }}
            style={{
              width: '48%',
              float: 'right',
              ...filterComponentStyle,
            }}
            selected={props.comparator}
            options={['Contains', 'MatchCase', '=']}
          />
        </Box>
        <TextField
          value={props.value}
          placeholder="Use * for wildcard"
          variant="outlined"
          fullWidth
          style={{ ...filterComponentStyle }}
          onChange={event => {
            const { attribute, comparator } = props
            props.onChange({
              attribute,
              comparator,
              value: event.target.value,
            })
          }}
        />
      </Box>
    )
  })
)
