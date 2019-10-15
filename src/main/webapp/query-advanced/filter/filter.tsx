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
  withRemoveButton,
} from './filter-utils'
import { AttributeMenu, ComparatorMenu } from './filter-dropdowns'

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
          <Component {...props} />
      </Card>
    )
  }
}

export const Filter = onCard(
  withRemoveButton((props: FilterProps) => {
    return (
      <Box
        style={{
          minWidth: '400px',
          maxWidth: '450px'
        }}
      >
        <Box>
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
