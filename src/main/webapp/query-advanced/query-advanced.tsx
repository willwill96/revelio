import * as React from 'react'
import { Paper } from '@material-ui/core'
import { FilterGroup, FilterGroupProps } from './filter/filter-group'

const QueryAdvanced = (props: FilterGroupProps) => {
  return (
    <Paper
      style={{
        overflow: 'auto',
        maxWidth: 1600,
        maxHeight: '100%',
        padding: 20,
      }}
    >
      <FilterGroup {...props} />
    </Paper>
  )
}

export default QueryAdvanced
