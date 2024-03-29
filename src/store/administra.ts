import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { firestoreAction } from 'vuexfire'

import firebase from 'firebase/compat/app'

import { Training, Member, Log } from '~/types/models'

// Make sure id is not an hidden field
// When SSR is copying the state from server to client the non emurated
// field id (default of vuexfire) gets removed, leading to mismatch of
// state on server vs client
const serializer = (snap: firebase.firestore.DocumentSnapshot) => ({
  ...snap.data(),
  id: snap.id,
})

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

  trainingsByWeekday: Training[] = []

  member: Member | null = null

  // Statistics
  logsByTraining: Log[] = []
  allLogs: Log[] = []

  get getTrainingsByWeekday() {
    return async (weekday: string) => {
      const querySnapshot = await firebase
        .firestore()
        .collection('trainings')
        .where('weekday', '==', weekday)
        .get()
      const d = querySnapshot.docs.map((doc) => doc.data())
      return d
    }
  }

  @Action({ rawError: true })
  async setParticipants({
    participantsIds,
    tId,
    date,
  }: {
    participantsIds: string[]
    tId: string
    date: string
  }) {
    const b = participantsIds.map((el) =>
      firebase.firestore().doc('members/' + el)
    )
    await firebase
      .firestore()
      .collection('trainings')
      .doc(tId)
      .collection('log')
      .doc(date)
      .set({
        members: b,
      })
  }

  @Action({ rawError: true })
  async addParticipant({
    trainingId,
    memberId,
    lastname,
    firstname,
  }: {
    trainingId: string
    memberId: string
    lastname: string
    firstname: string
  }) {
    let ref = null
    if (memberId === '') {
      ref = firebase.firestore().collection('members').doc()
    } else {
      ref = firebase.firestore().collection('members').doc(memberId)
    }

    await this.addMember({ id: ref.id, lastname, firstname })

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
          participants: firebase.firestore.FieldValue.arrayUnion(ref),
        })
    }
  }

  @Action({ rawError: true })
  async removeParticipant({
    trainingId,
    memberId,
  }: {
    trainingId: string
    memberId: string
  }) {
    let memberRef = firebase.firestore().collection('members').doc(memberId)
    await firebase
      .firestore()
      .collection('trainings')
      .doc(trainingId)
      .update({
        participants: firebase.firestore.FieldValue.arrayRemove(memberRef),
      })
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
  async addImgToMember({
    memberId,
    img,
  }: {
    memberId: string
    img: null | string
  }) {
    await firebase.firestore().collection('members').doc(memberId).update({
      img,
    })
  }

  @Action({ rawError: true })
  async createTraining(training: Training) {
    const t = await firebase
      .firestore()
      .collection('trainings')
      .doc(training.id)
      .get()

    if (t.exists) {
      firebase.firestore().collection('trainings').doc(training.id).update({
        title: training.title,
        dateFrom: training.dateFrom,
        dateTo: training.dateTo,
        weekday: training.weekday,
        section: training.section,
      })
    } else {
      firebase
        .firestore()
        .collection('trainings')
        .doc(training.id)
        .set(training)
    }
  }

  @Action({ rawError: true })
  async init() {
    const action = firestoreAction(({ bindFirestoreRef }) => {
      return Promise.all([
        bindFirestoreRef(
          'trainings',
          firebase.firestore().collection('trainings'),
          { wait: true, serialize: serializer }
        ),
        bindFirestoreRef(
          'members',
          firebase.firestore().collection('members'),
          { wait: true, serialize: serializer }
        ),
      ])
    }) as Function
    return await action(this.context)
  }

  @Action({ rawError: true })
  async initTraining({ trainingId }: { trainingId: string }) {
    const action = firestoreAction(({ bindFirestoreRef }) => {
      return Promise.all([
        bindFirestoreRef(
          'training',
          firebase.firestore().collection('trainings').doc(trainingId),
          { wait: true, serialize: serializer }
        ),
      ])
    }) as Function
    return await action(this.context)
  }

  @Action({ rawError: true })
  async initMember({ memberId }: { memberId: string }) {
    const action = firestoreAction(({ bindFirestoreRef }) => {
      return Promise.all([
        bindFirestoreRef(
          'member',
          firebase.firestore().collection('members').doc(memberId),
          { wait: true, serialize: serializer }
        ),
      ])
    }) as Function
    return await action(this.context)
  }

  @Action({ rawError: true })
  async initPresentList({
    trainingId,
    date,
  }: {
    trainingId: string
    date: string
  }) {
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
          { wait: true, serialize: serializer }
        ),
      ])
    }) as Function
    return await action(this.context)
  }

  @Action({ rawError: true })
  async initTrainingByWeekday(weekday: string) {
    const action = firestoreAction(({ bindFirestoreRef }) => {
      return Promise.all([
        bindFirestoreRef(
          'trainingsByWeekday',
          firebase
            .firestore()
            .collection('trainings')
            .where('weekday', '==', weekday),
          { wait: true, serialize: serializer }
        ),
      ])
    }) as Function
    return await action(this.context)
  }

  @Action({ rawError: true })
  async initLogsByTraining({ trainingId }: { trainingId: string }) {
    const action = firestoreAction(({ bindFirestoreRef }) => {
      return Promise.all([
        bindFirestoreRef(
          'logsByTraining',
          firebase
            .firestore()
            .collection('trainings')
            .doc(trainingId)
            .collection('log'),
          { wait: true, serialize: serializer }
        ),
      ])
    }) as Function
    return await action(this.context)
  }

  @Action({ rawError: true })
  async initAllLogs() {
    const action = firestoreAction(({ bindFirestoreRef }) => {
      return Promise.all([
        bindFirestoreRef(
          'allLogs',
          firebase.firestore().collectionGroup('log'),
          { wait: true, serialize: serializer }
        ),
      ])
    }) as Function
    return await action(this.context)
  }
}
