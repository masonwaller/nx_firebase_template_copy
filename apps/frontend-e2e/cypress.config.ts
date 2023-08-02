import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default defineConfig({
  projectId: "eeaxwz",
  e2e: {...nxE2EPreset(__dirname),
    setupNodeEvents(on,config) { 
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
        table(message) {
          console.table(message)
          return null
        }
      })
    },
  }
});
