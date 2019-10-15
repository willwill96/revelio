import * as React from 'react'
import { Box, Fab } from '@material-ui/core'
import { DeleteForeverRounded } from '@material-ui/icons'

export const withRemoveButton = (Component: any) => {
  return (props: any) => {
    return (
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
        }}
      >
        <Box style={{ float: 'left' }}>
          <Component {...props} />
        </Box>
        {typeof props.onRemove === 'function' && (
          <Box style={{ float: 'right', margin: 5 }}>
            <Fab size="small" variant="extended">
              <DeleteForeverRounded
                fontSize="small"
                onClick={() => props.onRemove()}
              />
            </Fab>
          </Box>
        )}
      </Box>
    )
  }
}

export const defaultFilter = {
  attribute: 'anyText',
  comparator: 'Contains',
  value: '',
}

export const filterComponentStyle = {
  marginBottom: 5,
}
