import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import request from '~/utils/request';
import { wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Search() {
    const [inputSearch, setInputSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [ShowResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        if (!inputSearch.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        const timerId = setTimeout(() => {
            request
                .get('/users/search', {
                    params: {
                        q: inputSearch,
                        type: 'less',
                    },
                })
                .then((res) => {
                    setSearchResult(res.data.data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [inputSearch]);

    const handleClearSearch = () => {
        setInputSearch('');
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div>
            <Tippy
                interactive
                visible={ShowResult && searchResult.length > 0}
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        {
                            <PopperWrapper>
                                <label className={cx('search-label')}>Accounts</label>
                                <ul className={cx('result-list')}>
                                    {searchResult.map((result, index) => (
                                        <AccountItem key={index} data={result} />
                                    ))}
                                </ul>
                            </PopperWrapper>
                        }
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={inputSearch}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (!inputSearch.trim()) {
                                setInputSearch(value.trim());
                            } else {
                                setInputSearch(value);
                            }
                        }}
                        onFocus={() => setShowResult(true)}
                    ></input>

                    {inputSearch && !loading && (
                        <button className={cx('clear')} onClick={handleClearSearch}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && inputSearch && (
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    )}

                    <span className={cx('span')}></span>
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
