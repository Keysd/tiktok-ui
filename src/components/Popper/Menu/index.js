import { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss';
import { wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import HeaderMenu from './HeaderMenu';

const cx = classNames.bind(styles);
const defaultfunc = () => {};

function Menu({ children, items = [], onChange = defaultfunc }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const handleBack = useCallback(() => {
        setHistory((prev) => {
            return prev.slice(0, prev.length - 1);
        });
    }, []);

    useEffect(() => {
        console.log(items);
    }, []);

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory([...history, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <div className="inline-block">
            <Tippy
                delay={[0, 500]}
                offset={[12, 8]}
                interactive
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('menu-popper')}>
                            {history.length > 1 && (
                                <HeaderMenu title={current.title} onBack={handleBack} />
                            )}
                            {renderItems()}
                        </PopperWrapper>
                    </div>
                )}
                onHide={() => setHistory((prev) => prev.slice(0, 1))}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Menu;
