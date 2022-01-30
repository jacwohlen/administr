import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import firebase from 'firebase/compat/app'

interface Member {
  uid: string
  firstname: string
  lastname: string
}

@Module({
  name: 'administra',
  stateFactory: true,
  namespaced: true,
})
export default class Administra extends VuexModule {
  members: Member[] = []

  get getMembers() {
    return this.members
  }

  @Mutation
  setMembers(members: Member[]) {
    this.members = members
  }

  @Action
  async fetchTrainings() {
    const snapshot = await firebase.firestore().collection('members').get()
    this.context.commit(
      'setMembers',
      snapshot.docs.map((doc) => doc.data())
    )
  }
}
