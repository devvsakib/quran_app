import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';

const Breadcrumb = ({
    className = '',
    items,
    showHome = true
}) => {
    return (
        <nav aria-label="breadcrumb">
            <ul className={"default-breadcrumb " + className}>
                {showHome && (
                    <li className="crumb">
                        <div className="link">
                            <Link to="/">
                                <HomeFilled />
                            </Link>
                        </div>
                    </li>
                )}
                {items.map((item, index) => (
                    <li key={index} className={`crumb ${index === items.length - 1 ? 'active' : ''}`}>
                        <div className="link">
                            {item.href ? (
                                <Link to={item.href}>{item.title}</Link>
                            ) : (
                                <span aria-current="location">{item.title}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Breadcrumb.propTypes = {
    separator: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            href: PropTypes.string,
        })
    ).isRequired,
};

Breadcrumb.defaultProps = {
    separator: '>',
};

export default Breadcrumb;
