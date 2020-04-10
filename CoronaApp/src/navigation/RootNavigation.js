import * as React from 'react';
import { StackActions } from '@react-navigation/native';
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function dispatch(stack){
    navigationRef.current?.dispatch(stack);
}

export function replace(name, params){
    this.dispatch(
        StackActions.replace(name, params)
    );
}