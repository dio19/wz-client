import { SideMenuItemViewProps } from '../../types/interfaces';
import classNames from 'classnames';

const SideMenuItemView = ({item, isOpen}: SideMenuItemViewProps) => {
  return (
    <div className="MenuItem">
      <a href={item.url}>
        <div className={classNames("MenuItem__content",{"MenuItem__content-collapsed": !isOpen})}>
            <div className="MenuItem__content-icon">
              <item.icon />
            </div>
            <div className="MenuItem__content-label">
              {item.label}
            </div>
        </div>
      </a>
    </div>
  );
};

export default SideMenuItemView;