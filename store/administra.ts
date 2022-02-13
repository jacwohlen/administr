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
  confirmedParticipants: { members: Member[] } | null = null

  @Action({ rawError: true })
  async setParticipants({
    participants,
    tId,
    date,
  }: {
    participants: Member[]
    tId: string
    date: string
  }) {
    await firebase
      .firestore()
      .collection('trainings')
      .doc(tId)
      .collection('log')
      .doc(date)
      .update({
        members: participants,
      })
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
    const ref = firebase.firestore().collection('members').doc()
    const memberId = ref.id

    await this.addMember({ id: memberId, lastname, firstname })

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
          participants: firebase.firestore.FieldValue.arrayUnion(ref),
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
  async addMember({
    id,
    lastname,
    firstname,
  }: {
    id: string
    lastname: string
    firstname: string
  }) {
    await firebase.firestore().collection('members').doc(id).set({
      lastname,
      firstname,
    })
  }

  @Action({ rawError: true })
  createTraining(training: Training) {
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
    if (!date) return
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
    console.log('confirmedParticipants set!')
    return action(this.context)
  }
}
