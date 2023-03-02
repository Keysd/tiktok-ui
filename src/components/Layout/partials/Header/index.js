import { useCallback } from 'react';
import classNames from 'classnames/bind';
import TippyDefault from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faPlus,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { MessageIcon, InboxIcon, EffectsIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from './Search';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                { type: 'language', code: 'en', title: 'English' },
                { type: 'language', code: 'vi', title: 'Tieng Viet' },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coin',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout',
        separete: true,
    },
];

let currentUser = true;

function Header() {
    const handleMenuChange = useCallback((menuItem) => {
        console.log(menuItem);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="tiktok" />
                </div>

                <Search />

                <div className={cx('actions')}>
                    <Button>
                        <FontAwesomeIcon className="mr-8" icon={faPlus} />
                        <span>Upload</span>
                    </Button>
                    {currentUser ? (
                        <>
                            <TippyDefault content="Create Effects" placement="bottom">
                                <a
                                    className={cx('actions-btn') + ' ml-16 df'}
                                    href="https://effecthouse.tiktok.com/"
                                >
                                    <EffectsIcon />
                                </a>
                            </TippyDefault>

                            <TippyDefault content="Messages" placement="bottom">
                                <button className={cx('actions-btn') + ' df'}>
                                    <MessageIcon classname="" width="2.6rem" height="2.6rem" />
                                </button>
                            </TippyDefault>

                            <TippyDefault content="Inbox">
                                <button className={cx('actions-btn') + ' df'}>
                                    <InboxIcon />
                                </button>
                            </TippyDefault>
                        </>
                    ) : (
                        <>
                            <Button
                                primary
                                fullWidth
                                href="https://fullstack.edu.vn/"
                                target="_blank"
                            >
                                Log in
                            </Button>
                        </>
                    )}

                    <Menu items={currentUser ? USER_MENU : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="ahttps://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/6b5e35c7e387f1a4fd22bb93a9c1707c~c5_100x100.jpeg?x-expires=1675998000&x-signature=vIHSu0cu6UgKjgBjuIh7f0f4XZY%3D"
                                alt="userName"
                                fallback="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Header;
