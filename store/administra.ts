import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

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

  get getMembers() {
    return this.members
  }

  @Mutation
  setMembers(members: Member[]) {
    this.members = members
  }

  @Mutation
  setTrainings(trainings: Training[]) {
    this.trainings = trainings
  }

  @Action
  async fetchAll() {
    let snapshot = await firebase.firestore().collection('members').get()
    this.context.commit(
      'setMembers',
      snapshot.docs.map((doc) => doc.data())
    )
    snapshot = await firebase.firestore().collection('trainings').get()
    this.context.commit(
      'setTrainings',
      snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          uid: '',
          title: data.title,
          dateFrom: data.dateFrom.toDate(),
          dateTo: data.dateTo.toDate(),
          section: data.section,
        }
      })
    )
  }
}
