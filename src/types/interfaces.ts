import SvgIcon from '@material-ui/core/SvgIcon';
interface DataUser {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: number,
      lng: number
    }
  }
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

interface Users {
  total_items: number
  data: Array<DataUser>
}

interface SideMenuItem {
    id: string,
    label: string,
    icon: typeof SvgIcon,
    url: string
}

interface UsersTableProps {
  isOpen: boolean
}

interface SideMenuItemViewProps {
  item: SideMenuItem,
  isOpen: boolean
}

interface SideMenuProps {
  items: SideMenuItem[]
  isOpen: boolean
  handleOnClick: () => void
}

export type { 
  Users,
  SideMenuItem,
  UsersTableProps,
  SideMenuItemViewProps,
  SideMenuProps
}