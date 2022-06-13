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
    catch_phrase: string,
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

interface MouseEventTarget extends EventTarget {
  id: string
}

interface MouseEventButton extends React.MouseEvent<HTMLButtonElement> {
  target: MouseEventTarget
}

export type { 
  Users,
  Tasks,
  DataTask,
  DataUser,
  SideMenuItem,
  TableProps,
  SideMenuItemViewProps,
  SideMenuProps,
  HeadCell,
  MouseEventButton
}