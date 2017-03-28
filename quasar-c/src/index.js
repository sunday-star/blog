import install from './install'
import start from './start'
import standaloneInstall from './standalone-install'
import { version } from '../package.json'

import toast from './components/toast/toast'
import utils from './utils'

let Quasar = {
  version,
  install,
  start,

  toast,
  utils
}

standaloneInstall(Quasar)

export default Quasar
