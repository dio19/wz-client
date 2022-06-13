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

interface DataTask {
  id: number
  title: string
  user_id: number
  completed: boolean
}

interface Tasks {
  total_items: number
  data: Array<DataTask>
}

interface SideMenuItem {
    id: string,
    label: string,
    icon: typeof SvgIcon,
    url: string
}

interface TableProps {
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

interface HeadCell {
  id: keyof DataTask
  label: string
  disableSorting: boolean
}

export type { 
  Users,
  Tasks,
  DataTask,
  SideMenuItem,
  TableProps,
  SideMenuItemViewProps,
  SideMenuProps,
  HeadCell
}