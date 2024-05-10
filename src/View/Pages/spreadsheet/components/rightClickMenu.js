import React from 'react';
import classNames from 'classnames';
import { IoCopy } from "react-icons/io5";
import { IoTrashSharp } from "react-icons/io5";
import { onClickCopy } from '../utils/utils';

export const RightClickMenu = props => {
    const { data, position, contextActivated, selectRow, deleteRow } = props;

    return (
        <React.Fragment>
            <div
                onClick={() => deleteRow()}
                style={{ top: position?.y + 30, left: position?.x - 50 }}
                className={classNames("right_clicked", { fadeOut: !contextActivated })}
            >
                <IoTrashSharp />
            </div>
            <div
                onClick={() => onClickCopy(data, selectRow)}
                style={{ top: position?.y - 15, left: position?.x - 50 }}
                className={classNames("right_clicked", { fadeOut: !contextActivated })}
            >
                <IoCopy />
            </div>
        </React.Fragment>
    );
}