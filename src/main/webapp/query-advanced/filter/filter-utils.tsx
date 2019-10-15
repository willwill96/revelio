import * as React from 'react'
import { Box, Button } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import { DeleteForeverRounded } from '@material-ui/icons'

export const withRemoveButton = (Component: any) => {
  return (props: any) => {
    return typeof props.onRemove === 'function' ? (
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Component {...props} />
        <Box style={{ float: 'right' }}>
          <Button>
            <DeleteForeverRounded onClick={() => props.onRemove()} />
          </Button>
        </Box>
      </Box>
    ) : (
      <Component {...props} />
    )
  }
}

export const defaultFilter = {
  attribute: 'anyText',
  comparator: 'Contains',
  value: '',
}

export const filterHeaderButtonStyle = {
  height: 'fit-content',
  margin: 'auto',
  marginLeft: 0,
  marginRight: 10,
}

export const filterComponentStyle = {
  marginBottom: 5,
}
