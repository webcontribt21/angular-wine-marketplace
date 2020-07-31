import {RootState} from '../reducers/reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ItemDetailTypeState} from './spirits.reducer';
import {ItemDetailType} from '../../shared/interfaces/Item-detail-type.interface';

export const getItemDetailTypeStates: (state: RootState) =>
  ItemDetailType[] = (state: RootState): ItemDetailType[] => state.spiritsReducer.spirits;

export const getSpirits = createFeatureSelector<ItemDetailTypeState>('spiritsReducer');

export const getItemDetailTypes = createSelector(
  getSpirits,
  ({ spirits }: ItemDetailTypeState, props) =>
    spirits.find(el =>  el.description.toLowerCase() === props.type.toLowerCase()).itemDetailTypeValues
);
