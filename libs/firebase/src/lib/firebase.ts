/* eslint-disable @typescript-eslint/no-explicit-any */
import * as admin from 'firebase-admin';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { DocumentData, getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';
import * as functions from 'firebase-functions';
// import { FirebaseFirestore } from '@firebase/firestore-types';

export const settings = {
  project_id: 'nxfirebasetemplate',
};

if (functions.config().project && functions.config().project.id) {
  settings.project_id = functions.config().project.id;
} else if (process.env.FIREBASE_PROJECT_ID) {
  settings.project_id = process.env.FIREBASE_PROJECT_ID;
}

console.log(`Initializing Firebase Admin ${settings.project_id}`);

initializeApp({
  projectId: settings.project_id,
  databaseURL: `https://${settings.project_id}.firebaseio.com`,
});

export const db = getFirestore();
export const realtime = getDatabase();
export const storage = getStorage();

export async function verifyFirebaseUserToken(idToken: string) {
  return getAuth().verifyIdToken(idToken);
}

interface getCollectionDataInterface {
  collection: string;
  options?: Record<string, any>;
  arrayOptions?: [string, any[]];
}

export async function getCollectionData(
  params: getCollectionDataInterface
): Promise<any[]> {
  //FirebaseFirestore.DocumentData[]
  let query: any = db.collection(params.collection);
  let order = false;
  let pagination: any = false;
  let limit = 200;
  const startEnd = [
    'startAt',
    'startBefore',
    'startAfter',
    'endAt',
    'endAfter',
    'endBefore',
  ];
  for (const key in params.options || {}) {
    if (key === 'limit') {
      limit = params.options.limit;
    } else if (key === 'orderBy') {
      order = true;
    } else if (startEnd.includes(key)) {
      pagination = startEnd.findIndex((x) => x === key);
    } else {
      if (typeof params.options[key] === 'object') {
        query = query.where(...params.options[key]);
      } else {
        query = query.where(key, '==', params.options[key]);
      }
    }
  }
  if (params.arrayOptions) {
    const field = params.arrayOptions[0];
    const possibleValues = params.arrayOptions[1];

    query = query.where(field, 'array-contains-any', possibleValues);
  }
  query = query.limit(limit);
  if (order) {
    query = query.orderBy(params.options.orderBy[0], params.options.orderBy[1]);
  }
  if (pagination !== false) {
    const paginationValue = startEnd[pagination];
    query = query[paginationValue](params.options[paginationValue]);
  }
  const documents = [];
  console.log('query', query)
  const data = await query.get();
  for (let i = 0; i < data.docs.length; i++) {
    documents.push({
      ...data.docs[i].data(),
      id: data.docs[i].id,
    });
  }
  return documents as any[]; //FirebaseFirestore.DocumentData[]
}

interface getDataByIdInterface {
  collection: string;
  docId: string;
  throwErrorIfNotFound?: boolean;
}
/**
 * By default will return the Firestore standard response for this call.
 * If desired a `throwErrorIfNotFound` flag can be set to true if you want the call to throw if no record is found.
 */
export async function getDataById({
  collection,
  docId,
  throwErrorIfNotFound = false,
}: getDataByIdInterface): Promise<any | undefined> {
  // FirebaseFirestore.DocumentData |
  const query = await db.collection(collection).doc(docId).get();

  if (!query.data()) {
    console.debug(
      `DEBUG: No Data found in getDataById for ${collection} with docId ${docId}`
    );
    if (throwErrorIfNotFound)
      throw new Error(
        `404 Not Found for ${JSON.stringify({
          collection,
          docId,
        })}`
      );
  }

  return query.data() as any | undefined; // FirebaseFirestore.DocumentData |
}
interface getDataByIdOrCreateInterface {
  collection: string;
  docId: string;
  data?: any;
}

export async function getDataByIdOrCreate(
  params: getDataByIdOrCreateInterface
): Promise<any> {
  const query: any = await db
    .collection(params.collection)
    .doc(params.docId)
    .get();
  if (!query.data()) {
    await createData({
      collection: params.collection,
      params: params.data,
      docId: params.docId,
    });
    return params.data;
  }
  return query.data();
}

interface GetDataByFieldInterface {
  collection: string;
  field: string;
  matches: any;
  operator?: any; // FirebaseFirestore.WhereFilterOp;
}
export const getDataByField = async (
  params: GetDataByFieldInterface
): Promise<any[]> => {
  //FirebaseFirestore.DocumentData[]
  const operator = params.operator || '==';

  const ref = db.collection(params.collection);
  const snapshot = await ref
    .where(params.field, operator, params.matches)
    .get();

  if (snapshot.empty) {
    console.log(
      `No matching documents for collection ${params.collection} with query ${params.field} ${operator} ${params.matches}.`
    );
    return [];
  }

  const results = [];

  snapshot.forEach((doc) => {
    const result = { ...doc.data(), id: doc.id };
    results.push(result);
  });

  return results;
};

interface FindOneInterface {
  collection: string;
  field: string;
  matches: string;
}

export const findOne = async (params: FindOneInterface) => {
  const { collection, field, matches } = params;
  const results = await getDataByField({
    collection,
    field,
    matches,
    operator: '==',
  });

  if (results.length === 0) {
    console.log('No matching documents.');
    return null;
  }

  return results[0];
};

interface createDataInterface {
  collection: string;
  params: any;
  docId?: string;
  merge?: boolean;
}
/**
 * Create a record in the database.
 * Note that if a docId is passed then the return value is a write result and not the data created.
 * Providing a docId also uses the .set() method which is an upsert (create or update) call.  You can specify merge to true for this purpose.
 * Otherwise the record is returned.
 */
export async function createData(params: createDataInterface): Promise<any> {
  // FirebaseFirestore.DocumentData | FirebaseFirestore.WriteResult
  try {
    let query;
    if (params.docId) {
      query = await db
        .collection(params.collection)
        .doc(params.docId)
        .set(params.params, { ...(params.merge && { merge: params.merge }) });
    } else {
      query = await db.collection(params.collection).add(params.params);
    }
    return query;
  } catch (e) {
    console.log(e, 'createData error');
    throw new Error(
      `Error createData for: ${params.collection}, ${JSON.stringify(
        params.params
      )}, ${params.docId}`
    );
  }
}

interface BatchCreateDataInterface {
  records: any[]; //FirebaseFirestore.DocumentData[]
  collection: string;
  appendIdToRecord?: boolean;
  idFieldName?: string;
}
export async function batchCreateData(
  params: BatchCreateDataInterface
): Promise<any[]> {
  //FirebaseFirestore.DocumentData[]
  try {
    const { records, collection, appendIdToRecord = false } = params;
    const batch = db.batch();
    const recordsCreated: any[] = []; //FirebaseFirestore.DocumentData[]

    for (let i = 0; i < records.length; i++) {
      const ref = db.collection(collection).doc();
      const createRecord = appendIdToRecord
        ? { ...records[i], [params.idFieldName || 'id']: ref.id }
        : records[i];

      batch.create(ref, createRecord);
      recordsCreated.push(createRecord);
    }

    await batch.commit();
    return recordsCreated;
  } catch (e) {
    console.error(
      'Error batch create for ',
      params.collection,
      params.records,
      e
    );
    throw new Error('Error completing batchCreateData operation.');
  }
}

interface CreateDataWithIdParams {
  collection: string;
  params: Record<string, any>;
}
/**
 * Use this if you need to attach the generated Firestore Document ID to the saved record as a field 'id' for future reference.
 * Make sure to update any models associated with the record to include the `id` field as a string if using this.
 */
export async function createDataAndAttachFirestoreIdAsField(
  params: CreateDataWithIdParams
): Promise<any> {
  // FirebaseFirestore.DocumentData
  try {
    const ref = db.collection(params.collection).doc();
    const firestoreGeneratedDocId = ref.id;
    const createRecordWithId = {
      ...params.params,
      id: firestoreGeneratedDocId,
    };
    const paramsWithNewDocId = {
      ...params,
      params: createRecordWithId,
      docId: firestoreGeneratedDocId,
    };

    await createData(paramsWithNewDocId);

    return createRecordWithId;
  } catch (e) {
    console.error(
      'Error createDataAndAttachFirestoreIdAsField() for ',
      JSON.stringify(params)
    );
    throw new Error('Error creating data and attaching docId.');
  }
}

interface UpdateDataInterface {
  collection: string;
  params: any; //FirebaseFirestore.DocumentData
  docId: string;
}

export async function updateData(params: UpdateDataInterface): Promise<any> {
  // FirebaseFirestore.WriteResult
  return db
    .collection(params.collection)
    .doc(params.docId)
    .update(params.params)
    .catch((e) => {
      console.error(
        'ERROR in updateData for: ',
        params.collection,
        params.params,
        params.docId,
        e
      );
      throw new Error('400 Bad Request ' + e);
    });
}

interface UpsertDataInterface {
  collection: string;
  updates: any; //FirebaseFirestore.DocumentData
  docId: string;
}
export async function upsertData(params: UpsertDataInterface): Promise<any> {
  //FirebaseFirestore.WriteResult
  return db
    .collection(params.collection)
    .doc(params.docId)
    .set(params.updates, { merge: true })
    .catch((e) => {
      console.error(
        'ERROR in upsertData for: ',
        params.collection,
        params.updates,
        params.docId,
        e
      );
      throw new Error('400 Bad Request ' + e);
    });
}

interface UpdateArrayFieldDataInterface {
  collection: string;
  arrayElementToAdd: any;
  field: string;
  docId: string;
}

export async function updateArrayFieldData(
  params: UpdateArrayFieldDataInterface
): Promise<any> {
  return db
    .collection(params.collection)
    .doc(params.docId)
    .update({
      [params.field]: admin.firestore.FieldValue.arrayUnion(
        params.arrayElementToAdd
      ),
    })
    .catch((e) => {
      console.error(
        'ERROR in updateArrayFieldData for: ',
        params.collection,
        params.arrayElementToAdd,
        params.field,
        params.docId,
        e
      );
      throw new Error('Error updateFieldArrayData ' + e);
    });
}

interface deleteDataInterface {
  collection: string;
  docId: string;
}

export async function deleteData(params: deleteDataInterface) {
  return db.collection(params.collection).doc(params.docId).delete();
}

interface BatchDeleteParams {
  collection: string;
  docIds: string[];
  where?: {
    [field: string]: any;
  };
}

export async function batchDelete({
  collection,
  docIds,
  where = {},
}: BatchDeleteParams) {
  try {
    if (where) {
      let query: any = db.collection(collection);

      for (const key in where) {
        query = query.where(key, '==', where[key]);
      }
      const results = await query.get();

      const batch = db.batch();

      for (let i = 0; i < results.docs.length; i++) {
        batch.delete(results.docs[i].ref);
      }

      return await batch.commit();
    } else {
      const batch = db.batch();

      for (let i = 0; i < docIds.length; i++) {
        const ref = db.collection(collection).doc(docIds[i]);
        batch.delete(ref);
      }

      return await batch.commit();
    }
  } catch (e) {
    console.error(
      `Error batch delete for collection: ${collection} with delete id list: ${docIds}`,
      e
    );
    throw new Error('Error completing the write operation.');
  }
}

const buildCreateRecord = (
  record: any, //FirebaseFirestore.DocumentData
  ref: any, //FirebaseFirestore.DocumentReference
  appendIdToRecord = false,
  idFieldName: string = undefined
) => {
  return appendIdToRecord
    ? {
        ...record,
        [idFieldName || 'id']: ref.id,
      }
    : record;
};

export interface UpdateRecords {
  collection: string;
  docId: string;
  updates: Record<string, any>;
}
interface BatchInsertTriggerRecords {
  tasks: any[]; //FirebaseFirestore.DocumentData[]
  notifications: any[]; //FirebaseFirestore.DocumentData[]
  updateRecords: UpdateRecords[];
}
/**
 * @param tasks array of records - Task Records to store in the database.
 * @param notifications array of records - Notification Records to store in the database.
 * @param updateRecords array of objects - Optional information to update records and include the operation in this atomic batch for the trigger
 * @returns
 */
export async function batchInsertTriggerCreatedRecords({
  tasks,
  notifications,
  updateRecords,
}: BatchInsertTriggerRecords) {
  try {
    const batch = db.batch();
    const recordsCreated: {
      notifications: any[]; //FirebaseFirestore.DocumentData[]
      tasks: any[]; //FirebaseFirestore.DocumentData[]
    } = { notifications: [], tasks: [] };

    for (let i = 0; i < tasks.length; i++) {
      const ref = db.collection('tasks').doc();
      const createRecord = buildCreateRecord(tasks[i], ref, true);
      batch.create(ref, createRecord);
      recordsCreated['tasks'] = [...recordsCreated['tasks'], createRecord];
    }
    for (let i = 0; i < notifications.length; i++) {
      const ref = db.collection('notifications').doc();
      const createRecord = buildCreateRecord(notifications[i], ref, true);
      batch.create(ref, createRecord);
      recordsCreated['notifications'] = [
        ...recordsCreated['notifications'],
        createRecord,
      ];
    }

    if (updateRecords) {
      for (let i = 0; i < updateRecords.length; i++) {
        const { docId, updates, collection } = updateRecords[i];
        const ref = db.collection(collection).doc(docId);
        batch.update(ref, updates);
      }
    }

    await batch.commit();

    return recordsCreated;
  } catch (e) {
    console.error('Error batchTriggers', e);
    throw new Error('Error completing batchTriggers operation.');
  }
}

interface GetAllByRecipientParams {
  collection: string;
  comparators: string[];
  field: string;
  comparisonOperator: 'in' | 'not-in';
  where?: { field: string; matches: any };
  orderBy?: any; //FirebaseFirestore.OrderByDirection;
  limit?: number;
  options?: Record<string, any>;
}
/**
 * Get all records where field 'in' or 'not-in' a list of possible values.
 * Helper for retrieving data with fields containing multiple possible values: ex. recipients/requestors for collections like tasks and notifications that have various types of recipients and ids.
 * @param field  Ex field values: 'userId', 'groupId', 'cohortId' or 'recipient.id', the field you want to check for comparator values
 * @param comparisonOperator The operator to use to check values in or not in a field - ex: 'in' | 'not-in'
 * @param comparators Array - a list of values that could be 'in' or are 'not-in' the field specified.  
 * @param where An optional additional where clause to add on top of checking the other field for a list of possible values.  Accepts a single matching value - ```{ field: string, matches: any }```
   NOTE: When adding a additional where clause an index may need to be created in firebase/firestore to complete the query.
   @param options Object map of fields that must match values.  Ex: ```{ [field]: [value] }```
*/
export const getAllWhereInNotIn = async ({
  collection,
  comparators,
  field,
  comparisonOperator,
  orderBy = undefined,
  where = undefined,
  limit = undefined,
  options = {},
}: GetAllByRecipientParams): Promise<any[]> => {
  //FirebaseFirestore.DocumentData[]
  let query = db
    .collection(collection)
    .where(field, comparisonOperator, comparators);

  if (limit) {
    query = query.limit(limit);
  }
  if (where) {
    query = query.where(where.field, '==', where.matches);
  }
  if (orderBy) {
    query = query.orderBy(orderBy);
  }

  for (const key in options) {
    query = query.where(key, '==', options[key]);
  }

  const results = await query.get();

  const documents = [];
  results.forEach((doc: any) => {
    const data = doc.data();
    data['id'] = doc._ref._path.segments[1];
    documents.push(data);
  });

  return documents;
};

interface GetAllParams {
  docIds: string[];
  collection: string;
}
/**
 * Retreive a list of documents.  Pass in a list of documend IDs.
 * Params are passed in via an object:
 * @field docIds - Array of strings
 * @field collection - string
 */
export const getAll = async ({
  docIds,
  collection,
}: GetAllParams): Promise<DocumentData[]> => {
  const refs = docIds.map((id) => db.doc(`${collection}/${id}`));
  const users = await db.getAll(...refs);
  const results = users.map((doc) => doc.data());
  return results;
};

export { admin };
