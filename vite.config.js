import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/auth': {
        target : 'http://localhost:3000',
        secure:false, 
        
      },
      '/client': {
        target: 'http://localhost:3000',
        secure: false,
        
      },
      '/general': {
        target: 'http://localhost:3000',
        secure: false,
        
      },
      '/management': {
        target: 'http://localhost:3000',
        secure: false,
        
      },
      '/sales': {
        target: 'http://localhost:3000',
        secure: false,
        
      },
  },
},
  plugins: [react()],
})
