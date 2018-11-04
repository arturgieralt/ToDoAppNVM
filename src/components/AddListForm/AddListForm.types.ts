import { IList } from 'src/store/store.types';

import { AddListAction, ADD_LIST } from 'src/actions/action.types';

export interface IAddListFormState {
    list: IList;
    isValid: boolean;
}

export interface IAddListProps {
    onAdd: (list: IList) => AddListAction<ADD_LIST>;
}