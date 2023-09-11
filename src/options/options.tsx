import React, { useEffect, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './options.css'
import 'fontsource-roboto'
import { LocalStorageOptions, getStoredOptions, setStoredOptions } from '../utils/storage'
import {
  Card,
  CardContent,
  TextField,
  Grid,
  Box,
  Typography,
  Button,
  Switch
} from '@material-ui/core'

type FormState = 'ready' | 'saving'

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  const [formState, setFormState] = useState<FormState>('ready')
  
  const isFieldDisabled = formState === 'saving'


  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  const handleHomeCityChange = (homeCity: string) => { 
    setOptions({...options, homeCity})
  
  }
  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => { 
    setOptions({...options, hasAutoOverlay})
  }


  const handleSaveButtonClick = () => { 
    setFormState('saving')
    setStoredOptions(options).then(() => {
      setTimeout(() => { 
        setFormState('ready')
      }, 1000)
    })
  }

  if (!options) { 
    return null
  }

  return (
    <Box mx="10%" my="10%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home City Name</Typography>
              <TextField
                fullWidth
                placeholder="Enter a Home City"
                value={options.homeCity}
                disabled={isFieldDisabled}
                onChange={(event) => handleHomeCityChange(event.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">Auto Overlay Toggle</Typography>
              <Switch
                value={options.hasAutoOverlay}
                disabled={isFieldDisabled}
                onChange={(event, checked) =>
                  handleAutoOverlayChange(checked)
                }
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
                disabled={isFieldDisabled}
              >
                {formState === 'ready' ? 'Save' : 'Saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
