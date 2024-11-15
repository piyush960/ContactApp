import { useState } from 'react';
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import { Box, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { lime, pink, purple } from '@mui/material/colors';



const App = () => {
  const [colorMode, setColorMode] = useState('light')

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#08C2FF',
      },
      secondary: {
        main: '#0D92F4',
      },
      mode: colorMode
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={'background.default'} color={'text.primary'} height={'100vh'}>
        <Navbar mode={colorMode} setMode={setColorMode}/>
        <Contact />
      </Box>
    </ThemeProvider>
  )
}

export default App