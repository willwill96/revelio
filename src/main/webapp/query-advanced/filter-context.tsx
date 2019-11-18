import * as React from 'react'
import { useContext } from 'react'

const FilterContext = React.createContext({
  attributeDescriptors: [] as any[],
  editing: true,
})
const useFilterContext = () => {
  const context = useContext(FilterContext)
  return context
}

export { FilterContext, useFilterContext }
