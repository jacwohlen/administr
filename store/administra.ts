import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { firestoreAction } from 'vuexfire'

import firebase from 'firebase/compat/app'

import { Training, Member } from '~/types/models'

@Module({
  name: 'administra',
  stateFactory: true,
  namespaced: true,
})
export default class Administra extends VuexModule {
  members: Member[] = []
  trainings: Training[] = []

  training: Training | null = null
  confirmedParticipants = null

  @Action({ rawError: true })
  async markAsNotPresent({
    m,
    tId,
    date,
  }: {
    m: Member
    tId: string
    date: string
  }) {
    // TODO: Use ID to compare and not compare firstname lastname
    // Also when adding new name, add it to members and than add reference
    await firebase
      .firestore()
      .collection('trainings')
      .doc(tId)
      .collection('log')
      .doc(date)
      .update({
        members: this.confirmedParticipants.members.filter(
          (p) => p.firstname !== m.firstname && p.lastname !== m.lastname
        ),
      })
  }

  @Action({ rawError: true })
  async markAsPresent({
    m,
    tId,
    date,
  }: {
    m: Member
    tId: string
    date: string
  }) {
    const t = await firebase
      .firestore()
      .collection('trainings')
      .doc(tId)
      .collection('log')
      .doc(date)
      .get()
    if (t.exists) {
      firebase
        .firestore()
        .collection('trainings')
        .doc(tId)
        .collection('log')
        .doc(date)
        .update({ members: firebase.firestore.FieldValue.arrayUnion({ ...m }) })
    } else {
      firebase
        .firestore()
        .collection('trainings')
        .doc(tId)
        .collection('log')
        .doc(date)
        .set({ members: firebase.firestore.FieldValue.arrayUnion({ ...m }) })
    }
  }

  @Action({ rawError: true })
  async addParticipant({
    trainingId,
    lastname,
    firstname,
  }: {
    trainingId: string
    lastname: string
    firstname: string
  }) {
    // ensure the training exists
    const t = await firebase
      .firestore()
      .collection('trainings')
      .doc(trainingId)
      .get()
    if (t.exists) {
      firebase
        .firestore()
        .collection('trainings')
        .doc(trainingId)
        .update({
          participants: firebase.firestore.FieldValue.arrayUnion({
            lastname,
            firstname,
          }),
        })
    } else {
      firebase
        .firestore()
        .collection('trainings')
        .doc(trainingId)
        .set({
          participants: firebase.firestore.FieldValue.arrayUnion({
            lastname,
            firstname,
          }),
        })
    }
  }

  @Action({ rawError: true })
  createTraining(training: Training) {
    console.log('createTraining called', training)
    firebase
      .firestore()
      .collection('trainings')
      .doc(training.id)
      .update(training)
  }

  @Action({ rawError: true })
  init() {
    const action = firestoreAction(({ bindFirestoreRef }) => {
      return Promise.all([
        bindFirestoreRef(
          'trainings',
          firebase.firestore().collection('trainings')
        ),
        bindFirestoreRef(
          'members',
          firebase.firestore().collection('members'),
          { wait: true }
        ),
      ])
    }) as Function
    return action(this.context)
  }

  @Action({ rawError: true })
  initTraining({ trainingId }: { trainingId: string }) {
    const action = firestoreAction(({ bindFirestoreRef }) => {
      return Promise.all([
        bindFirestoreRef(
          'training',
          firebase.firestore().collection('trainings').doc(trainingId),
          { wait: true }
        ),
      ])
    }) as Function
    return action(this.context)
  }

  @Action({ rawError: true })
  initPresentList({ trainingId, date }: { trainingId: string; date: string }) {
    console.log('initPresentList')
    console.log('got trainingId: ' + trainingId + ' date: ' + date)
    const action = firestoreAction(({ bindFirestoreRef }) => {
      return Promise.all([
        bindFirestoreRef(
          'confirmedParticipants',
          firebase
            .firestore()
            .collection('trainings')
            .doc(trainingId)
            .collection('log')
            .doc(date),
          { wait: true }
        ),
      ])
    }) as Function
    return action(this.context)
  }
}
