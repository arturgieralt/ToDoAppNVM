import * as React from "react";
import { IChildrenProps } from './List.types';

export class ListComponent extends React.Component <IChildrenProps> {
    
    public static UnOrdered = function UnOrdered ({children}: IChildrenProps ) {
        return (<ul>{children}</ul>)
    }

    public static Ordered = function Ordered ({children}: IChildrenProps ) {
        return (<ol>{children}</ol>)
    }

    public static Element = function Element ({children}: IChildrenProps ) {
        return (<li>{children}</li>)
    }

    public render() {
        const { children } = this.props;
        return ({children});
    }
}
