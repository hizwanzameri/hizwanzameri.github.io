import React from 'react';

const TagBadge = ({ tagname }) => {
    return (
        <div className="tag-badge">
            <span className="gradient-text">{tagname}</span>
        </div>
    );
};

export default TagBadge;