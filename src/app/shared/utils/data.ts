import { DocumentData } from '@angular/fire/firestore';

export const extractDocumentChangeActionData = <T extends object>(
  x: DocumentData,
  withId = true
): T => {
  const data = x['doc'].data();

  if (withId) {
    data.id = x['doc'].id;
  }

  return data;
};
