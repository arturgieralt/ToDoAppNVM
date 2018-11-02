import * as React from "react";
import { IChildrenProps } from './TaskList.types';

export class TaskList extends React.Component <IChildrenProps> {
    
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
        return (<div>
                {children}
                </div>
            
            );
    }
}
