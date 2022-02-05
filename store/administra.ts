import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { firestoreAction } from 'vuexfire'

import firebase from 'firebase/compat/app'

interface Member {
  uid: string
  firstname: string
  lastname: string
}
interface Training {
  uid: string
  title: string
  dateFrom: Date
  dateTo: Date
  section: string
}

@Module({
  name: 'administra',
  stateFactory: true,
  namespaced: true,
})
export default class Administra extends VuexModule {
  members: Member[] = []
  trainings: Training[] = []

  @Action({ rawError: true })
  init() {
    const action = firestoreAction(({ bindFirestoreRef }) => {
      return Promise.all([
        bindFirestoreRef(
          'trainings',
          firebase.firestore().collection('trainings')
        ),
        bindFirestoreRef('members', firebase.firestore().collection('members')),
      ])
    }) as Function
    return action(this.context)
  }
}
