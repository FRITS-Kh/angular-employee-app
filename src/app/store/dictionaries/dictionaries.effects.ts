import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap, take, zip } from 'rxjs';

import {
  ControlItem,
  Dictionaries,
  Dictionary,
  Item,
} from './dictionaries.models';
import * as fromActions from './dictionaries.actions';
import * as jsonCountries from '@src/assets/countries.json';

type Action = fromActions.All;
interface Country {
  code: string;
  name: string;
}

const documentToItem = (x: DocumentChangeAction<any>): Item => {
  const data = x.payload['doc'].data();

  return {
    id: x.payload['doc'].id,
    ...data,
  };
};

const itemToControlItem = (x: Item): ControlItem => ({
  value: x.id,
  label: x.name,
  icon: x.icon,
});

const addDictionary = (items: Item[]): Dictionary => ({
  items,
  controlItems: [...items].map((item) => itemToControlItem(item)),
});

@Injectable()
export class DictionariesEffects {
  constructor(private actions: Actions, private afs: AngularFirestore) {}

  read: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() =>
        zip(
          this.afs
            .collection('roles')
            .snapshotChanges()
            .pipe(
              take(1),
              map((items) => items.map((x) => documentToItem(x)))
            ),
          this.afs
            .collection('specializations')
            .snapshotChanges()
            .pipe(
              take(1),
              map((items) => items.map((x) => documentToItem(x)))
            ),
          this.afs
            .collection('qualifications')
            .snapshotChanges()
            .pipe(
              take(1),
              map((items) => items.map((x) => documentToItem(x)))
            ),
          this.afs
            .collection('skills')
            .snapshotChanges()
            .pipe(
              take(1),
              map((items) => items.map((x) => documentToItem(x)))
            ),
          of(
            (jsonCountries as any).default.map((country: Country) => ({
              id: country.code.toUpperCase(),
              name: country.name,
              icon: {
                src: null,
                cssClass: `fflag fflag-${country.code.toUpperCase()}`,
              },
            }))
          )
        ).pipe(
          map(([roles, specializations, qualifications, skills, countries]) => {
            const dictionaries: Dictionaries = {
              roles: addDictionary(roles),
              specializations: addDictionary(specializations),
              qualifications: addDictionary(qualifications),
              skills: addDictionary(skills),
              countries: addDictionary(countries),
            };

            return new fromActions.ReadSuccess(dictionaries);
          }),
          catchError((err) => of(new fromActions.ReadError(err.message)))
        )
      )
    )
  );
}
