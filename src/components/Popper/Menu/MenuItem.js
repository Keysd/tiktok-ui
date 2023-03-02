import classNames from 'classnames/bind';

import Button from '~/components/Button';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    return (
        <Button
            className={cx('menu-item', {
                separete: data.separete,
            })}
            to={data.to}
            onClick={onClick}
        >
            {data.icon && <div className={cx('wrapper-icon')}>{data.icon}</div>}
            <span>{data.title}</span>
        </Button>
    );
}

export default MenuItem;
