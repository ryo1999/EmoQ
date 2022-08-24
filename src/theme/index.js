import { CssBaseline } from '@mui/material'
import {
   ThemeProvider as MUIThemeProvider,
   createTheme,
   StyledEngineProvider,
} from '@mui/material/styles'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

import componentsOverride from './overrides'
// import palette from './palette'
// import shadows, { customShadows } from './shadows'
// import typography from './typography'

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
   children: PropTypes.node,
}

export default function ThemeProvider({ children }) {
   const themeOptions = useMemo(
      () => ({
         // palette,
         shape: { borderRadius: 8 },
         // typography,
         // shadows,
         // customShadows,
      }),
      []
   )

   const theme = createTheme(themeOptions)
   theme.components = componentsOverride(theme)

   return (
      <StyledEngineProvider injectFirst>
         <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
         </MUIThemeProvider>
      </StyledEngineProvider>
   )
}
