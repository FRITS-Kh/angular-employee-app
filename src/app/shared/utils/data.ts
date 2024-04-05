import { DocumentChangeAction } from '@angular/fire/compat/firestore';

export const extractDocumentChangeActionData = <T extends object>(
  x: DocumentChangeAction<T>,
  withId = true
): T => {
  const data = x.payload.doc.data();

  if (withId && 'id' in data) {
    data.id = x.payload.doc.id;
  }

  return data;
};
