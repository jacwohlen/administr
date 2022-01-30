import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Users from '~/store/users'
import Alert from '~/store/alert'
import Administra from '~/store/administra'

let userStore: Users
let alertStore: Alert
let administraStore: Administra

function initializeStores(store: Store<any>) {
  userStore = getModule(Users, store)
  alertStore = getModule(Alert, store)  
  administraStore = getModule(Administra, store)

}

export {
  initializeStores,
  userStore,
  alertStore,
  administraStore,
}
