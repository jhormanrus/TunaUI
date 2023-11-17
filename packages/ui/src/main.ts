import './app.css'
import App from './App.svelte'
import { initRuntime } from '@master/css'
import config from '../master.css'

initRuntime(config)

const app = new App({
  target: document.getElementById('app')!,
})

export default app
