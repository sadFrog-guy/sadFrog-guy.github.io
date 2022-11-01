import React from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard/src";

const CopyButton = ({children, text, onCopy}) => {
    return (
        <CopyToClipboard
            text={text}
            onCopy={onCopy}
        >
            <span className="share-link">
                {children}
            </span>
        </CopyToClipboard>
    );
};

export default CopyButton;