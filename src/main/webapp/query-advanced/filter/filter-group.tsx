import * as React from 'react'
import { FilterType, Filter } from './filter'
import { Box, Card, CardHeader, Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { defaultFilter, withRemoveButton } from './filter-utils'
import Operator from './operator'

type FilterGroupType = {
  type: string
  filters: Array<FilterGroupType | FilterType>
}

export type FilterGroupProps = FilterGroupType & {
  limitDepth?: number // Used to limit number of nested groups
  onChange: (value: FilterGroupType) => void
  onRemove?: () => void
}

const isFilterGroup = (
  object: FilterType | FilterGroupType
): object is FilterGroupType => (object as FilterGroupType).type !== undefined

const getValue = (props: FilterGroupProps) => {
  const { type, filters } = props
  return { type, filters }
}

export const filterHeaderButtonStyle = {
  height: 'fit-content',
  marginRight: 10,
  padding: '5px 10px',
}

const colorMap = {
  0: 'rgb(100, 100, 255)',
  1: 'rgb(100, 255, 100)',
  2: 'rgb(255, 0, 0)'
}


export const FilterGroup = (props: FilterGroupProps) => {
  return (
    <Card style={{ backgroundColor: 'rgba(0,0,0,0.1)', width: 'fit-content' }}>
      <CardHeader
        style={{ backgroundColor: colorMap[props.limitDepth===undefined ? 1 : props.limitDepth], padding: 0 }}
        subheader={<Header {...props} />}
      ></CardHeader>

      <FilterList {...props} />
    </Card>
  )
}

const Header = withRemoveButton((props: FilterGroupProps) => {
  return (
    <Box style={{ display: 'flex', minWidth: 400 }}>
      <Operator
        onChange={(value: string) => {
          props.onChange({ ...getValue(props), type: value })
        }}
        selected={props.type}
      />
      <Fab
        onClick={() => {
          const filters = props.filters.slice()
          filters.push({ ...defaultFilter })
          props.onChange({ ...getValue(props), filters })
        }}
        style={filterHeaderButtonStyle}
        variant="extended"
      >
        <Add fontSize="small" style={{ marginRight: 5 }} />
        <Box style={{ margin: 'auto' }}>Add Field</Box>
      </Fab>
      {(props.limitDepth === undefined || props.limitDepth !== 0) && (
        <Fab
          style={filterHeaderButtonStyle}
          onClick={() => {
            const filters = props.filters.slice()
            filters.push({ type: 'AND', filters: [{ ...defaultFilter }] })
            props.onChange({ ...getValue(props), filters })
          }}
          variant="extended"
        >
          <Add fontSize="small" style={{ marginRight: 5 }} />
          <Box style={{ margin: 'auto' }}>Add Group</Box>
        </Fab>
      )}
    </Box>
  )
})
const FilterList = (props: FilterGroupProps) => {
  return (
    <Box style={{margin:10}}>
      {props.filters.map((filter, i) => {
        const onChange = (value: FilterGroupType | FilterType) => {
          const filters = props.filters.slice()
          filters[i] = value
          props.onChange({ ...getValue(props), filters })
        }
        const onRemove = () => {
          const filters = props.filters.slice()
          filters.splice(i, 1)
          props.onChange({
            ...getValue(props),
            filters,
          })
        }
        if (isFilterGroup(filter)) {
          return (
            <Box key={i} style={{ margin: 10, marginLeft: 50 }}>
              <FilterGroup
                limitDepth={
                  props.limitDepth !== undefined
                    ? props.limitDepth - 1
                    : undefined
                }
                {...filter}
                onChange={onChange}
                onRemove={onRemove}
              />
            </Box>
          )
        } else {
          return (
            <Box key={i} style={{ margin: 10, marginLeft: 50 }}>
              <Filter {...filter} onChange={onChange} onRemove={onRemove} />
            </Box>
          )
        }
      })}
    </Box>
  )
}
